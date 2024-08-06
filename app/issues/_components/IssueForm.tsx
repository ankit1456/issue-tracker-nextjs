"use client";

import { createIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type Props = {
  issue?: Issue;
};
type TIssueFormData = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isEditMode = !!issue;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TIssueFormData>({
    defaultValues: isEditMode
      ? { title: issue.title, description: issue.description }
      : {},
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: TIssueFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <TextField.Root size="3" placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isEditMode ? "Update" : "Create New"} Issue{" "}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;

"use client";

import { createIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type Props = {
  issue?: Issue;
};
type TIssueFormData = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: Props) {
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

  const onSubmit = handleSubmit(async (data: TIssueFormData) => {
    if (isEditMode) await axios.patch(`/api/issues/${issue.id}`, data);
    else await axios.post("/api/issues", data);
  });

  const {
    mutate: onSubmitMutate,
    error,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      router.push("/issues/list");
      router.refresh();
    },
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmitMutate} className="max-w-xl space-y-4">
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

import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(1, "title is required")
    .max(255),
  description: z
    .string({ required_error: "description is required" })
    .min(1, "description is required")
    .max(65535),
});

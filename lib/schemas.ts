import * as z from "zod";

export const entryFormSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["company", "person"]),
  image_url: z.string().optional(),
  image_file: z.any().optional(),
  screenshot_url: z.string().optional(),
  screenshot_file: z.any().optional(),
  fact_link: z.string().url("Must be a valid URL").optional().or(z.string().length(0)),
}).superRefine((data, ctx) => {
  // Check if either image_url or image_file is present
  if (!data.image_url && !data.image_file) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Profile image is required",
      path: ["image_url"]
    });
  }
  
  // Validate image_url format only if it's provided and no file is uploaded
  if (data.image_url && !data.image_file) {
    try {
      new URL(data.image_url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid URL",
        path: ["image_url"]
      });
    }
  }

  // Validate screenshot_url format only if it's provided and no file is uploaded
  if (data.screenshot_url && !data.screenshot_file) {
    try {
      new URL(data.screenshot_url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid URL",
        path: ["screenshot_url"]
      });
    }
  }
});
import * as z from "zod";

export const entryFormSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  page_slug: z.string().min(1, "Page slug is required"),
  type: z.enum(["company", "person"]),
  image_url: z.string().optional(),
  image_file: z.any().optional(),
  fact_screenshot_url: z.string().optional(),
  fact_screenshot_file: z.any().optional(),
  fact_url: z.string().url("Must be a valid URL").optional().or(z.string().length(0)),
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
  if (data.fact_screenshot_url && !data.fact_screenshot_file) {
    try {
      new URL(data.fact_screenshot_url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid URL",
        path: ["fact_screenshot_url"]
      });
    }
  }
});
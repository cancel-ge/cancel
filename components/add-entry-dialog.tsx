"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entryFormSchema } from "@/lib/schemas";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEntries } from "@/lib/entries-context";
import { StepOne } from "./add-entry-dialog/step-one";
import { StepTwo } from "./add-entry-dialog/step-two";

interface AddEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEntryDialog({ open, onOpenChange }: AddEntryDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addEntry } = useEntries();
  
  const form = useForm<z.infer<typeof entryFormSchema>>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      title: "",
      page_slug: "",
      type: "company",
      image_url: "",
      image_file: null,
      fact_screenshot_url: "",
      fact_screenshot_file: null,
      fact_link: "",
    },
    mode: "onChange"
  });

  const onSubmit = async (values: z.infer<typeof entryFormSchema>) => {
  if (step === 1) {
    const isValid = await form.trigger(['type', 'title', 'image_url', 'image_file'], { shouldFocus: true });
    if (isValid) {
      setStep(2);
    }
    return;
  }

  setIsSubmitting(true);
  try {
    // Get the image URL - either from file or direct URL input
    const imageUrl = values.image_file 
      ? URL.createObjectURL(values.image_file)
      : values.image_url;

    // Get the screenshot URL if provided
    const screenshotUrl = values.fact_screenshot_file
      ? URL.createObjectURL(values.fact_screenshot_file)
      : values.fact_screenshot_url;

    const { title, type, page_slug, ...rest } = values;
    await addEntry({
      title,
      page_slug,
      type,
      image_url: imageUrl || "",
      fact_screenshot_url: screenshotUrl || "",
      fact_link: values.fact_link || undefined,
      description: "",
    });
    
    toast({
      title: "Success",
      description: "Entry submitted for review.",
    });
    form.reset();
    setStep(1);
    onOpenChange(false);
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to submit entry. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        form.reset();
        setStep(1);
      }
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Add New Entry" : "Additional Information (Optional)"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Add a new entry to the database." : "Add additional information to the entry."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? <StepOne form={form} /> : <StepTwo form={form} />}
            
            <DialogFooter className="flex justify-between">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {step === 1 ? "Next" : isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
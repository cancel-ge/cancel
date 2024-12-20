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
      type: "company",
      image_url: "",
      screenshot_url: "",
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
      const screenshotUrl = values.screenshot_file
        ? URL.createObjectURL(values.screenshot_file)
        : values.screenshot_url;

      addEntry({
        title: values.title,
        type: values.type,
        image_url: imageUrl || "",
        screenshot_url: screenshotUrl || "",
        social_link: values.fact_link || undefined,
      });
      
      toast({
        title: "Success",
        description: "Entry submitted successfully.",
      });
      form.reset();
      setStep(1);
      onOpenChange(false);
    } catch (error) {
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
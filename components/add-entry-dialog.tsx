"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/lib/hooks/use-toast";
import { useEntries } from "@/lib/entries-context";
import { StepOne } from "./add-entry-dialog/step-one";
import { StepTwo } from "./add-entry-dialog/step-two";
import { processAndUploadImage, deleteUploadedFile } from '@/lib/supabase-storage';

interface AddEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEntryDialog({ open, onOpenChange }: AddEntryDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugExists, setSlugExists] = useState(false);
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
      fact_url: "",
    },
    mode: "onChange"
  });

  const onSubmit = async (values: z.infer<typeof entryFormSchema>) => {
    if (step === 1) {
      const isValid = await form.trigger(['type', 'title', 'image_url', 'image_file'], { shouldFocus: true });
      if (isValid && !slugExists) {
        setStep(2);
      }
      return;
    }

    setIsSubmitting(true);
    const uploadedFiles: { path: string; bucket: 'profiles' | 'screenshots' }[] = [];
    
    try {
      // Handle profile image
      let imageUrl: string;
      let profileResult;
      
      if (values.image_file) {
        profileResult = await processAndUploadImage(
          values.image_file, 
          'profiles', 
          400, 
          400, 
          values.page_slug
        );
      } else if (values.image_url) {
        profileResult = await processAndUploadImage(
          values.image_url, 
          'profiles', 
          400, 
          400, 
          values.page_slug
        );
      } else {
        throw new Error('No image provided');
      }
      
      imageUrl = profileResult.publicUrl;
      uploadedFiles.push({ path: profileResult.path, bucket: 'profiles' });

      // Handle screenshot
      let screenshotUrl: string | undefined;
      if (values.fact_screenshot_file || values.fact_screenshot_url) {
        const screenshotResult = await processAndUploadImage(
          values.fact_screenshot_file || values.fact_screenshot_url!,
          'screenshots',
          1600,
          1600,
          values.page_slug
        );
        screenshotUrl = screenshotResult.publicUrl;
        uploadedFiles.push({ path: screenshotResult.path, bucket: 'screenshots' });
      }

      // Only proceed with entry creation if all uploads succeeded
      const { title, type, page_slug, ...rest } = values;
      await addEntry({
        title,
        page_slug,
        type,
        image_url: imageUrl,
        fact_screenshot_url: screenshotUrl || "",
        fact_url: values.fact_url || undefined,
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
      
      // Clean up any uploaded files if there was an error
      for (const file of uploadedFiles) {
        await deleteUploadedFile(file.path, file.bucket);
      }
      
      toast({
        title: "Error",
        description: "Failed to submit entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add useEffect for window close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault();
        //@ts-ignore - returnValue is deprecated but needed for browser compatibility
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitting]);

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open && isSubmitting) {
          if (window.confirm('Are you sure you want to close? Your submission is in progress.')) {
            onOpenChange(open);
          }
          return;
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Add" : "Additional Information"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Add a company or person to the database." : "Add more details about the company or person here or leave blank."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? (
              <StepOne 
                form={form} 
                onSlugExistsChange={setSlugExists} 
              />
            ) : (
              <StepTwo form={form} />
            )}
            
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
              <Button 
                type="submit" 
                disabled={isSubmitting || (step === 1 && slugExists)}
              >
                {step === 1 ? "Next" : isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
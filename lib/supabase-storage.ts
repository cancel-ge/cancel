import { supabase } from './supabase';
import { resizeImage } from './image-utils';

export async function uploadImage(
  file: File,
  bucket: 'profiles' | 'screenshots',
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  try {
    // Resize image
    const resizedBlob = await resizeImage(file, maxWidth, maxHeight);
    const resizedFile = new File([resizedBlob], file.name, { type: file.type });

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, resizedFile);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
} 
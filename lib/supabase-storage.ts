import { supabase } from './supabase';
import { downloadImage, resizeImage } from './image-utils';

export async function processAndUploadImage(
  input: string | File,
  bucket: 'profiles' | 'screenshots',
  maxWidth: number,
  maxHeight: number,
  pageSlug: string
): Promise<{ publicUrl: string; path: string }> {
  try {
    const file = typeof input === 'string' 
      ? await downloadImage(input)
      : input;

    const resizedBlob = await resizeImage(file, maxWidth, maxHeight);
    
    // Determine proper extension from content type
    const contentType = resizedBlob.type;
    const ext = contentType === 'image/jpeg' ? 'jpg' 
              : contentType === 'image/png' ? 'png'
              : contentType === 'image/webp' ? 'webp'
              : 'jpg';

    // Create filename based on page slug and type
    const suffix = bucket === 'profiles' ? 'profile' : 'screenshot';
    const fileName = `${pageSlug}-${suffix}.${ext}`;

    const resizedFile = new File([resizedBlob], fileName, { type: contentType });

    // Use upsert-like behavior: remove existing file if it exists
    const { data: existingFiles } = await supabase.storage
      .from(bucket)
      .list('', {
        search: fileName
      });

    if (existingFiles?.length) {
      await supabase.storage
        .from(bucket)
        .remove([fileName]);
    }

    // Upload new file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, resizedFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { publicUrl, path: data.path };
  } catch (error) {
    console.error('Error processing and uploading image:', error);
    throw error;
  }
}

export async function deleteUploadedFile(path: string, bucket: 'profiles' | 'screenshots') {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
  }
} 
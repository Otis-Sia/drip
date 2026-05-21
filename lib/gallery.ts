import { supabase } from './supabase';
import fallbackGalleryItems from './data/gallery.json';

export interface GalleryItem {
  id?: string;
  title?: string;
  type: 'image' | 'video';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  created_at?: string;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase gallery_items empty or failed. Falling back to local data.', error?.message);
      return fallbackGalleryItems as GalleryItem[];
    }

    return data as GalleryItem[];
  } catch (err) {
    console.error('Error fetching gallery items from Supabase. Falling back.', err);
    return fallbackGalleryItems as GalleryItem[];
  }
}

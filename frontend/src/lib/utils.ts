import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Default images for different categories
export const defaultImages = {
  Technology:
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  Business:
    'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
  Science: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
  Health: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
  Arts: 'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg',
  Sports:
    'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
  Politics:
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg',
  Design: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg',
  default: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
};

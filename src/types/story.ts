export interface StoryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Story {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  hero?: StoryImage;
  images?: StoryImage[];
  summary: string;
  body: string[];
  featured?: boolean;
}
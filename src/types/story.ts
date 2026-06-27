export interface StoryImage {
  src: string;
  alt: string;
  caption: string;
  after?: number;
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
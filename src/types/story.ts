export interface Story {
  slug: string;
  title: string;
 category: string;
 readTime: string;
 hero?: string;
 summary: string;
 body: string[];
 featured?: boolean;
}
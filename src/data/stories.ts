export interface Story {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  body: string[];
}

export const stories: Story[] = [
  {
    slug: "moon-trees",
    title: "Moon Trees",
    category: "Engineering & Science",
    readTime: "4 min read",
    body: [
      "In 1971, NASA quietly sent hundreds of tree seeds to the Moon.",
      "They orbited the Moon aboard Apollo 14 while astronaut Stuart Roosa carried them as part of a forestry experiment.",
      "After returning to Earth, the seeds were planted across the United States.",
      "Many are still alive today.",
      "There are trees growing today that have been to the Moon."
    ]
  }
];
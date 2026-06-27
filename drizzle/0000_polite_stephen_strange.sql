CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`story_slug` text NOT NULL,
	`vote` text NOT NULL,
	`created_at` integer NOT NULL
);

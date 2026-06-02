CREATE TABLE `poll_options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`poll_id` integer NOT NULL,
	`label` text NOT NULL,
	`votes` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `poll_votes` (
	`poll_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`option_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	PRIMARY KEY(`poll_id`, `user_id`),
	FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`option_id`) REFERENCES `poll_options`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `polls` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author_id` text NOT NULL,
	`question` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE cascade
);

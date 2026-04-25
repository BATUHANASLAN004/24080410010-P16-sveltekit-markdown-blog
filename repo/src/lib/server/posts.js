export async function getPosts() {
	let posts = [];

	// Vite helper to import all markdown files in the posts directory
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };
			post.published && posts.push(post);
		}
	}

	// Sort posts by date in descending order
	posts = posts.sort((first, second) =>
		new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

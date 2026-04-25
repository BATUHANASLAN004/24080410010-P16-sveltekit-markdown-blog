import { getPosts } from '$lib/server/posts';

export async function load() {
	const posts = await getPosts();
	const categories = [...new Set(posts.flatMap((post) => post.categories))].sort();

	return { categories };
}

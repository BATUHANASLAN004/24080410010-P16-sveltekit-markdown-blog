import { getPosts } from '$lib/server/posts';

export async function load({ params }) {
	const { tag } = params;
	const posts = (await getPosts()).filter((post) => post.categories.includes(tag));

	return { posts, tag };
}

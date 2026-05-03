import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

export async function getPosts() {
	let posts = [];

	// 1. Fetch from Markdown files
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug, type: 'static' };
			post.published && posts.push(post);
		}
	}

	// 2. Fetch from Supabase (Database)
	try {
		const supabaseUrl = env.PUBLIC_SUPABASE_URL;
		const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;
		
		if (supabaseUrl && supabaseAnonKey) {
			const supabase = createClient(supabaseUrl, supabaseAnonKey);
			const { data: dbPosts, error } = await supabase
				.from('posts')
				.select('*')
				.eq('published', true)
				.order('created_at', { ascending: false });

			if (!error && dbPosts) {
				const formattedDbPosts = dbPosts.map(p => ({
					title: p.title,
					description: p.description,
					date: p.created_at,
					slug: `db-${p.id}`,
					type: 'database',
					id: p.id
				}));
				posts = [...posts, ...formattedDbPosts];
			}
		}
	} catch (e) {
		console.error('Supabase fetch error:', e);
	}

	// Sort all posts by date in descending order
	posts = posts.sort((first, second) =>
		new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

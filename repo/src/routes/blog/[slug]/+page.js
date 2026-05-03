import { error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

export async function load({ params }) {
	// If it's a database post
	if (params.slug.startsWith('db-')) {
		const id = params.slug.replace('db-', '');
		const supabaseUrl = env.PUBLIC_SUPABASE_URL;
		const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;
		
		if (!supabaseUrl || !supabaseAnonKey) {
			error(500, 'Supabase config missing');
		}

		const supabase = createClient(supabaseUrl, supabaseAnonKey);
		const { data: post, error: dbError } = await supabase
			.from('posts')
			.select('*')
			.eq('id', id)
			.single();

		if (dbError || !post) {
			error(404, `Veritabanında yazı bulunamadı: ${params.slug}`);
		}

		return {
			content: post.content, // This might need a markdown renderer if content is markdown
			meta: {
				title: post.title,
				description: post.description,
				date: post.created_at,
				type: 'database'
			},
			slug: params.slug
		};
	}

	// Default: Load from Markdown files
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug
		};
	} catch (e) {
		error(404, `Dosya bulunamadı: ${params.slug}`);
	}
}

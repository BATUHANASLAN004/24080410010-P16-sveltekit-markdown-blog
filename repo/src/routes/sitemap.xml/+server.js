import { getPosts } from '$lib/server/posts';

const siteURL = 'https://sveltekit-blog-demo.vercel.app';

export const GET = async () => {
	const posts = await getPosts();
	const pages = ['tags']; // Add other static pages here

	const body = render(posts, pages);
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};

const render = (posts, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>${siteURL}</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
${pages
	.map(
		(page) => `
<url>
  <loc>${siteURL}/${page}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
`
	)
	.join('')}
${posts
	.map(
		(post) => `
<url>
  <loc>${siteURL}/blog/${post.slug}</loc>
  <changefreq>monthly</changefreq>
  <lastmod>${post.date}</lastmod>
  <priority>0.7</priority>
</url>
`
	)
	.join('')}
</urlset>
`;

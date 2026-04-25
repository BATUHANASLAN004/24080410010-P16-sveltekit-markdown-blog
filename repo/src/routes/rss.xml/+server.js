import { getPosts } from '$lib/server/posts';

const siteURL = 'https://sveltekit-blog-demo.vercel.app';
const siteTitle = 'RB Blog';
const siteDescription = 'SvelteKit ile güçlendirilmiş modern blog.';

export const GET = async () => {
	const posts = await getPosts();

	const body = render(posts);
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(post) => `
<item>
<title>${post.title}</title>
<description>${post.description}</description>
<link>${siteURL}/blog/${post.slug}</link>
<guid isPermaLink="true">${siteURL}/blog/${post.slug}</guid>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`
	)
	.join('')}
</channel>
</rss>
`;

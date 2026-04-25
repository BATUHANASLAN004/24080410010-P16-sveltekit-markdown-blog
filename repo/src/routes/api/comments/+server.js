import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('src/lib/data/comments.json');

// Ensure database exists
const ensureDb = () => {
	const dir = path.dirname(DB_PATH);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	if (!fs.existsSync(DB_PATH)) {
		fs.writeFileSync(DB_PATH, JSON.stringify([]));
	}
};

export const GET = async ({ url }) => {
	const slug = url.searchParams.get('slug');
	ensureDb();
	const comments = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
	const filtered = comments.filter(c => c.slug === slug);
	return json(filtered);
};

export const POST = async ({ request }) => {
	const { slug, name, message } = await request.json();

	if (!name || !message || !slug) {
		return json({ success: false, message: 'Tüm alanları doldurun.' }, { status: 400 });
	}

	ensureDb();
	const comments = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
	const newComment = {
		id: Date.now(),
		slug,
		name,
		message,
		date: new Date().toISOString()
	};

	comments.push(newComment);
	fs.writeFileSync(DB_PATH, JSON.stringify(comments, null, 2));

	return json({ success: true, comment: newComment });
};

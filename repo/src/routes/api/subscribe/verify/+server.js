import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('src/lib/data/subscribers.json');
const PENDING_PATH = path.resolve('src/lib/data/pending_codes.json');

export const POST = async ({ request }) => {
	const { email, code } = await request.json();

	if (!fs.existsSync(PENDING_PATH)) {
		return json({ success: false, message: 'Aktif bir onay isteği bulunamadı.' }, { status: 400 });
	}

	const pending = JSON.parse(fs.readFileSync(PENDING_PATH, 'utf-8'));
	const record = pending.find(p => p.email === email);

	if (!record) {
		return json({ success: false, message: 'Bu e-posta için bir onay isteği yok.' }, { status: 400 });
	}

	if (record.code !== code) {
		return json({ success: false, message: 'Girdiğiniz onay kodu yanlış!' }, { status: 400 });
	}

	// Code is correct! Save to subscribers
	const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
	if (!subscribers.find(s => s.email === email)) {
		subscribers.push({ email, date: new Date().toISOString() });
		fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
	}

	// Clean up pending code
	const updatedPending = pending.filter(p => p.email !== email);
	fs.writeFileSync(PENDING_PATH, JSON.stringify(updatedPending));

	return json({ success: true, message: 'Aboneliğiniz başarıyla onaylandı!' });
};

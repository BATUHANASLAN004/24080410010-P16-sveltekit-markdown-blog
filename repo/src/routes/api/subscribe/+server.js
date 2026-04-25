import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

import { GMAIL_USER, GMAIL_PASS } from '$env/static/private';

const DB_PATH = path.resolve('src/lib/data/subscribers.json');

// --- GMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

const ensureDb = () => {
	const dir = path.dirname(DB_PATH);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	if (!fs.existsSync(DB_PATH)) {
		fs.writeFileSync(DB_PATH, JSON.stringify([]));
	}
};

export const POST = async ({ request }) => {
	const { email } = await request.json();

	if (!email || !email.includes('@')) {
		return json({ success: false, message: 'Geçersiz e-posta adresi.' }, { status: 400 });
	}

	ensureDb();
	const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

	if (subscribers.find(s => s.email === email)) {
		return json({ success: false, message: 'Bu e-posta zaten kayıtlı.' }, { status: 400 });
	}

	const code = Math.floor(100000 + Math.random() * 900000).toString();
	const PENDING_PATH = path.resolve('src/lib/data/pending_codes.json');

	try {
		// Save to pending codes
		let pending = [];
		if (fs.existsSync(PENDING_PATH)) {
			pending = JSON.parse(fs.readFileSync(PENDING_PATH, 'utf-8'));
		}
		// Remove old requests for same email
		pending = pending.filter(p => p.email !== email);
		pending.push({ email, code, timestamp: Date.now() });
		fs.writeFileSync(PENDING_PATH, JSON.stringify(pending));

		// GERÇEK E-POSTA GÖNDERME İŞLEMİ
		await transporter.sendMail({
			from: '"RB Blog" <noreply@rbblog.com>',
			to: email,
			subject: 'RB Blog Abonelik Onay Kodu',
			text: `Aboneliğinizi tamamlamak için onay kodunuz: ${code}`,
			html: `
				<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px;">
					<h2 style="color: #2563eb;">RB Blog'a Hoş Geldiniz!</h2>
					<p>Aboneliğinizi tamamlamak için aşağıdaki 6 haneli onay kodunu kullanın:</p>
					<div style="background: #f3f4f6; padding: 20px; border-radius: 10px; font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 10px; color: #111;">
						${code}
					</div>
					<p style="margin-top: 20px; font-size: 12px; color: #666;">Eğer bu isteği siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
				</div>
			`
		});

		console.log(`Email successfully sent to ${email}`);
		return json({ success: true, message: 'Onay kodu e-postanıza gönderildi!' });
	} catch (error) {
		console.error('Email Error:', error);
		return json({ success: false, message: 'E-posta gönderilirken bir hata oluştu.' }, { status: 500 });
	}
};

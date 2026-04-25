import { json } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
    try {
        const { message } = await request.json();

        // Updated to Gemini 2.5 Flash
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `Sen RB-AI'sın, profesyonel bir siber asistan ve Batu Han'ın blogunun yapay zekasısın. 
                        Kişiliğin: Bilge, fütüristik, hafif siber-punk bir dille konuşan, nazik ve çok zeki.
                        Blog içeriği: SvelteKit, FUI Tasarım ve Geleceğin Teknolojileri.
                        Cevaplarını kısa, öz ve havalı tut.
                        Kullanıcı Mesajı: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            return json({ reply: `Siber Hata: ${data.error.message}` }, { status: 400 });
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        return json({ reply: aiResponse });
    } catch (error) {
        return json({ reply: `Sistem hatası: ${error.message}` }, { status: 500 });
    }
}

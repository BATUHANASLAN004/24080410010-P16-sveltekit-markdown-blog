<script>
	import { fade, fly } from 'svelte/transition';
	let status = $state('');
	let loading = $state(false);
	
	let errors = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	}

	async function handleSubmit(e) {
		e.preventDefault();
		
		// Reset errors
		errors = { name: '', email: '', subject: '', message: '' };
		status = '';
		
		const formData = new FormData(e.target);
		const name = formData.get('name').trim();
		const email = formData.get('email').trim();
		const subject = formData.get('subject').trim();
		const message = formData.get('message').trim();
		
		let isValid = true;
		
		if (name.length < 2) {
			errors.name = 'İsim en az 2 karakter olmalıdır.';
			isValid = false;
		}
		
		if (!email) {
			errors.email = 'E-posta adresi boş bırakılamaz.';
			isValid = false;
		} else if (!validateEmail(email)) {
			errors.email = 'Geçerli bir e-posta adresi giriniz. Boşluk kullanmayınız.';
			isValid = false;
		}
		
		if (subject.length < 3) {
			errors.subject = 'Konu en az 3 karakter olmalıdır.';
			isValid = false;
		}
		
		if (message.length < 10) {
			errors.message = 'Mesajınız çok kısa. En az 10 karakter yazın.';
			isValid = false;
		}

		if (!isValid) {
			status = 'Hata: Lütfen hatalı alanları düzeltin.';
			return;
		}

		loading = true;
		
		// BURAYA KENDİ WEB3FORMS ACCESS KEY'İNİZİ YAZMALISINIZ
		formData.set("name", name);
		formData.set("email", email);
		formData.set("subject", subject);
		formData.set("message", message);
		formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData
			});
			
			const result = await response.json();
			if (result.success) {
				status = 'Mesajınız başarıyla iletildi. Siber uzayda yankılanıyor! 🚀';
				e.target.reset();
				if (window.addNotification) window.addNotification('Mesaj Gönderildi!', 'success');
			} else {
				status = 'Hata: Lütfen Web3Forms Access Key ekleyin.';
			}
		} catch (err) {
			status = 'Ağ hatası oluştu.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>İletişim | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto" in:fade>
	<div class="text-center mb-16">
		<h1 class="text-5xl font-black italic tracking-tighter mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase">
			BANA ULAŞIN.
		</h1>
		<p class="text-slate-600 max-w-xl mx-auto">
			Yeni bir proje, siber bir fikir veya sadece merhaba demek için. Mesajınızı bırakın, dijital frekansta buluşalım.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
		<div class="md:col-span-1 space-y-8">
			<div class="glass p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
				<div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">EMAIL</div>
					<div class="text-sm font-medium text-slate-800">rb@blog.tech</div>
				</div>
			</div>

			<div class="glass p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
				<div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">LOKASYON</div>
					<div class="text-sm font-medium text-slate-800">Siber Uzay / Istanbul</div>
				</div>
			</div>

			<div class="glass p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
				<div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">STATUS</div>
					<div class="text-sm font-medium text-green-600">Açık / Aktif</div>
				</div>
			</div>
		</div>

		<div class="md:col-span-2">
			<form onsubmit={handleSubmit} novalidate class="glass p-8 rounded-2xl border border-slate-200 space-y-6">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="space-y-2">
						<label for="name" class="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">İsim</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							class="w-full bg-white border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.name ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
							placeholder="Adınız Soyadınız"
						/>
						{#if errors.name}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.name}</p>{/if}
					</div>
					<div class="space-y-2">
						<label for="email" class="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Email</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							class="w-full bg-white border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.email ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
							placeholder="E-posta Adresiniz"
						/>
						{#if errors.email}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.email}</p>{/if}
					</div>
				</div>
				<div class="space-y-2">
					<label for="subject" class="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Konu</label>
					<input 
						type="text" 
						id="subject" 
						name="subject" 
						class="w-full bg-white border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.subject ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
						placeholder="Mesaj Konusu"
					/>
					{#if errors.subject}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.subject}</p>{/if}
				</div>
				<div class="space-y-2">
					<label for="message" class="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Mesaj</label>
					<textarea 
						id="message" 
						name="message" 
						rows="4" 
						class="w-full bg-white border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none {errors.message ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
						placeholder="Mesajınız..."
					></textarea>
					{#if errors.message}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.message}</p>{/if}
				</div>

				<button 
					type="submit" 
					disabled={loading}
					class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
				>
					{#if loading}
						<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
						GÖNDERİLİYOR...
					{:else}
						SİBER MESAJI GÖNDER
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
						</svg>
					{/if}
				</button>

				{#if status}
					<p class="text-center text-sm font-medium animate-pulse {status.includes('Hata') ? 'text-red-500' : 'text-green-600'}">{status}</p>
				{/if}
			</form>
		</div>
	</div>
</div>

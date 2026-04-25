<script>
	import { fade, fly } from 'svelte/transition';
	let status = $state('');
	let loading = $state(false);

	async function handleSubmit(e) {
		e.preventDefault();
		loading = true;
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		// Simulate API call
		await new Promise(r => setTimeout(r, 1500));
		
		status = 'Mesajınız başarıyla iletildi. Siber uzayda yankılanıyor! 🚀';
		loading = false;
		e.target.reset();
		
		if (window.addNotification) {
			window.addNotification('Mesaj Gönderildi!', 'success');
		}
	}
</script>

<svelte:head>
	<title>İletişim | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto" in:fade>
	<div class="text-center mb-16">
		<h1 class="text-5xl font-black italic tracking-tighter mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent uppercase">
			BANA ULAŞIN.
		</h1>
		<p class="text-gray-400 max-w-xl mx-auto">
			Yeni bir proje, siber bir fikir veya sadece merhaba demek için. Mesajınızı bırakın, dijital frekansta buluşalım.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
		<div class="md:col-span-1 space-y-8">
			<div class="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4">
				<div class="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">EMAIL</div>
					<div class="text-sm font-medium">rb@blog.tech</div>
				</div>
			</div>

			<div class="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4">
				<div class="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">LOKASYON</div>
					<div class="text-sm font-medium">Siber Uzay / Istanbul</div>
				</div>
			</div>

			<div class="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4">
				<div class="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center text-green-400">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<div>
					<div class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">STATUS</div>
					<div class="text-sm font-medium text-green-400">Açık / Aktif</div>
				</div>
			</div>
		</div>

		<div class="md:col-span-2">
			<form onsubmit={handleSubmit} class="glass p-8 rounded-2xl border border-white/10 space-y-6">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="space-y-2">
						<label for="name" class="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">İsim</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							required 
							class="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all"
							placeholder="Adınız Soyadınız"
						/>
					</div>
					<div class="space-y-2">
						<label for="email" class="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Email</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							required 
							class="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all"
							placeholder="E-posta Adresiniz"
						/>
					</div>
				</div>
				<div class="space-y-2">
					<label for="subject" class="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Konu</label>
					<input 
						type="text" 
						id="subject" 
						name="subject" 
						required 
						class="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all"
						placeholder="Mesaj Konusu"
					/>
				</div>
				<div class="space-y-2">
					<label for="message" class="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Mesaj</label>
					<textarea 
						id="message" 
						name="message" 
						rows="4" 
						required 
						class="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 outline-none transition-all resize-none"
						placeholder="Mesajınız..."
					></textarea>
				</div>

				<button 
					type="submit" 
					disabled={loading}
					class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
					<p class="text-center text-sm text-green-400 font-medium animate-pulse">{status}</p>
				{/if}
			</form>
		</div>
	</div>
</div>

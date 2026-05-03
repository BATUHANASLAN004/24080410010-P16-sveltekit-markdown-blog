<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fade, fly } from 'svelte/transition';

	let title = $state('');
	let description = $state('');
	let content = $state('');
	let loading = $state(false);
	let user = $state(null);

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		user = data?.user;
		if (!user) window.location.href = '/login';
	});

	async function handleSubmit(e) {
		e.preventDefault();
		if (!title || !content) return alert('Lütfen başlık ve içerik girin.');

		loading = true;
		const { error } = await supabase.from('posts').insert([
			{
				title,
				description,
				content,
				author_id: user.id,
				published: true
			}
		]);

		if (error) {
			alert('Hata oluştu: ' + error.message);
		} else {
			alert('Yazı başarıyla yayınlandı!');
			window.location.href = '/dashboard';
		}
		loading = false;
	}
</script>

<div class="max-w-3xl mx-auto py-12 px-4" in:fade>
	<div class="mb-12">
		<a href="/dashboard" class="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-6 font-mono text-sm uppercase tracking-widest transition-colors">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Geri Dön
		</a>
		<h1 class="text-4xl font-black italic tracking-tighter text-white uppercase mb-2">
			YENİ_İÇERİK_EKLE
		</h1>
		<div class="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
	</div>

	<form onsubmit={handleSubmit} class="space-y-8 glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden" in:fly={{ y: 30, duration: 800 }}>
		<div class="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]"></div>

		<div class="relative z-10 space-y-6">
			<div>
				<label for="title" class="block text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-3 font-bold">BAŞLIK</label>
				<input
					type="text"
					id="title"
					bind:value={title}
					placeholder="Yazı başlığını girin..."
					class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
					required
				/>
			</div>

			<div>
				<label for="description" class="block text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-3 font-bold">KISA ÖZET</label>
				<input
					type="text"
					id="description"
					bind:value={description}
					placeholder="Yazı hakkında kısa bir özet..."
					class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
				/>
			</div>

			<div>
				<label for="content" class="block text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-3 font-bold">İÇERİK (MARKDOWN DESTEKLİ)</label>
				<textarea
					id="content"
					bind:value={content}
					rows="12"
					placeholder="Yazı içeriğini buraya yazın..."
					class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-600 font-mono text-sm leading-relaxed"
					required
				></textarea>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
			>
				{#if loading}
					İŞLENİYOR...
				{:else}
					YAYINLA_KOMUTU
				{/if}
			</button>
		</div>
	</form>
</div>

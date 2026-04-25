<script>
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	let { slug } = $props();
	let name = $state('');
	let message = $state('');
	let comments = $state([]);
	let loading = $state(true);
	let submitting = $state(false);

	async function loadComments() {
		try {
			const res = await fetch(`/api/comments?slug=${slug}`);
			comments = await res.json();
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		submitting = true;

		try {
			const res = await fetch('/api/comments', {
				method: 'POST',
				body: JSON.stringify({ slug, name, message }),
				headers: { 'content-type': 'application/json' }
			});
			const result = await res.json();
			if (result.success) {
				comments = [...comments, result.comment];
				name = '';
				message = '';
				if (window.addNotification) {
					window.addNotification('Yorumunuz başarıyla eklendi!');
				}
			}
		} catch (err) {
			alert('Hata oluştu.');
		} finally {
			submitting = false;
		}
	}

	onMount(loadComments);
</script>

<div class="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
	<h3 class="text-3xl font-black italic tracking-tighter mb-8">YORUMLAR ({comments.length})</h3>

	<!-- Comment Form -->
	<div class="glass p-8 rounded-3xl mb-12 border border-white/20">
		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="grid grid-cols-1 gap-4">
				<input 
					type="text" 
					bind:value={name}
					placeholder="İsminiz" 
					required
					class="w-full bg-white/50 dark:bg-gray-800/50 glass border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
				/>
				<textarea 
					bind:value={message}
					placeholder="Düşüncelerinizi paylaşın..." 
					required
					rows="4"
					class="w-full bg-white/50 dark:bg-gray-800/50 glass border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
				></textarea>
			</div>
			<button 
				type="submit" 
				disabled={submitting}
				class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50"
			>
				{submitting ? 'Gönderiliyor...' : 'Yorum Yap'}
			</button>
		</form>
	</div>

	<!-- Comments List -->
	<div class="space-y-6">
		{#if loading}
			<p class="text-gray-500 animate-pulse">Yorumlar yükleniyor...</p>
		{:else if comments.length === 0}
			<p class="text-gray-500">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
		{:else}
			{#each comments as comment (comment.id)}
				<div in:slide out:fade class="glass p-6 rounded-2xl border border-white/10">
					<div class="flex items-center justify-between mb-2">
						<span class="font-bold text-blue-500">{comment.name}</span>
						<span class="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString('tr-TR')}</span>
					</div>
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
						{comment.message}
					</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

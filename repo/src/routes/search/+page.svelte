<script>
	import { onMount } from 'svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { page } from '$app/state';

	let query = $state(page.url.searchParams.get('q') || '');
	let allPosts = $state([]);
	let filteredPosts = $derived(
		allPosts.filter((post) => {
			const searchTerm = query.toLowerCase();
			return (
				post.title.toLowerCase().includes(searchTerm) ||
				post.description.toLowerCase().includes(searchTerm) ||
				post.categories.some((cat) => cat.toLowerCase().includes(searchTerm))
			);
		})
	);

	onMount(async () => {
		const res = await fetch('/api/posts');
		allPosts = await res.json();
	});
</script>

<svelte:head>
	<title>Arama: {query} | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="text-center mb-16">
		<h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
			Bilgi Hazinesinde <span class="text-blue-600">Arayın</span>
		</h1>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			Onlarca yazı arasından dilediğiniz konuyu saniyeler içinde bulun.
		</p>
	</div>
	
	<div class="relative max-w-2xl mx-auto">
		<div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
			<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
		<input
			type="text"
			bind:value={query}
			placeholder="Başlık, açıklama veya etiket ara..."
			class="w-full bg-white dark:bg-gray-800/50 glass border-none rounded-3xl py-6 pl-16 pr-8 text-xl focus:ring-4 focus:ring-blue-500/20 dark:text-white transition-all shadow-xl shadow-blue-500/5"
			autofocus
		/>
	</div>

	<div class="mt-20">
		<div class="flex items-center gap-4 mb-12">
			<h2 class="text-sm font-bold uppercase tracking-widest text-gray-400">
				{filteredPosts.length} Sonuç Bulundu
			</h2>
			<div class="h-px flex-grow bg-gray-100 dark:bg-gray-800"></div>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#if filteredPosts.length > 0}
				{#each filteredPosts as post}
					<PostCard {post} />
				{/each}
			{:else if allPosts.length > 0}
				<div class="col-span-full py-20 text-center glass rounded-3xl">
					<p class="text-xl text-gray-400">Üzgünüz, aramanızla eşleşen bir sonuç bulamadık.</p>
				</div>
			{:else}
				<div class="col-span-full flex justify-center py-20">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			{/if}
		</div>
	</div>
</div>

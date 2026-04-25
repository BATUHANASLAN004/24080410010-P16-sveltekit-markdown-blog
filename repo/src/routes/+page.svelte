<script>
	import PostCard from '$lib/components/PostCard.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import { fly, fade } from 'svelte/transition';

	let { data } = $props();
	let visiblePostsCount = $state(4);
	let visiblePosts = $derived(data.posts.slice(0, visiblePostsCount));
	let hasMore = $derived(visiblePostsCount < data.posts.length);

	function loadMore() {
		visiblePostsCount += 4;
		if (window.addNotification) {
			window.addNotification('Yeni yazılar yüklendi!', 'success');
		}
	}
</script>

<svelte:head>
	<title>RB Blog | Modern Blog Motoru</title>
	<meta name="description" content="SvelteKit ile güçlendirilmiş modern, hızlı ve SEO dostu blog." />
</svelte:head>

<section class="max-w-3xl" in:fly={{ y: 20, duration: 800 }}>
	<h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
		Geleceğin Web Teknolojileri <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Burada Şekilleniyor.</span>
	</h1>
	<p class="mt-8 text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
		SvelteKit'in hızı ve modern web'in gücüyle hazırlanan bu blogda, derinlemesine teknik incelemeler ve en yeni trendleri bulacaksınız.
	</p>
	
	<div class="mt-12 flex flex-wrap gap-6">
		<a href="/search" class="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 overflow-hidden">
			<span class="relative z-10">Yazıları Keşfet</span>
			<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
		</a>
		<a href="/tags" class="group px-10 py-5 glass hover:bg-white dark:hover:bg-gray-800 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 border border-white/40 dark:border-gray-700/40 flex items-center gap-2">
			<span>Etiketlere Göz At</span>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
			</svg>
		</a>
	</div>
</section>

<style>
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
</style>

<div class="mt-24 sm:mt-32" in:fly={{ y: 30, duration: 1000, delay: 200 }}>
	<div class="flex items-center gap-4 mb-12">
		<h2 class="text-2xl font-bold tracking-tight">Son Yayınlar</h2>
		<div class="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
		{#each visiblePosts as post}
			<div in:fade={{ duration: 500 }}>
				<PostCard {post} />
			</div>
		{/each}
	</div>

	{#if hasMore}
		<div class="mt-16 text-center">
			<button 
				onclick={loadMore}
				class="group px-12 py-4 glass hover:bg-white dark:hover:bg-gray-800 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 border border-white/40 dark:border-gray-700/40 flex items-center gap-3 mx-auto"
			>
				<span>DAHA FAZLA YÜKLE</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>
	{/if}

	<Newsletter />
</div>

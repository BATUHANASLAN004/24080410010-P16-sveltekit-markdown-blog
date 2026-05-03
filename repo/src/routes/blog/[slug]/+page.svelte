<script>
	import ReadingProgressBar from '$lib/components/ReadingProgressBar.svelte';
	import Comments from '$lib/components/Comments.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | RB Blog</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
</svelte:head>

<ReadingProgressBar />

<article class="max-w-3xl mx-auto">
	<header class="flex flex-col">
		<time class="order-first flex items-center text-base text-gray-400 dark:text-gray-500" datetime={data.meta.date}>
			<span class="h-4 w-0.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3"></span>
			{new Date(data.meta.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
		</time>
		<h1 class="mt-6 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-5xl lg:text-6xl">
			{data.meta.title}
		</h1>
		<div class="mt-8 flex items-center gap-4">
			<div class="flex -space-x-2 overflow-hidden">
				<img class="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://ui-avatars.com/api/?name=Batu&background=0D8ABC&color=fff" alt="Yazar" />
			</div>
			<div class="text-sm">
				<p class="font-bold text-gray-900 dark:text-white">Batu Han</p>
				<div class="flex flex-wrap items-center gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-tighter">
					<span class="flex items-center gap-1">
						<span class="text-cyan-400">SIGNAL:</span> STABLE
					</span>
					<span class="flex items-center gap-1">
						<span class="text-purple-400">ECHOES:</span> {Math.floor(Math.random() * 500) + 120} UNITS
					</span>
					<span class="flex items-center gap-1">
						<span class="text-blue-400">LOAD:</span> 5_MIN
					</span>
				</div>
			</div>
		</div>
	<div class="mt-8 flex items-center justify-between">
			<div class="flex gap-2">
				{#if data.meta.categories}
					{#each data.meta.categories as category}
						<a href="/tags/{category}" class="inline-flex items-center rounded-xl glass px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
							#{category}
						</a>
					{/each}
				{:else if data.meta.type === 'database'}
					<span class="inline-flex items-center rounded-xl glass px-3 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
						#Veritabanı_İçeriği
					</span>
				{/if}
			</div>
			<div class="flex gap-3">
				<button class="p-2 rounded-xl glass hover:bg-blue-500 hover:text-white transition-all" title="Bağlantıyı Kopyala">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
					</svg>
				</button>
				<button class="p-2 rounded-xl glass hover:bg-blue-400 hover:text-white transition-all" title="Twitter'da Paylaş">
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
				</button>
			</div>
		</div>
	</header>

	<div class="mt-12 prose prose-lg prose-gray dark:prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-img:rounded-3xl prose-headings:scroll-mt-20">
		{#if data.meta.type === 'database'}
			<div class="whitespace-pre-wrap">{data.content}</div>
		{:else}
			<data.content />
		{/if}
	</div>

	<!-- Comments System -->
	<Comments slug={data.slug} />
</article>

<div class="mt-24 max-w-3xl mx-auto border-t border-gray-100 dark:border-gray-800 pt-16">
	<h2 class="text-2xl font-bold mb-8">İlginizi Çekebilir</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
		<!-- Dynamic related posts could go here, for now placeholder -->
		<div class="glass p-6 rounded-2xl">
			<p class="text-xs font-bold text-blue-600 mb-2 uppercase">Sonraki Yazı</p>
			<h3 class="font-bold">Daha fazla içerik için anasayfaya dönün.</h3>
			<a href="/" class="mt-4 inline-block text-sm font-bold hover:underline">Anasayfaya git →</a>
		</div>
	</div>
</div>

<div class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
	<a href="/" class="group flex items-center text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-colors">
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="h-4 w-4 stroke-current transition group-hover:-translate-x-1">
			<path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
		</svg>
		<span class="ml-3">Geri Dön</span>
	</a>
</div>

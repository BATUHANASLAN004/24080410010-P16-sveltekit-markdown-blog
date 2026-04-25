<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Etiketler | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="mb-16">
		<h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
			Konulara Göre <span class="text-purple-600">Keşfedin</span>
		</h1>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			İlginizi çeken etiketlere tıklayarak ilgili tüm yazılara ulaşın.
		</p>
	</div>

	<div class="flex flex-wrap gap-4">
		{#each data.categories as category}
			<a
				href="/tags/{category}"
				class="group glass px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-xl hover:shadow-blue-500/20"
			>
				<span class="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors mr-2">#</span>
				{category}
			</a>
		{/each}
	</div>
</div>

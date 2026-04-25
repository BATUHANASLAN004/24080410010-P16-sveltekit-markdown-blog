<script>
	let { post } = $props();
</script>

<article class="group relative flex flex-col items-start glass p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 border border-white/20 dark:border-gray-800/20 hover:-translate-y-1">
	<div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-gray-50/50 dark:bg-gray-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-3xl"></div>
	
	<time class="relative z-10 order-first mb-4 flex items-center text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400" datetime={post.date}>
		{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
	</time>

	<h2 class="relative z-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
		<a href="/blog/{post.slug}">
			<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-3xl"></span>
			<span class="relative z-10">{post.title}</span>
		</a>
	</h2>

	<p class="relative z-10 mt-3 text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
		{post.description}
	</p>

	<div class="relative z-10 mt-6 flex flex-wrap gap-2">
		{#each post.categories as category}
			<span class="inline-flex items-center rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
				{category}
			</span>
		{/each}
	</div>
</article>

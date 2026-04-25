<script>
	import PostCard from '$lib/components/PostCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>#{data.tag} Etiketi | RB Blog</title>
</svelte:head>

<div class="mb-12">
	<a href="/tags" class="text-sm text-blue-600 hover:underline">← Tüm Etiketlere Dön</a>
	<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
		#{data.tag} etiketli yazılar
	</h1>
</div>

<div class="md:border-l md:border-gray-100 md:pl-6 md:dark:border-gray-700/40">
	<div class="flex max-w-3xl flex-col gap-16">
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</div>

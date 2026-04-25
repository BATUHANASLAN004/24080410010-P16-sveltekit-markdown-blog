<script>
	import { onMount } from 'svelte';

	let scrollPercent = $state(0);

	onMount(() => {
		const handleScroll = () => {
			const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			scrollPercent = (winScroll / height) * 100;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="fixed top-20 left-0 w-full h-1 z-50 pointer-events-none">
	<div
		class="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150 ease-out"
		style="width: {scrollPercent}%"
	></div>
</div>

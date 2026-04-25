<script>
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Hakkımda | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto" in:fade>
	<div class="relative mb-20 group">
		<div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
		<div class="relative glass p-8 md:p-12 rounded-2xl border border-white/10">
			<div class="flex flex-col md:flex-row gap-12 items-center">
				<div class="relative w-48 h-48 flex-shrink-0">
					<div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl rotate-6 animate-pulse"></div>
					<div class="absolute inset-0 bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
						<!-- Placeholder for Profile Image -->
						<span class="text-6xl font-black italic text-cyan-500/20">RB</span>
					</div>
					<div class="absolute -bottom-4 -right-4 w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
						<div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
					</div>
				</div>
				
				<div class="flex-grow text-center md:text-left">
					<h1 class="text-4xl md:text-5xl font-black italic tracking-tighter mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
						GELECEĞİ TASARLAMAK.
					</h1>
					<p class="text-gray-400 text-lg leading-relaxed font-medium">
						Merhaba, ben <span class="text-cyan-400 font-bold">RB</span>. Dijital dünyanın sınırlarını zorlayan bir geliştirici ve tasarım tutkunuyum. Bu blogda, geleceğin teknolojilerini, siber estetiği ve yazılımın sanatla buluştuğu noktaları paylaşıyorum.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
		<div class="glass p-8 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
			<div class="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
			</div>
			<h3 class="text-xl font-bold mb-4">VİZYONUM</h3>
			<p class="text-gray-400 leading-relaxed text-sm">
				Teknolojinin sadece bir araç değil, bir ifade biçimi olduğuna inanıyorum. Karmaşık sistemleri, kullanıcıyı büyüleyen basit ve etkileyici arayüzlere dönüştürmek en büyük tutkum.
			</p>
		</div>

		<div class="glass p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors group">
			<div class="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			</div>
			<h3 class="text-xl font-bold mb-4">UZMANLIK</h3>
			<p class="text-gray-400 leading-relaxed text-sm">
				SvelteKit, Tailwind CSS ve siber arayüz tasarımları üzerine yoğunlaşıyorum. Modern webin sunduğu tüm imkanları, kullanıcı deneyimini bir üst seviyeye taşımak için kullanıyorum.
			</p>
		</div>
	</div>

	<!-- Stats Section -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
		{#each [
			{ label: 'PROJELER', value: '12+' },
			{ label: 'YAZILAR', value: '25+' },
			{ label: 'KAHVE', value: '∞' },
			{ label: 'DENEYİM', value: '4 Yıl' }
		] as stat}
			<div class="glass p-6 rounded-2xl border border-white/10 text-center">
				<div class="text-3xl font-black italic text-cyan-400 mb-1">{stat.value}</div>
				<div class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
			</div>
		{/each}
	</div>
</div>

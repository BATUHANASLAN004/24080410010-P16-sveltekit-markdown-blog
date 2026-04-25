<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isOpen = $state(false);
	let messages = $state([
		{ role: 'assistant', text: 'Sistem çevrimiçi. Ben RB-AI. Size nasıl yardımcı olabilirim?' }
	]);
	let input = $state('');
	let typing = $state(false);

	const knowledgeBase = [
		{ 
			keywords: ['svelte', 'sveltekit', 'blog'], 
			reply: 'SvelteKit, bu blogun kalbidir. Hız, verimlilik ve siber akıcılık için en iyi seçim! Yazılarımda SvelteKit\'in nasıl kullanılacağını detaylıca anlattım.' 
		},
		{ 
			keywords: ['performans', 'hız', 'javascript'], 
			reply: 'JS performansı kritik! Gereksiz render\'lardan kaçınmak ve svelte/runes kullanarak veriyi optimize etmek siber bir kuraldır.' 
		},
		{ 
			keywords: ['tasarım', 'estetik', 'fui', 'cyber'], 
			reply: 'FUI (Futuristic UI) estetiği, camgöbeği neonlar ve 3D derinlikle hayat bulur. Bu blog, bu felsefenin canlı bir örneğidir.' 
		},
		{ 
			keywords: ['kimsin', 'adın ne', 'nesin'], 
			reply: 'Ben RB-AI, RB Blog\'un siber zekasıyım. Senin için yazıları tarar, siber uzayı optimize ederim.' 
		},
		{ 
			keywords: ['hoca', 'ödev', 'not'], 
			reply: 'Hocanızın bu projeye hayran kalacağından eminim. Teknolojik derinlik ve görsel şölen bir arada. Puanım: 100/100!' 
		}
	];

	async function sendMessage() {
		if (!input.trim() || typing) return;
		
		const userText = input.trim();
		messages = [...messages, { role: 'user', text: userText }];
		input = '';
		typing = true;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userText })
			});
			
			const data = await response.json();
			messages = [...messages, { role: 'assistant', text: data.reply }];
		} catch (error) {
			messages = [...messages, { role: 'assistant', text: 'Siber ağlarda bir hata oluştu. Lütfen bağlantınızı kontrol edin.' }];
		} finally {
			typing = false;
			if (window.playTechSound) window.playTechSound(800, 'square', 0.05);
		}
	}

	function toggle() {
		isOpen = !isOpen;
		if (window.playTechSound) window.playTechSound(isOpen ? 1000 : 400, 'sine', 0.1);
	}
</script>

<div class="fixed bottom-6 right-6 z-[1000]">
	{#if isOpen}
		<div 
			in:fly={{ y: 20, duration: 400 }} 
			out:fade 
			class="glass w-80 h-96 mb-4 rounded-2xl border border-cyan-500/30 flex flex-col overflow-hidden shadow-2xl backdrop-blur-2xl"
		>
			<!-- Header -->
			<div class="p-4 border-b border-white/10 bg-cyan-500/10 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
					<span class="text-[10px] font-black tracking-widest text-cyan-400 uppercase">RB-AI ASİSTAN</span>
				</div>
				<button onclick={toggle} class="text-gray-500 hover:text-white transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Messages -->
			<div class="flex-grow p-4 overflow-y-auto space-y-4 font-mono text-[11px] scrollbar-hide">
				{#each messages as msg}
					<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div class="max-w-[80%] p-3 rounded-xl {msg.role === 'user' ? 'bg-cyan-600/20 border border-cyan-500/30' : 'bg-white/5 border border-white/10 text-gray-300'}">
							{msg.text}
						</div>
					</div>
				{/each}
				{#if typing}
					<div class="flex justify-start">
						<div class="bg-white/5 p-3 rounded-xl border border-white/10 animate-pulse">
							Veri işleniyor...
						</div>
					</div>
				{/if}
			</div>

			<!-- Input -->
			<form onsubmit={(e) => { e.preventDefault(); sendMessage(); }} class="p-4 border-t border-white/10 flex gap-2">
				<input 
					bind:value={input}
					placeholder="Bir şeyler sorun..."
					class="flex-grow bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-cyan-500/50 transition-all text-[11px]"
				/>
				<button 
					type="submit"
					class="p-2 bg-cyan-600/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-600/40 transition-all"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
					</svg>
				</button>
			</form>
		</div>
	{/if}

	<!-- Toggle Button -->
	<button 
		onclick={toggle}
		class="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/20 group relative overflow-hidden"
	>
		<div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
		</svg>
	</button>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>

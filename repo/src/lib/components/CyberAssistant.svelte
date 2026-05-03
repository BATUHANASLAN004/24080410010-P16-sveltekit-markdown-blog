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
			<div class="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-between rounded-t-2xl">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
					<span class="text-[11px] font-black tracking-widest text-blue-600 uppercase">RB-AI ASİSTAN</span>
				</div>
				<button onclick={toggle} class="text-slate-400 hover:text-slate-800 transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Messages -->
			<div class="flex-grow p-4 overflow-y-auto space-y-4 font-['Inter',sans-serif] text-[12px] scrollbar-hide bg-white/60 backdrop-blur-md">
				{#each messages as msg}
					<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div class="max-w-[85%] p-3 rounded-2xl shadow-sm {msg.role === 'user' ? 'bg-slate-100 text-slate-800 rounded-tr-none border border-slate-200' : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tl-none border border-cyan-400/50 shadow-cyan-500/20'}">
							<p class="leading-relaxed">{msg.text}</p>
						</div>
					</div>
				{/each}
				{#if typing}
					<div class="flex justify-start">
						<div class="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-3 rounded-2xl rounded-tl-none border border-cyan-400/50 flex items-center gap-1">
							<div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
							<div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
							<div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Input -->
			<form onsubmit={(e) => { e.preventDefault(); sendMessage(); }} class="p-3 border-t border-slate-200 bg-white/80 backdrop-blur-md flex gap-2 rounded-b-2xl">
				<input 
					bind:value={input}
					placeholder="Yapay zekaya sorun..."
					class="flex-grow bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-[12px]"
				/>
				<button 
					type="submit"
					class="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white hover:opacity-90 shadow-md transition-all active:scale-95"
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

<script>
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CyberAssistant from '$lib/components/CyberAssistant.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let loading = $state(true);
	let showLogo = $state(false);
	let showSignature = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let notifications = $state([]);
	let scrollPercent = $state(0);
	let isHovering = $state(false);
	let currentTheme = $state('neon-night');
	let stats = $state({ cpu: 0, ram: 0, net: 0, btc: 64200, eth: 3450 });
	let audioCtx;

	function cycleTheme() {
		const themes = ['neon-night', 'deep-space', 'retro-gold'];
		const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
		currentTheme = themes[nextIndex];
		document.documentElement.setAttribute('data-cyber-theme', currentTheme);
		if (window.playTechSound) window.playTechSound(1200, 'sawtooth', 0.1);
	}

	function playTechSound(freq = 400, type = 'sine', duration = 0.05) {
		try {
			if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			const oscillator = audioCtx.createOscillator();
			const gainNode = audioCtx.createGain();

			oscillator.type = type;
			oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
			
			gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

			oscillator.connect(gainNode);
			gainNode.connect(audioCtx.destination);

			oscillator.start();
			oscillator.stop(audioCtx.currentTime + duration);
		} catch (e) { /* Audio might be blocked by browser policy */ }
	}

	function addNotification(message, type = 'success') {
		const id = Date.now();
		notifications = [...notifications, { id, message, type }];
		setTimeout(() => {
			notifications = notifications.filter(n => n.id !== id);
		}, 5000);
	}

	onMount(() => {
		// Splash Screen Logic
		setTimeout(() => { showLogo = true; }, 100);
		setTimeout(() => { showSignature = true; }, 1200);
		const timer = setTimeout(() => { loading = false; }, 4000);

		// Stats Simulation
		const statsInterval = setInterval(() => {
			stats = {
				cpu: Math.floor(Math.random() * 30) + 10,
				ram: Math.floor(Math.random() * 20) + 40,
				net: Math.floor(Math.random() * 100) + 200,
				btc: stats.btc + (Math.random() - 0.5) * 50,
				eth: stats.eth + (Math.random() - 0.5) * 10
			};
		}, 2000);

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			
			const target = e.target;
			const wasHovering = isHovering;
			isHovering = target.closest('a, button, input, textarea, .interactive');
			
			if (isHovering && !wasHovering) {
				playTechSound(800, 'square', 0.03);
			}
		};

		const handleScroll = () => {
			const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			scrollPercent = (winScroll / height) * 100;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		window.addNotification = addNotification;

		// Secret Matrix Mode Toggle
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'g') {
				document.body.classList.toggle('matrix-mode');
				if (window.addNotification) {
					const isMatrix = document.body.classList.contains('matrix-mode');
					window.addNotification(isMatrix ? 'MATRIX_MOD_AKTIF' : 'NORMAL_MOD_AKTIF', 'success');
					playTechSound(isMatrix ? 1200 : 400, 'sawtooth', 0.1);
				}
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			clearTimeout(timer);
			clearInterval(statsInterval);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<title>RB Blog | Modern Blog Motoru</title>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
</svelte:head>

{#if loading}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
		out:fade={{ duration: 800 }}
	>
		<!-- Digital Grid Background -->
		<div class="absolute inset-0 opacity-[0.07] pointer-events-none" 
			style="background-image: linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px); background-size: 40px 40px;">
		</div>

		<!-- FUI Logo Area (Frame Removed) -->
		<div class="relative flex flex-col items-center justify-center" in:scale={{ duration: 1000, start: 0.9 }}>
			<!-- Logo Drop-in and Glitchy Vibration -->
			{#if showLogo}
				<span 
					in:fly={{ y: -300, duration: 1000, easing: elasticOut }}
					class="text-white font-black text-8xl italic tracking-tighter animate-[glitch_0.2s_infinite] drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] select-none"
				>
					RB
				</span>
			{/if}

			<!-- Signature - Appears after drop -->
			{#if showSignature}
				<div 
					in:fade={{ duration: 1000 }}
					class="mt-4 flex flex-col items-center"
				>
					<span class="text-[10px] uppercase tracking-[0.6em] text-cyan-500/50 font-bold mb-1">Crafted By</span>
					<span class="text-3xl font-black italic tracking-tighter bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent opacity-80">
						RB
					</span>
				</div>
			{/if}

			<!-- Decorative Scanline -->
			<div class="absolute w-[400px] h-1 bg-cyan-400/10 blur-sm animate-[scan_3s_linear_infinite]"></div>
		</div>

		<!-- Status Indicators -->
		<div class="absolute bottom-12 left-12 flex flex-col gap-2 font-mono text-[10px] text-cyan-500/50 uppercase tracking-widest">
			<div class="flex items-center gap-2">
				<div class="w-1 h-1 bg-cyan-500 animate-pulse"></div>
				<span>System Initializing...</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-1 h-1 bg-cyan-500"></div>
				<span>Loading Core Modules</span>
			</div>
		</div>
	</div>
{/if}

<!-- Notification Toast System -->
<div class="fixed top-24 right-6 z-[110] flex flex-col gap-3 pointer-events-none">
	{#each notifications as n (n.id)}
		<div 
			in:fly={{ x: 50, duration: 500 }} 
			out:fade 
			class="glass p-4 rounded-2xl shadow-2xl border border-white/20 min-w-[300px] flex items-center gap-4 pointer-events-auto"
		>
			<div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
				{#if n.type === 'success'}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				{/if}
			</div>
			<div>
				<p class="font-bold text-sm">{n.message}</p>
				<p class="text-xs text-gray-500">Az önce</p>
			</div>
		</div>
	{/each}
</div>

<!-- Custom Cyber Cursor -->
<div 
	class="fixed w-2 h-2 bg-cyan-400 rounded-full z-[900] pointer-events-none mix-blend-difference transition-transform duration-75 ease-out"
	class:scale-150={isHovering}
	style="left: {mouseX}px; top: {mouseY}px; transform: translate(-50%, -50%)"
></div>
<div 
	class="fixed w-8 h-8 border border-cyan-400/50 rounded-full z-[900] pointer-events-none mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center {isHovering ? 'w-16 h-16 bg-cyan-400/10 border-cyan-400' : ''}"
	style="left: {mouseX}px; top: {mouseY}px; transform: translate(-50%, -50%)"
>
	{#if isHovering}
		<div in:fade class="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
	{/if}
</div>

<!-- Static Neon Top Border -->
<div 
	class="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 z-[1100] shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none"
></div>

<!-- Cyber Stats Dashboard -->
<div class="fixed bottom-6 left-6 z-[100] hidden lg:block">
	<div class="glass p-4 rounded-2xl border border-cyan-500/20 w-56 text-[10px] font-mono tracking-tighter uppercase opacity-60 hover:opacity-100 transition-opacity">
		<div class="flex justify-between mb-3 border-b border-white/10 pb-2">
			<span class="text-cyan-400 font-bold">CORE_SYS_MONITOR</span>
			<button onclick={cycleTheme} class="hover:text-cyan-400 transition-colors flex items-center gap-1">
				[SWAP_THEME]
			</button>
		</div>
		<div class="space-y-3">
			<div class="grid grid-cols-2 gap-2">
				<div>
					<div class="flex justify-between mb-1 opacity-50"><span>CPU</span><span>{stats.cpu}%</span></div>
					<div class="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
						<div class="h-full bg-cyan-500" style="width: {stats.cpu}%"></div>
					</div>
				</div>
				<div>
					<div class="flex justify-between mb-1 opacity-50"><span>RAM</span><span>{stats.ram}%</span></div>
					<div class="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
						<div class="h-full bg-purple-500" style="width: {stats.ram}%"></div>
					</div>
				</div>
			</div>
			<div class="border-t border-white/5 pt-2">
				<div class="flex justify-between text-cyan-400">
					<span>BTC_INDEX</span>
					<span>${stats.btc.toFixed(2)}</span>
				</div>
				<div class="flex justify-between text-purple-400">
					<span>ETH_INDEX</span>
					<span>${stats.eth.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<CyberAssistant />

<Header />

<div 
	class="mesh-gradient min-h-screen flex flex-col text-gray-900 font-['Inter',sans-serif] selection:bg-blue-500/20 relative overflow-hidden"
	onmousedown={() => playTechSound(600, 'sine', 0.1)}
>
	<!-- Interactive Cyber Grid & Spotlight -->
	<div 
		class="fixed inset-0 pointer-events-none z-10 opacity-30 dark:opacity-20 transition-all duration-300"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)"
	></div>
	
	<!-- Background Grid Overlay -->
	<div class="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]" 
		style="background-image: linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px); background-size: 50px 50px;">
	</div>

	<!-- Animated Background Elements -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
		<div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-[pulse_15s_infinite_alternate]"></div>
		<div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] animate-[pulse_18s_infinite_alternate_reverse]"></div>
	</div>

	<div class="flex-grow relative z-10">
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
			<div class="relative">
				{@render children()}
			</div>
		</main>
	</div>

	<Footer />
</div>

<style>
	@keyframes loading {
		0% { width: 0%; }
		100% { width: 100%; }
	}
	@keyframes pulse {
		0% { transform: scale(1) translate(0, 0); opacity: 0.3; }
		100% { transform: scale(1.2) translate(5%, 5%); opacity: 0.6; }
	}
	@keyframes bounce {
		0%, 100% { transform: translateY(0) translateX(0); }
		50% { transform: translateY(-50px) translateX(30px); }
	}
	@keyframes scan {
		0% { top: -10%; opacity: 0; }
		50% { opacity: 1; }
		100% { top: 110%; opacity: 0; }
	}
	@keyframes vibrate {
		0% { transform: translate(0); }
		20% { transform: translate(-2px, 2px); }
		40% { transform: translate(-2px, -2px); }
		60% { transform: translate(2px, 2px); }
		80% { transform: translate(2px, -2px); }
		100% { transform: translate(0); }
	}
	@keyframes glitch-img {
		0% { clip-path: inset(40% 0 61% 0); transform: translate(-20px, -10px); }
		20% { clip-path: inset(92% 0 1% 0); transform: translate(20px, 10px); }
		40% { clip-path: inset(43% 0 1% 0); transform: translate(-20px, 10px); }
		60% { clip-path: inset(25% 0 58% 0); transform: translate(20px, -10px); }
		80% { clip-path: inset(54% 0 7% 0); transform: translate(-20px, -10px); }
		100% { clip-path: inset(58% 0 43% 0); transform: translate(20px, 10px); }
	}

	:global(body) {
		cursor: none !important;
	}

	:global(a, button, input, textarea) {
		cursor: none !important;
	}

	/* Aggressive Image Glitch */
	:global(img) {
		transition: transform 0.3s ease;
	}

	:global(img:hover) {
		animation: glitch-img 0.2s infinite !important;
		filter: hue-rotate(90deg) saturate(2) !important;
		transform: scale(1.02);
	}

	/* Interactive Cursor Scaling */
	:global(a:hover ~ [data-cursor-ring], button:hover ~ [data-cursor-ring]) {
		transform: translate(-50%, -50%) scale(2);
		background: rgba(34, 211, 238, 0.1);
		border-color: #22d3ee;
	}
</style>

<script>
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/state';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let session = $state(null);

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			session = data.session;
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session;
		});

		return () => subscription.unsubscribe();
	});

	async function handleLogout() {
		await supabase.auth.signOut();
		if (window.addNotification) window.addNotification('Çıkış yapıldı', 'success');
	}
</script>

<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1.5 px-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] fixed top-0 left-0 w-full z-[999]">
	RB Blog: Geleceğin Teknolojileri ve Tasarım Akımları
</div>
<header class="fixed top-[28px] left-0 w-full z-[999] glass transition-all duration-300 border-b border-white/10 shadow-2xl backdrop-blur-xl">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<div class="flex items-center gap-12">
				<a href="/" class="group flex items-center gap-3">
					<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300">
						<span class="text-white font-bold text-xl">RB</span>
					</div>
					<span class="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
						RB Blog
					</span>
				</a>
				
				<nav class="hidden md:flex items-center gap-8">
					<a href="/" class="text-sm font-semibold text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Anasayfa</a>
					<a href="/tags" class="text-sm font-semibold text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Etiketler</a>
					<a href="/about" class="text-sm font-semibold text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hakkımda</a>
					<a href="/contact" class="text-sm font-semibold text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">İletişim</a>
				</nav>
			</div>

			<div class="flex items-center gap-4">
				{#if page.url.pathname !== '/'}
					<div class="relative hidden sm:block group">
						<form action="/search" method="get">
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg class="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
								<input
									type="text"
									name="q"
									placeholder="Yazılarda ara..."
									class="block w-48 md:w-64 pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-gray-800/50 border border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-gray-900 rounded-xl text-sm transition-all duration-300 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-800"
								/>
							</div>
						</form>
					</div>
				{/if}
				
				<div class="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
					{#if session}
						<button onclick={handleLogout} class="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">Çıkış Yap</button>
					{:else}
						<a href="/login" class="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Giriş Yap</a>
						<a href="/register" class="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md">Kayıt Ol</a>
					{/if}
					<ThemeToggle />
				</div>
			</div>
		</div>
	</div>
</header>

<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fade, fly } from 'svelte/transition';

	let user = $state(null);
	let loading = $state(true);

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		user = data?.user;
		loading = false;
		
		if (!user || user.email !== 'batu99964@gmail.com') {
			window.location.href = '/';
		}
	});

	async function handleLogout() {
		await supabase.auth.signOut();
		window.location.href = '/';
	}
</script>

<div class="max-w-4xl mx-auto py-12 px-4" in:fade>
	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
		</div>
	{:else if user}
		<div class="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden" in:fly={{ y: 20, duration: 800 }}>
			<!-- Background Glow -->
			<div class="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
			
			<div class="relative z-10">
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
					<div>
						<h1 class="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
							KONTROL_PANELİ
						</h1>
						<p class="text-cyan-400/70 font-mono text-sm tracking-widest uppercase">
							Sistem Durumu: Çevrimiçi | {user.email}
						</p>
					</div>
					<button 
						onclick={handleLogout}
						class="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm uppercase tracking-widest"
					>
						[SİSTEM_ÇIKIŞ]
					</button>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Create Post Card -->
					<a 
						href="/dashboard/new" 
						class="group glass p-8 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden"
					>
						<div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
						<div class="relative z-10">
							<div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
							</div>
							<h3 class="text-xl font-bold text-white mb-2">Yeni Yazı Oluştur</h3>
							<p class="text-gray-400 text-sm leading-relaxed">
								Sisteme yeni bir içerik ekleyin. Yazılarınız anında blog listesinde görünecektir.
							</p>
						</div>
					</a>

					<!-- Profile/Stats Card -->
					<div class="glass p-8 rounded-2xl border border-white/5 relative overflow-hidden">
						<div class="relative z-10">
							<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<h3 class="text-xl font-bold text-white mb-2">Profil Bilgileri</h3>
							<div class="space-y-2 mt-4 font-mono text-[10px] uppercase tracking-wider text-gray-500">
								<p>ID: <span class="text-cyan-400">{user.id.substring(0, 8)}...</span></p>
								<p>YETKİ: <span class="text-purple-400">YAZAR</span></p>
								<p>DURUM: <span class="text-green-400">AKTİF</span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fade, fly } from 'svelte/transition';

	let user = $state(null);
	let loading = $state(true);
	let allPosts = $state([]);
	let profiles = $state([]);
	let deletingId = $state(null);
	let activeTab = $state('posts'); // 'posts' or 'users'

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		user = data?.user;
		
		if (!user || user.email !== 'batu99964@gmail.com') {
			window.location.href = '/';
			return;
		}

		await Promise.all([
			fetchUsers(),
			fetchUnifiedPosts()
		]);
		loading = false;
	});

	async function fetchUsers() {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.order('created_at', { ascending: false });
		if (!error) profiles = data;
	}

	async function fetchUnifiedPosts() {
		// 1. Fetch static posts from our API
		const apiRes = await fetch('/api/posts');
		const staticPosts = await apiRes.json();
		
		// 2. Fetch DB posts from Supabase
		const { data: dbPosts, error } = await supabase
			.from('posts')
			.select('*')
			.order('created_at', { ascending: false });

		let combined = [];
		
		// Process static posts
		staticPosts.forEach(p => {
			combined.push({
				...p,
				author: 'Sistem (Admin)',
				isStatic: true
			});
		});

		// Process DB posts and match with profile emails
		if (!error && dbPosts) {
			dbPosts.forEach(p => {
				const authorProfile = profiles.find(pr => pr.id === p.author_id);
				combined.push({
					...p,
					author: authorProfile ? authorProfile.email : 'Bilinmeyen Kullanıcı',
					isStatic: false,
					date: p.created_at
				});
			});
		}

		// Sort all by date
		allPosts = combined.sort((a, b) => new Date(b.date) - new Date(a.date));
	}

	async function deletePost(id, isStatic) {
		if (isStatic) return alert('Sistem dosyaları (statik yazılar) panelden silinemez. Lütfen klasörden silin.');
		if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
		
		deletingId = id;
		const { error } = await supabase.from('posts').delete().eq('id', id);
		
		if (error) {
			alert('Silme hatası: ' + error.message);
		} else {
			allPosts = allPosts.filter(p => p.id !== id);
			if (window.addNotification) window.addNotification('Yazı başarıyla silindi', 'success');
		}
		deletingId = null;
	}

	async function handleLogout() {
		await supabase.auth.signOut();
		window.location.href = '/';
	}
</script>

<div class="max-w-6xl mx-auto py-12 px-4" in:fade>
	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
		</div>
	{:else if user}
		<div class="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden" in:fly={{ y: 20, duration: 800 }}>
			<div class="relative z-10">
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
					<div>
						<h1 class="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
							YÖNETİCİ_MERKEZİ
						</h1>
						<p class="text-cyan-400/70 font-mono text-sm tracking-widest uppercase">
							Admin: {user.email} | Üye Sayısı: {profiles.length}
						</p>
					</div>
					<div class="flex gap-4">
						<a href="/dashboard/new" class="px-6 py-2 rounded-xl bg-cyan-600 text-white font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
							[YENİ_YAZI_EKLE]
						</a>
						<button 
							onclick={handleLogout}
							class="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm uppercase tracking-widest"
						>
							[ÇIKIŞ]
						</button>
					</div>
				</div>

				<!-- Tabs -->
				<div class="flex gap-8 border-b border-white/10 mb-8">
					<button 
						onclick={() => activeTab = 'posts'}
						class="pb-4 text-sm font-bold uppercase tracking-widest transition-all {activeTab === 'posts' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 hover:text-gray-300'}"
					>
						TÜM_YAZILAR ({allPosts.length})
					</button>
					<button 
						onclick={() => activeTab = 'users'}
						class="pb-4 text-sm font-bold uppercase tracking-widest transition-all {activeTab === 'users' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 hover:text-gray-300'}"
					>
						KAYITLI_ÜYELER ({profiles.length})
					</button>
				</div>

				{#if activeTab === 'posts'}
					<!-- Management Table -->
					<div class="overflow-x-auto" in:fade>
						<table class="w-full text-left border-collapse">
							<thead>
								<tr class="border-b border-white/10 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em]">
									<th class="py-4 px-4">İÇERİK VE YAZAR</th>
									<th class="py-4 px-4">TARİH</th>
									<th class="py-4 px-4">TİP</th>
									<th class="py-4 px-4 text-right">İŞLEMLER</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-white/5">
								{#each allPosts as post}
									<tr class="hover:bg-white/5 transition-colors group">
										<td class="py-4 px-4">
											<div class="text-white font-bold">{post.title}</div>
											<div class="text-cyan-500/60 text-[10px] font-mono mt-1 uppercase">YAZAR: {post.author}</div>
										</td>
										<td class="py-4 px-4 text-gray-400 text-xs font-mono">
											{new Date(post.date).toLocaleDateString('tr-TR')}
										</td>
										<td class="py-4 px-4">
											{#if post.isStatic}
												<span class="px-2 py-1 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">Statik Dosya</span>
											{:else}
												<span class="px-2 py-1 rounded text-[9px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">Veritabanı</span>
											{/if}
										</td>
										<td class="py-4 px-4 text-right">
											{#if !post.isStatic}
												<button 
													onclick={() => deletePost(post.id, false)}
													disabled={deletingId === post.id}
													class="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10 disabled:opacity-50"
													title="Yazıyı Sil"
												>
													<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
													</svg>
												</button>
											{:else}
												<span class="text-gray-600 text-[10px] italic">Salt Okunur</span>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<!-- Users Table -->
					<div class="overflow-x-auto" in:fade>
						<table class="w-full text-left border-collapse">
							<thead>
								<tr class="border-b border-white/10 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em]">
									<th class="py-4 px-4">E-POSTA ADRESİ</th>
									<th class="py-4 px-4">KAYIT TARİHİ</th>
									<th class="py-4 px-4">DURUM</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-white/5">
								{#each profiles as profile}
									<tr class="hover:bg-white/5 transition-colors group">
										<td class="py-4 px-4">
											<div class="text-white font-bold">{profile.email}</div>
											<div class="text-gray-500 text-[10px] font-mono uppercase">ID: {profile.id.substring(0, 8)}...</div>
										</td>
										<td class="py-4 px-4 text-gray-400 text-xs font-mono">
											{new Date(profile.created_at).toLocaleDateString('tr-TR')}
										</td>
										<td class="py-4 px-4">
											<div class="flex items-center gap-2">
												<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
												<span class="text-[10px] font-bold text-green-400 uppercase tracking-widest">Aktif Üye</span>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

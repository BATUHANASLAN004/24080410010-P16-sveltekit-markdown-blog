<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fade, fly } from 'svelte/transition';

	let user = $state(null);
	let loading = $state(true);
	let allPosts = $state([]);
	let deletingId = $state(null);

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		user = data?.user;
		
		if (!user || user.email !== 'batu99964@gmail.com') {
			window.location.href = '/';
			return;
		}

		await fetchAllPosts();
		loading = false;
	});

	async function fetchAllPosts() {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.order('created_at', { ascending: false });
		
		if (!error) allPosts = data;
	}

	async function deletePost(id) {
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
							Admin: {user.email} | Toplam Yazı: {allPosts.length}
						</p>
					</div>
					<div class="flex gap-4">
						<a href="/dashboard/new" class="px-6 py-2 rounded-xl bg-cyan-600 text-white font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
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

				<!-- Management Table -->
				<div class="mt-8 overflow-x-auto">
					<table class="w-full text-left border-collapse">
						<thead>
							<tr class="border-b border-white/10 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em]">
								<th class="py-4 px-4">BAŞLIK</th>
								<th class="py-4 px-4">TARİH</th>
								<th class="py-4 px-4">DURUM</th>
								<th class="py-4 px-4 text-right">İŞLEMLER</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each allPosts as post}
								<tr class="hover:bg-white/5 transition-colors group">
									<td class="py-4 px-4">
										<div class="text-white font-bold">{post.title}</div>
										<div class="text-gray-500 text-xs">{post.description || 'Özet yok'}</div>
									</td>
									<td class="py-4 px-4 text-gray-400 text-xs font-mono">
										{new Date(post.created_at).toLocaleDateString('tr-TR')}
									</td>
									<td class="py-4 px-4">
										<span class="px-2 py-1 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
											YAYINDA
										</span>
									</td>
									<td class="py-4 px-4 text-right">
										<button 
											onclick={() => deletePost(post.id)}
											disabled={deletingId === post.id}
											class="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10 disabled:opacity-50"
											title="Yazıyı Sil"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					
					{#if allPosts.length === 0}
						<div class="py-20 text-center text-gray-500 font-mono italic">
							Henüz veritabanında yazı bulunamadı.
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<script>
	import { onMount } from 'svelte';
	let email = $state('');
	let code = $state('');
	let status = $state('idle'); // idle, loading, step2, success
	let timer = $state(0);
	let interval;

	function startTimer() {
		timer = 120; // 2 minutes
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			if (timer > 0) timer--;
			else clearInterval(interval);
		}, 1000);
	}

	async function subscribe(e) {
		e.preventDefault();
		status = 'loading';
		
		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				body: JSON.stringify({ email }),
				headers: { 'content-type': 'application/json' }
			});
			
			const result = await response.json();
			if (result.success) {
				status = 'step2';
				startTimer();
				if (window.addNotification) {
					window.addNotification(`Onay kodu e-postanıza gönderildi! Lütfen kontrol edin.`);
				}
			} else {
				status = 'idle';
				alert(result.message);
			}
		} catch (err) {
			status = 'idle';
			alert('Bir hata oluştu. Lütfen tekrar deneyin.');
		}
	}

	async function verify(e) {
		e.preventDefault();
		status = 'loading';
		
		try {
			const response = await fetch('/api/subscribe/verify', {
				method: 'POST',
				body: JSON.stringify({ email, code }),
				headers: { 'content-type': 'application/json' }
			});
			
			const result = await response.json();
			if (result.success) {
				status = 'success';
				email = '';
				code = '';
				clearInterval(interval);
				if (window.addNotification) {
					window.addNotification('Aboneliğiniz başarıyla onaylandı ve kaydedildi!');
				}
			} else {
				status = 'step2';
				alert(result.message);
			}
		} catch (err) {
			status = 'step2';
			alert('Bir hata oluştu.');
		}
	}

	function reset() {
		status = 'idle';
		code = '';
		clearInterval(interval);
	}
</script>

<section class="relative isolate overflow-hidden glass rounded-3xl p-8 sm:p-12 mt-24">
	<div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
	
	<div class="mx-auto max-w-2xl text-center">
		{#if status !== 'success'}
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl italic">
				{status === 'step2' ? 'DOĞRULAMA GEREKLİ' : 'YENİLİKLERDEN HABERDAR OLUN'}
			</h2>
			<p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
				{status === 'step2' 
					? `${email} adresine gönderilen kodu girin.` 
					: 'En yeni siber teknolojiler ve trendlerden ilk siz haberdar olun.'}
			</p>
			
			<div class="mt-10 max-w-md mx-auto">
				{#if status === 'step2'}
					<form class="flex flex-col gap-4" onsubmit={verify}>
						<input
							type="text"
							required
							maxlength="6"
							bind:value={code}
							class="w-full rounded-2xl border-0 glass bg-white/50 dark:bg-gray-800/50 px-5 py-4 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 text-center tracking-[0.8em] font-black text-2xl"
							placeholder="000000"
						/>
						<div class="flex gap-4">
							<button
								type="submit"
								disabled={status === 'loading'}
								class="flex-1 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all active:scale-95"
							>
								{status === 'loading' ? 'Kontrol Ediliyor...' : 'Kodu Onayla'}
							</button>
						</div>
					</form>
					
					<div class="mt-6 flex items-center justify-between text-sm">
						<span class="text-gray-500">
							{#if timer > 0}
								Tekrar kod istemek için: <span class="font-bold text-blue-500">{Math.floor(timer/60)}:{(timer%60).toString().padStart(2, '0')}</span>
							{:else}
								<button onclick={reset} class="text-blue-500 font-bold hover:underline">Yeni Kod Gönder</button>
							{/if}
						</span>
						<button onclick={reset} class="text-gray-400 hover:text-gray-600 underline">E-postayı Değiştir</button>
					</div>
				{:else}
					<form class="flex flex-col sm:flex-row gap-4" onsubmit={subscribe}>
						<input
							name="email"
							type="email"
							required
							bind:value={email}
							class="min-w-0 flex-auto rounded-2xl border-0 glass bg-white/50 dark:bg-gray-800/50 px-5 py-4 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500"
							placeholder="E-posta adresiniz"
						/>
						<button
							type="submit"
							disabled={status === 'loading'}
							class="flex-none rounded-2xl bg-blue-600 px-10 py-4 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
						>
							{status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
						</button>
					</form>
				{/if}
			</div>
		{:else}
			<div class="py-8 animate-bounce">
				<div class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-3xl font-black text-gray-900 dark:text-white mb-2 italic">ERİŞİM ONAYLANDI!</h3>
				<p class="text-gray-500 dark:text-gray-400">Aboneliğiniz başarıyla kaydedildi. Hoş geldiniz!</p>
				<button onclick={reset} class="mt-8 text-blue-500 font-bold hover:underline">Geri Dön</button>
			</div>
		{/if}
	</div>
</section>

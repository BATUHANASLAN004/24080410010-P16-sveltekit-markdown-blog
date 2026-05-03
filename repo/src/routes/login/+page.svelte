<script>
	import { fade } from 'svelte/transition';
	import { supabase } from '$lib/supabaseClient';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	
	let errors = $state({
		email: '',
		password: ''
	});
	let globalError = $state('');
	let successMsg = $state('');

	function validateEmail(mail) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(mail).toLowerCase());
	}

	async function handleLogin(e) {
		e.preventDefault();
		
		// Reset errors
		errors = { email: '', password: '' };
		globalError = '';
		successMsg = '';
		
		const cleanEmail = email.trim();
		let isValid = true;

		if (!cleanEmail) {
			errors.email = 'E-posta adresi boş bırakılamaz.';
			isValid = false;
		} else if (!validateEmail(cleanEmail)) {
			errors.email = 'Geçerli bir e-posta adresi giriniz. Boşluk kullanmayınız.';
			isValid = false;
		}

		if (!password) {
			errors.password = 'Şifre boş bırakılamaz.';
			isValid = false;
		}

		if (!isValid) return;

		loading = true;

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: cleanEmail,
				password
			});

			if (error) throw error;
			
			successMsg = 'Başarıyla giriş yapıldı. Siber uzaya yönlendiriliyorsunuz...';
			if (window.addNotification) window.addNotification('Giriş Başarılı!', 'success');
			
			setTimeout(() => {
				window.location.href = '/';
			}, 1500);
		} catch (error) {
			globalError = 'Giriş yapılamadı: E-posta veya şifre hatalı.';
			if (window.addNotification) window.addNotification('Giriş Hatası', 'error');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Giriş Yap | RB Blog</title>
</svelte:head>

<div class="max-w-md mx-auto pt-20" in:fade>
	<div class="glass p-8 rounded-2xl border border-slate-200 shadow-xl bg-white/80 backdrop-blur-md">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
				SİSTEME GİRİŞ
			</h1>
			<p class="text-slate-500 text-sm mt-2">Siber portala bağlanmak için kimliğinizi doğrulayın.</p>
		</div>

		<form onsubmit={handleLogin} novalidate class="space-y-5">
			<div>
				<label for="email" class="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 ml-1">E-Posta</label>
				<input 
					type="email" 
					id="email" 
					bind:value={email}
					class="w-full bg-slate-50 border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.email ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
					placeholder="isim@adres.com"
				/>
				{#if errors.email}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.email}</p>{/if}
			</div>

			<div>
				<label for="password" class="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 ml-1">Şifre</label>
				<input 
					type="password" 
					id="password" 
					bind:value={password}
					class="w-full bg-slate-50 border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.password ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}"
					placeholder="••••••••"
				/>
				{#if errors.password}<p class="text-red-500 text-xs mt-1 ml-1 font-semibold animate-pulse">{errors.password}</p>{/if}
			</div>

			{#if globalError}
				<div class="p-3 bg-red-100 border border-red-200 text-red-600 rounded-xl text-xs font-medium animate-pulse">
					{globalError}
				</div>
			{/if}

			{#if successMsg}
				<div class="p-3 bg-green-100 border border-green-200 text-green-600 rounded-xl text-xs font-medium">
					{successMsg}
				</div>
			{/if}

			<button 
				type="submit" 
				disabled={loading}
				class="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
			>
				{#if loading}
					<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
					BAĞLANILIYOR...
				{:else}
					GİRİŞ YAP
				{/if}
			</button>
		</form>

		<div class="mt-8 text-center text-sm text-slate-500">
			Henüz bir kaydınız yok mu? 
			<a href="/register" class="text-blue-600 font-bold hover:underline">Kayıt Olun</a>
		</div>
	</div>
</div>

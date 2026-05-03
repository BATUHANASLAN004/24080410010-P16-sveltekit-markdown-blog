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

	async function handleRegister(e) {
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
		} else if (password.length < 6) {
			errors.password = 'Şifre en az 6 karakter olmalıdır.';
			isValid = false;
		}

		if (!isValid) return;

		loading = true;

		try {
			const { data, error } = await supabase.auth.signUp({
				email: cleanEmail,
				password
			});

			if (error) throw error;
			
			successMsg = 'Kayıt başarılı! Lütfen giriş yapın.';
			if (window.addNotification) window.addNotification('Kayıt Başarılı!', 'success');
			
			setTimeout(() => {
				window.location.href = '/login';
			}, 2000);
		} catch (error) {
			globalError = error.message;
			if (window.addNotification) window.addNotification('Kayıt Hatası', 'error');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Kayıt Ol | RB Blog</title>
</svelte:head>

<div class="max-w-md mx-auto pt-20" in:fade>
	<div class="glass p-8 rounded-2xl border border-slate-200 shadow-xl bg-white/80 backdrop-blur-md">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
				SİBER KAYIT
			</h1>
			<p class="text-slate-500 text-sm mt-2">Ağa katılmak için yeni bir kimlik oluşturun.</p>
		</div>

		<form onsubmit={handleRegister} novalidate class="space-y-5">
			<div>
				<label for="email" class="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 ml-1">E-Posta</label>
				<input 
					type="email" 
					id="email" 
					bind:value={email}
					class="w-full bg-slate-50 border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.email ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}"
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
					class="w-full bg-slate-50 border text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all {errors.password ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'}"
					placeholder="En az 6 karakter"
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
				class="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-bold tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
			>
				{#if loading}
					<div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
					KAYDEDİLİYOR...
				{:else}
					KAYIT OL
				{/if}
			</button>
		</form>

		<div class="mt-8 text-center text-sm text-slate-500">
			Zaten bir kaydınız var mı? 
			<a href="/login" class="text-purple-600 font-bold hover:underline">Giriş Yapın</a>
		</div>
	</div>
</div>

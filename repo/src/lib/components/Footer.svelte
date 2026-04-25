<footer class="mt-32 flex-none border-t border-gray-100 dark:border-gray-800/40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12">
			<div class="col-span-1 md:col-span-2">
				<a href="/" class="flex items-center gap-3 mb-6">
					<div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
						<span class="text-white font-bold text-lg">RB</span>
					</div>
					<span class="text-xl font-bold tracking-tight">RB Blog</span>
				</a>
				<p class="text-gray-600 dark:text-gray-400 max-w-sm">
					Modern web teknolojileri, tasarım trendleri ve yazılım dünyasından en güncel içeriklerle dolu kişisel blog projesi.
				</p>
			</div>
			
			<div>
				<h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">Hızlı Bağlantılar</h3>
				<ul class="space-y-4 text-sm font-medium text-gray-600 dark:text-gray-400">
					<li><a href="/" class="hover:text-blue-600 transition-colors">Anasayfa</a></li>
					<li><a href="/tags" class="hover:text-blue-600 transition-colors">Etiketler</a></li>
					<li><a href="/search" class="hover:text-blue-600 transition-colors">Arama</a></li>
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">Yasal & Beslemeler</h3>
				<ul class="space-y-4 text-sm font-medium text-gray-600 dark:text-gray-400">
					<li><a href="/rss.xml" class="hover:text-blue-600 transition-colors">RSS Feed</a></li>
					<li><a href="/sitemap.xml" class="hover:text-blue-600 transition-colors">Sitemap</a></li>
					<li><a href="https://github.com" target="_blank" class="hover:text-blue-600 transition-colors">GitHub</a></li>
				</ul>
			</div>
		</div>
		
		<div class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
			<p class="text-xs text-gray-500">
				&copy; {new Date().getFullYear()} RB Blog. Tüm hakları saklıdır. SvelteKit & Tailwind CSS ile geliştirildi.
			</p>
			<div class="flex gap-6 items-center">
				<a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
					<span class="sr-only">Twitter</span>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
				</a>
				<div class="h-4 w-px bg-gray-200 dark:bg-gray-800"></div>
				<div class="flex flex-col items-end">
					<span class="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Crafted By</span>
					<span class="text-2xl font-black italic tracking-tighter bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent opacity-50 hover:opacity-100 transition-opacity cursor-default select-none">
						RB
					</span>
				</div>
			</div>
		</div>
	</div>
</footer>

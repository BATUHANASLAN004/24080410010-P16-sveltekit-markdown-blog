<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let mounted = $state(false);
    onMount(() => mounted = true);
    
    const projects = [
        { slug: 'cyber-blog', title: 'Cyber Blog Engine', desc: 'SvelteKit & FUI based blog', tags: ['SvelteKit', 'Tailwind'] },
        { slug: 'ai-assistant', title: 'AI Assistant', desc: 'Gemini integrated chat bot', tags: ['API', 'AI'] },
        { slug: 'crypto-dashboard', title: 'Crypto Dashboard', desc: 'Realtime btc/eth dashboard', tags: ['WebSockets', 'Finance'] }
    ];
</script>

<svelte:head>
    <title>Portfolyo | RB Blog</title>
</svelte:head>

<div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight mb-4 text-glow">
            Projelerim
        </h1>
        <p class="text-xl text-slate-400 max-w-2xl">
            Geliştirdiğim fütüristik web uygulamaları ve açık kaynak projeler.
        </p>
    </div>

    {#if mounted}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" in:fade={{ duration: 300 }}>
            {#each projects as project, i}
                <a href="/portfolio/{project.slug}" class="block group" in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
                    <div class="h-full relative glass-card p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 class="text-2xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                        <p class="text-slate-400 mb-6">{project.desc}</p>
                        
                        <div class="flex flex-wrap gap-2 mt-auto">
                            {#each project.tags as tag}
                                <span class="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-800/50">
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>

<style>
    .glass-card {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }
    .text-glow {
        text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
    }
</style>

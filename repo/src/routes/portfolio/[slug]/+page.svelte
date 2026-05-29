<script>
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    
    // Simple mock data for portfolio details
    const projects = {
        'cyber-blog': { title: 'Cyber Blog Engine', content: 'This is a futuristic blog engine built with SvelteKit and TailwindCSS. It features MDsveX markdown rendering, a glowing UI, and AI integrations.', image: 'landing.png' },
        'ai-assistant': { title: 'AI Assistant', content: 'An integrated chatbot using the Google Gemini API to assist readers in real-time.', image: 'dashboard_empty.png' },
        'crypto-dashboard': { title: 'Crypto Dashboard', content: 'A conceptual dashboard showing simulated or live metrics for CPU, RAM, and crypto prices.', image: 'dashboard_full.png' }
    };
    
    let slug = $derived($page.params.slug);
    let project = $derived(projects[slug] || { title: 'Proje Bulunamadı', content: 'Böyle bir proje sistemde yok.' });
</script>

<svelte:head>
    <title>{project.title} | RB Blog</title>
</svelte:head>

<div class="max-w-4xl mx-auto py-12 px-4" in:fade={{ duration: 400 }}>
    <a href="/portfolio" class="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-8 transition-colors">
        <span aria-hidden="true">&larr;</span> Projelere Dön
    </a>
    
    <article class="glass-card p-8 rounded-2xl border border-white/10">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-100 mb-6">{project.title}</h1>
        
        <div class="prose prose-invert prose-cyan max-w-none">
            <p class="text-lg text-slate-300 leading-relaxed">
                {project.content}
            </p>
        </div>
    </article>
</div>

<style>
    .glass-card {
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
</style>

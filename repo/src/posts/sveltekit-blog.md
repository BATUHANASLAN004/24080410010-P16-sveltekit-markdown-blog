---
title: SvelteKit ile Blog Yapımı
description: SvelteKit, MDsveX ve Shiki kullanarak modern bir blog nasıl oluşturulur?
date: '2024-04-24'
categories:
  - sveltekit
  - mdsvex
published: true
---

# SvelteKit ile Blog Yapımı

SvelteKit, modern web uygulamaları geliştirmek için harika bir framework. Özellikle blog gibi statik içerik ağırlıklı siteler için **SSG (Static Site Generation)** desteği ile mükemmel performans sunar.

## Kod Örneği

İşte basit bir Svelte componenti:

```svelte
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Sayaç: {count}
</button>
```

Bu blog motoru **MDsveX** kullanarak Markdown dosyalarınızı doğrudan Svelte component'larına dönüştürür.

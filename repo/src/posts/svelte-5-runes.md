---
title: Svelte 5 Runes ile Reaktivite Devrimi
description: $state, $derived ve $effect ile Svelte dünyasında yeni bir dönem başlıyor.
date: '2024-04-23'
categories:
  - svelte
  - runes
published: true
---

# Svelte 5: Runes

Svelte 5, reaktiviteyi daha açık ve güçlü hale getiren **Runes** konseptini hayatımıza sokuyor. Artık reaktivite sadece `.svelte` dosyalarında değil, her yerde!

## Neden Runes?

Eski `let count = 0;` ve `$: double = count * 2;` syntax'ı basit olsa da, karmaşık uygulamalarda takibi zorlaşabiliyordu. Runes ile bu durum değişiyor.

```svelte
<script>
  let count = $state(0);
  let double = $derived(count * 2);

  $effect(() => {
    console.log(`Sayaç değeri: ${count}`);
  });
</script>

<button onclick={() => count++}>
  Arttır: {count} (2 Katı: {double})
</button>
```

### Temel Runes:
- **$state:** Değişebilir state tanımlar.
- **$derived:** Diğer state'lerden türetilen değerler için kullanılır.
- **$effect:** State değişimlerine tepki vermek (side effects) için kullanılır.

Svelte 5 ile kodlarınız artık daha okunabilir ve yönetilebilir. Bu blog motoru da Svelte 5'in gücünden tam anlamıyla yararlanıyor!

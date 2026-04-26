# Domus AI — Rapport SEO & GEO Hebdomadaire
**Date :** 26 avril 2026  
**Auteur :** Analyse automatique (tâche planifiée)  
**Portée :** domus-ai.fr — site statique HTML sur Vercel

---

## 1. État du projet

### Ce qui est en place (cumul)
- Site live depuis le 13 avril 2026 sur domus-ai.fr (Vercel, DNS OVHcloud)
- Homepage avec JSON-LD `ProfessionalService` + Google Analytics
- Blog avec **7 articles publiés**, tous avec JSON-LD Article + HowTo ou FAQPage + BreadcrumbList
- Sitemap.xml avec 13 pages (ajout de `wassim-rbila.html` ce cycle)
- Propriété Google Search Console vérifiée, homepage confirmée indexée
- Page FAQ `/faq-ia-immobilier.html` — 11 Q&A, FAQPage schema, speakable
- Social : LinkedIn + Instagram actifs

### Positionnement
Niche très ciblée et peu occupée : **IA pour agences immobilières en France**. Wassim Rbila est le seul acteur positionné explicitement sur ce croisement avec un site dédié, du contenu expert et une offre structurée. Domus AI accumule désormais un corpus de contenu solide (7 articles + 1 FAQ + 1 page expert) qui commence à constituer une véritable autorité thématique.

### Forces
- Contenu long-form de qualité, en français, avec cas d'usage concrets et données vérifiables
- Structure technique solide : canonical, sitemap, OG, JSON-LD sur toutes les pages
- Structured data complet : HowTo, FAQPage, Article, BreadcrumbList sur tous les articles
- Nouvelle page entité expert (`wassim-rbila.html`) avec `Person` schema — signal fort pour les LLM
- Toutes les pages `author` pointent désormais vers un `@id` stable et dé-référençable

### Faiblesses restantes
- ❌ Pas encore de backlinks externes — aucun site tiers ne pointe vers domus-ai.fr
- ❌ Aucune présence dans les citations de ChatGPT/Perplexity à ce jour (site trop récent)
- ⚠️ LinkedIn : posts publiés mais engagement encore limité
- ⚠️ La page `wassim-rbila.html` doit être soumise en indexation dans Search Console

---

## 2. Action SEO — Ajout de `<time>` sur les articles 1 à 6

### Problème
Les 6 premiers articles (articles 1 à 6) n'avaient pas de balise `<time datetime="...">` visible dans leur HTML, contrairement à l'article 7 qui l'avait correctement. Google utilise la date visible dans le contenu pour confirmer la fraîcheur d'un article — sans balise `<time>`, les articles 1-6 étaient plus difficiles à dater précisément pour le crawler.

### Pourquoi c'est l'action la plus impactante maintenant
Le JSON-LD `datePublished` existait déjà dans tous les articles. La balise `<time>` visible ajoute une **double confirmation** de la date : machine-readable ET visible dans le contenu HTML. Google accorde plus de confiance à la date quand elle est cohérente à deux niveaux. Pour un site jeune encore en phase d'indexation, chaque signal de fiabilité compte.

### Ce qui a été implémenté
Ajout d'un `<time datetime="...">Publié le [date]</time>` dans la section `.article-meta-top` de chaque article :

| Article | Date ajoutée |
|---|---|
| article-1.html | `2026-04-10` |
| article-2.html | `2026-04-10` |
| article-3.html | `2026-04-10` |
| article-4.html | `2026-04-13` |
| article-5.html | `2026-04-13` |
| article-6.html | `2026-04-13` |

### Résultat attendu
- Confirmation de fraîcheur cohérente entre le JSON-LD et le contenu visible
- Meilleur scoring sur les signaux de fiabilité temporelle dans Google
- Réduction du risque que Google ignore la date ou considère les articles comme "sans date" dans les rich results

---

## 3. Action GEO — Page entité expert `wassim-rbila.html`

### Problème
Les moteurs génératifs (ChatGPT, Perplexity, Google AI Overview) peuvent citer "Domus AI" comme organisation, mais pas "Wassim Rbila" comme expert identifié, parce qu'il n'existait aucune page dédiée à sa personne. Sans page entité avec un `@id` stable, les LLM n'ont aucune ancre pour résoudre "qui est Wassim Rbila ?" ou "qui est le spécialiste IA × Immobilier en France ?".

### Pourquoi c'est l'action la plus impactante pour le GEO
Les moteurs génératifs construisent leur réponse autour d'**entités reconnues** : une personne, une organisation, un concept. Une entité n'existe pour un LLM que si elle est encodée de façon dé-référençable — c'est-à-dire si une URL stable lui est associée avec des attributs sémantiques clairs (`name`, `jobTitle`, `knowsAbout`, `sameAs`, `alumniOf`, etc.). Sans cette page, Domus AI existe comme organisation mais pas Wassim Rbila comme expert. Avec cette page, les deux existent et sont liés.

### Ce qui a été créé

**Nouvelle page :** `/wassim-rbila.html`

**JSON-LD `Person` complet :**
- `@id` stable : `https://www.domus-ai.fr/wassim-rbila.html#wassim-rbila`
- `sameAs` → LinkedIn (corroboration externe pour les LLM)
- `knowsAbout` : 14 domaines explicites (ChatGPT pour agences, DVF + IA, démarchage, RGPD, etc.)
- `alumniOf` : Betclic, Rakuten, Mention
- `affiliation` : Tesla, Nike, McDonald's (projets clients — signaux d'autorité vérifiables)
- `hasOccupation` : description précise du rôle conseil/formation
- `areaServed` : France
- `FAQPage` intégrée : 6 Q&A structurées sur "Qui est Wassim Rbila ?"

**Contenu HTML optimisé pour extraction LLM :**
- Biographie concise (< 200 mots, réponse directe)
- Parcours professionnel avec entreprises nommées
- FAQ accordion (format question→réponse directe idéal pour les moteurs génératifs)
- Section "Ressources liées" avec liens internes vers tous les articles et la FAQ

**Mise à jour du graphe sémantique :**
- `founder` dans le JSON-LD homepage pointe maintenant vers l'`@id` de la page entité
- `author` dans les **7 articles de blog** pointe maintenant vers l'`@id` de la page entité (au lieu de `#apropos`)
- `author` dans la page FAQ pointe vers l'`@id` de la page entité
- Page ajoutée au sitemap avec priorité 0.8

### Prompts que cette page capture maintenant
- *"Qui est l'expert IA immobilier en France ?"*
- *"Qui est Wassim Rbila ?"*
- *"Qui accompagne les agences immobilières sur l'IA ?"*
- *"Y a-t-il un consultant IA spécialisé dans l'immobilier ?"*
- *"Qui a fondé Domus AI ?"*

### Résultat attendu
- Construction d'une entité `Person` reconnue par Google Knowledge Graph et les LLM
- Hausse de la probabilité d'être cité nommément par ChatGPT/Perplexity sur les requêtes d'expertise
- Renforcement de l'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) sur l'ensemble du site via l'authorship cohérent
- Meilleure durabilité des citations IA : une entité avec `@id` stable résiste mieux aux mises à jour des modèles

---

## 4. Fichiers modifiés ce cycle

| Fichier | Type de modification |
|---|---|
| `blog/article-1.html` | Ajout `<time datetime="2026-04-10">`, mise à jour `author` → entity page |
| `blog/article-2.html` | Ajout `<time datetime="2026-04-10">`, mise à jour `author` → entity page |
| `blog/article-3.html` | Ajout `<time datetime="2026-04-10">`, mise à jour `author` → entity page |
| `blog/article-4.html` | Ajout `<time datetime="2026-04-13">`, mise à jour `author` → entity page |
| `blog/article-5.html` | Ajout `<time datetime="2026-04-13">`, mise à jour `author` → entity page |
| `blog/article-6.html` | Ajout `<time datetime="2026-04-13">`, mise à jour `author` → entity page |
| `blog/article-7.html` | Mise à jour `author` → entity page |
| `faq-ia-immobilier.html` | Mise à jour `author` → entity page avec `@id` |
| `index.html` | Mise à jour `founder` → entity page avec `@id` et `sameAs` |
| `wassim-rbila.html` | **Création** — page entité expert, Person schema complet, FAQ intégrée |
| `sitemap.xml` | Ajout `wassim-rbila.html` avec priorité 0.8 et `lastmod` 2026-04-26 |

---

## 5. Prochaines actions recommandées (semaine suivante)

### SEO
- [ ] Déployer sur Vercel et soumettre le sitemap mis à jour dans Google Search Console
- [ ] Demander l'indexation de `/wassim-rbila.html` dans Search Console (URL Inspection Tool)
- [ ] Recontrôler l'indexation de `/blog/` et `/faq-ia-immobilier.html` si ce n'est pas encore fait
- [ ] Vérifier les rich results avec Google Rich Results Test sur les 6 articles mis à jour

### GEO
- [ ] **Partager la page `wassim-rbila.html` sur LinkedIn** avec un post sobre qui cite 2-3 faits clés — génère un backlink ET un signal social que les LLM lisent lors de leur crawl
- [ ] Écrire le prochain article en format "Réponse directe" : commencer par la réponse en 2 lignes, développer ensuite — format optimal pour Google AI Overview et Perplexity
- [ ] **Ajouter un lien "À propos de l'auteur"** au bas de chaque article pointant vers `wassim-rbila.html` — renforce l'authorship pour les lecteurs ET pour les crawlers IA

### Contenu
- [ ] **Article 8 suggéré** : *"IA et RGPD dans une agence immobilière : ce qui est autorisé, ce qui est risqué"* — cible une requête à fort volume de recherche post-loi, utile avant la date limite d'août 2026, et couvre un angle que les concurrents n'ont pas encore traité avec précision.

---

*Rapport généré automatiquement par la tâche planifiée SEO/GEO — Domus AI*

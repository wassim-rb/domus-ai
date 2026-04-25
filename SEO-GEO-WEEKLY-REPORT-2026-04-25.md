# Domus AI — Rapport SEO & GEO Hebdomadaire
**Date :** 25 avril 2026  
**Auteur :** Analyse automatique (tâche planifiée)  
**Portée :** domus-ai.fr — site statique HTML sur Vercel

---

## 1. État du projet

### Ce qui est en place
- Site live depuis le 13 avril 2026 sur domus-ai.fr (Vercel, DNS OVHcloud)
- Homepage complète avec JSON-LD `ProfessionalService` + Google Analytics
- Blog avec 6 articles publiés, tous bien ciblés sur des mots-clés terrain
- Sitemap.xml et robots.txt en place
- Social : LinkedIn + Instagram actifs
- Meta tags et OG tags corrects sur toutes les pages

### Positionnement
Niche très ciblée et peu occupée : **IA pour agences immobilières en France**. Wassim Rbila est le seul acteur positionné explicitement sur ce croisement avec un site dédié, du contenu expert et une offre structurée (Formation / Solutions / Expertise). C'est une fenêtre d'opportunité significative.

### Forces
- Contenu de qualité, long-form, en français, avec des cas d'usage concrets
- Structure technique solide (canonical, sitemap, OG, JSON-LD homepage)
- Pricing transparent, offres différenciées
- Profil fondateur crédible (10 ans en IA/data, références Betclic/Rakuten/Tesla)

### Faiblesses identifiées (avant ce rapport)
- ❌ Aucun structured data sur les 6 articles de blog (zéro chance de rich results)
- ❌ Aucune page FAQ dédiée pour capturer les requêtes LLM et "Autres questions"
- ⚠️ Page FAQ interne (homepage #faq) non indexable séparément
- ⚠️ Sitemap avec dates de modification outdatées sur les articles 4-6

---

## 2. Action SEO — Structured Data sur les articles de blog

### Problème
Les 6 articles du blog n'avaient aucun balisage `Article`, `HowTo` ou `FAQPage`. Google ne peut pas les identifier comme des guides pratiques ou des procédures étape par étape, ce qui ferme l'accès aux rich results (How-To cards, FAQ pills, breadcrumbs enrichis).

### Pourquoi c'est l'action la plus impactante maintenant
Un site récent avec peu de backlinks ne peut pas se battre sur l'autorité de domaine. Les rich results permettent d'occuper plus de place dans les SERP même avec peu d'autorité. Sur une requête comme "comment faire un compte rendu de visite immobilier avec l'IA", un résultat avec How-To steps cliquables surclasse visuellement des résultats sans schema.

### Ce qui a été implémenté

**Article 1** — Qualification de leads  
→ `Article` + `HowTo` (4 étapes : SMS initial, routage, seuils, relance) + `BreadcrumbList`

**Article 2** — DVF + IA pour l'estimation  
→ `Article` + `HowTo` (4 étapes : télécharger DVF, uploader dans l'IA, construire la fourchette, valider) + `BreadcrumbList`

**Article 3** — Compte rendu de visite  
→ `Article` + `HowTo` (4 étapes : note vocale, transcription IA, structuration, email vendeur) + `BreadcrumbList`

**Article 4** — Remplacer le démarchage téléphonique  
→ `Article` + `HowTo` (plan 30/60/90j : audit base, workflows inbound, formation équipe) + `BreadcrumbList`

**Article 5** — Nettoyer le fichier prospects  
→ `Article` + `HowTo` (4 étapes : audit CRM, segmentation, campagnes réactivation, archivage) + `BreadcrumbList`

**Article 6** — Courriers immobiliers avec l'IA  
→ `Article` + `FAQPage` (3 Q&A sur contrats, automatisation sûre, niveau de relecture) + `BreadcrumbList`

### Résultat attendu
- Éligibilité aux How-To rich results dans Google (visibles dans 4-6 semaines après ré-indexation)
- Breadcrumbs enrichis dans les SERP
- Meilleure compréhension par Google du type et de la structure du contenu
- Hausse du CTR estimée : +15 à 40% sur les articles éligibles aux rich results

### Prochaine étape
Vérifier les 6 articles dans [Google Rich Results Test](https://search.google.com/test/rich-results) après le prochain déploiement Vercel. Soumettre sitemap dans Google Search Console pour forcer le re-crawl.

---

## 3. Action GEO — Page FAQ IA & Immobilier

### Problème
Les moteurs génératifs (ChatGPT, Perplexity, Google AI Overview) cherchent des sources faisant autorité qui répondent directement et exhaustivement aux questions des utilisateurs. Sans une page FAQ structurée et bien balisée, Domus AI ne peut pas être cité comme référence quand un utilisateur demande "comment l'IA peut aider une agence immobilière" ou "quel outil IA utiliser pour l'immobilier en France".

### Pourquoi c'est l'action la plus impactante pour le GEO
Les LLM extractent des patterns de texte : question → réponse courte, directe, bien structurée. Une page `FAQPage` avec un schéma explicite et des réponses de 100-200 mots par question est le format le plus consommable pour un moteur génératif. C'est l'équivalent de "parler en langage LLM".

### Ce qui a été créé
**Nouvelle page :** `/faq-ia-immobilier.html`

Contenu : 11 questions expertes organisées en 4 catégories :
1. **Usages concrets** — comment utiliser l'IA, estimation, contrats, démarchage téléphonique
2. **Outils & coûts** — ChatGPT vs Claude, budget de déploiement
3. **Mise en place & adoption** — accessibilité équipes non-techniques, durée de formation, risques
4. **À propos de Domus AI** — qui est Wassim Rbila, l'IA remplace-t-elle les agents ?

**Structured data intégré :**
- `FAQPage` avec `mainEntity` (11 Q&A) — format natif pour les rich results FAQ Google
- `WebPage` avec `speakable` (pour voice search et AI Overviews)
- `about` (entités sémantiques : IA immobilier, ChatGPT, Claude, agences immobilières en France)
- `mentions` (références à ChatGPT, Claude, dataset DVF)
- `BreadcrumbList`

**Signaux d'autorité pour les LLM intégrés dans les réponses :**
- Références concrètes à des outils (ChatGPT Plus 20€/mois, DVF data.gouv.fr)
- Chiffres vérifiables (10h/mois gagnées, 15 minutes pour une estimation, ROI < 2 mois)
- Contexte réglementaire précis (11 août 2026, RGPD)
- Profil auteur avec expérience vérifiable (Betclic, Rakuten, Tesla, Nike)

**Mise à jour de la navigation :**
- Le lien "FAQ" dans le nav de la homepage pointe maintenant sur cette page dédiée (au lieu du scroll anchor #faq)
- Page ajoutée au sitemap.xml avec priorité 0.9

### Résultat attendu
- Indexation rapide comme page FAQ dans Google (FAQ rich results dans les SERP)
- Probabilité d'être cité par ChatGPT/Perplexity sur des requêtes comme :
  - *"Comment utiliser l'IA dans une agence immobilière en France ?"*
  - *"Quel outil IA pour un agent immobilier ?"*
  - *"Est-ce que l'IA peut remplacer un agent immobilier ?"*
  - *"Combien coûte l'IA pour une agence immobilière ?"*
- Construction d'une "entité" reconnue : Domus AI = référence IA × Immobilier France

### Pourquoi ça marche pour les LLM
Les moteurs génératifs citent des sources qui : (1) répondent directement à une question précise, (2) contiennent des données vérifiables, (3) sont clairement associées à un auteur expert, (4) sont structurées avec du balisage sémantique. Cette page remplit les quatre critères.

---

## 4. Fichiers modifiés ce cycle

| Fichier | Type de modification |
|---|---|
| `blog/article-1.html` | Ajout JSON-LD Article + HowTo + BreadcrumbList |
| `blog/article-2.html` | Ajout JSON-LD Article + HowTo + BreadcrumbList |
| `blog/article-3.html` | Ajout JSON-LD Article + HowTo + BreadcrumbList |
| `blog/article-4.html` | Ajout JSON-LD Article + HowTo + BreadcrumbList |
| `blog/article-5.html` | Ajout JSON-LD Article + HowTo + BreadcrumbList |
| `blog/article-6.html` | Ajout JSON-LD Article + FAQPage + BreadcrumbList |
| `faq-ia-immobilier.html` | Création (nouvelle page FAQ dédiée GEO) |
| `index.html` | Mise à jour lien nav FAQ → page dédiée |
| `sitemap.xml` | Ajout faq-ia-immobilier.html, mise à jour dates blog |

---

## 5. Prochaines actions recommandées (semaine suivante)

### SEO
- [ ] Déployer sur Vercel et soumettre sitemap dans Google Search Console
- [ ] Vérifier les rich results avec Google Rich Results Test sur les 6 articles
- [ ] Ajouter `datePublished` visible dans le HTML des articles (balise `<time>`) pour renforcer l'autorité temporelle auprès de Google

### GEO
- [ ] Partager la page FAQ sur LinkedIn avec un post qui cite 2-3 réponses clés → génère des backlinks et des signaux d'autorité que les LLM lisent
- [ ] Écrire le prochain article de blog en format "Réponse directe" (commencer par la réponse en 2 lignes, puis développer) — format optimal pour Google AI Overview et Perplexity
- [ ] Ajouter un lien vers la FAQ dans le footer du site

### Contenu
- [ ] Article 7 (identifié dans le checklist projet) — priorité aux sujets avec forte demande LLM : "Comment écrire une annonce immobilière avec ChatGPT" est la requête la plus cherchée dans ce domaine

---

*Rapport généré automatiquement par la tâche planifiée SEO/GEO — Domus AI*

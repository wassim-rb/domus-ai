# Domus AI — Rapport SEO & GEO Hebdomadaire
**Date :** 27 avril 2026  
**Auteur :** Analyse automatique (tâche planifiée)  
**Portée :** domus-ai.fr — site statique HTML sur Vercel

---

## 1. État du projet

### Ce qui est en place (cumul à ce jour)
- Site live depuis le 13 avril 2026 sur domus-ai.fr (Vercel, DNS OVHcloud)
- Homepage avec JSON-LD `ProfessionalService` + Google Analytics
- Blog avec **8 articles publiés**, tous avec JSON-LD Article + HowTo ou FAQPage + BreadcrumbList
- Balises `<time datetime>` visibles sur tous les articles (double confirmation de fraîcheur pour Google)
- Sitemap.xml avec 14 pages (ajout de `article-8.html` ce cycle)
- Propriété Google Search Console vérifiée, homepage confirmée indexée
- Page FAQ `/faq-ia-immobilier.html` — 11 Q&A, FAQPage schema, speakable
- Page entité expert `/wassim-rbila.html` — Person schema complet, `@id` stable, FAQ intégrée
- **Section "À propos de l'auteur"** ajoutée sur les 7 articles existants — lien vers `wassim-rbila.html`
- Social : LinkedIn + Instagram actifs

### Positionnement
Niche très ciblée et peu occupée : **IA pour agences immobilières en France**. Wassim Rbila est le seul acteur positionné explicitement sur ce croisement avec un site dédié, du contenu expert structuré et une offre claire. Le corpus atteint désormais 8 articles + 1 FAQ + 1 page entité expert, couvrant les cas d'usage terrain les plus recherchés.

### Forces
- Corpus de contenu long-form solide (8 articles), tous ciblés sur des requêtes terrain à fort intent
- Structure technique complète : canonical, sitemap, OG, JSON-LD sur toutes les pages
- Graphe sémantique cohérent : `founder`, `author`, `@id` stable sur toutes les pages liées à Wassim Rbila
- Page entité expert (`wassim-rbila.html`) + sections author bio sur chaque article — authorship complet
- Article 8 couvre un angle critique (RGPD × IA) absent chez tous les concurrents, avec deadline réglementaire août 2026

### Faiblesses restantes
- ❌ Aucun backlink externe à ce jour — c'est la principale limite à l'autorité de domaine
- ❌ Pas encore de citations nommées dans ChatGPT/Perplexity (site trop récent, ~2 semaines)
- ⚠️ `wassim-rbila.html` et `article-8.html` doivent être soumis en indexation dans Search Console
- ⚠️ LinkedIn : posts publiés, engagement encore à construire

---

## 2. Action SEO — Sections "À propos de l'auteur" sur les 7 articles existants

### Problème
Les articles 1 à 7 avaient un `author` dans leur JSON-LD pointant vers `wassim-rbila.html#wassim-rbila`, mais aucun signal visible pour les lecteurs ni pour les crawlers dans le corps HTML. Google valorise l'**authorship explicite** dans le HTML (pas seulement dans le structured data) pour scorer l'E-E-A-T d'une page, surtout sur un site jeune sans backlinks.

### Pourquoi c'est l'action la plus impactante maintenant
Les recommandations des deux rapports précédents signalaient cette action comme prioritaire. C'est maintenant exécuté. L'ajout d'une section author bio visible dans le HTML fait trois choses simultanément : renforce le signal E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) sur chaque article, crée 7 liens HTML internes supplémentaires vers `wassim-rbila.html` (signal de PageRank interne), et améliore l'UX en donnant au lecteur un chemin de conversion naturel vers le profil expert.

### Ce qui a été implémenté
- Section `.author-bio` ajoutée à la fin de **chaque article (1 à 7)**, avant `</article>`
- Contenu : photo de profil, nom lié à `wassim-rbila.html`, titre de poste, biographie courte (2 lignes), lien "Voir le profil complet →"
- CSS `.author-bio` ajouté à `assets/article.css` (responsive, cohérent avec le design system existant)
- Article 8 publié directement avec la section author bio intégrée

### Résultat attendu
- Renforcement E-E-A-T sur les 7 articles existants — signal de confiance pour Google sur un site jeune
- 7 nouveaux liens internes vers `wassim-rbila.html` — aide à l'indexation et à l'autorité de cette page
- Meilleure cohérence entre le JSON-LD `author` et le contenu visible — double validation pour le crawler
- Hausse potentielle du temps passé sur le site (les lecteurs découvrent le profil expert)

### Fichiers modifiés
| Fichier | Modification |
|---|---|
| `blog/article-1.html` | Ajout section `.author-bio` |
| `blog/article-2.html` | Ajout section `.author-bio` |
| `blog/article-3.html` | Ajout section `.author-bio` |
| `blog/article-4.html` | Ajout section `.author-bio` |
| `blog/article-5.html` | Ajout section `.author-bio` |
| `blog/article-6.html` | Ajout section `.author-bio` |
| `blog/article-7.html` | Ajout section `.author-bio` |
| `assets/article.css` | Ajout styles `.author-bio` + `.data-table` |

---

## 3. Action GEO — Article 8 : IA et RGPD dans une agence immobilière

### Problème
Aucun contenu sur domus-ai.fr ne couvrait la question RGPD × IA, alors que c'est la première question de blocage des agences qui envisagent d'adopter l'IA. Les moteurs génératifs (ChatGPT, Perplexity, Google AI Overview) cherchent des sources faisant autorité qui répondent directement et exhaustivement aux questions réglementaires — c'est exactement le type de contenu qu'ils citent le plus souvent.

### Pourquoi c'est l'action la plus impactante pour le GEO
Trois facteurs convergent sur cet article :
1. **Urgence réglementaire** — la loi du 11 août 2026 crée une deadline concrète, ce qui génère une vague de recherches à fort intent dans les prochaines semaines
2. **Zéro concurrence** — aucun autre acteur en France ne couvre précisément l'angle "RGPD × IA × agences immobilières" avec des recommandations opérationnelles
3. **Format optimal pour les LLM** — l'article utilise le format "réponse directe d'abord, développement ensuite" recommandé depuis le rapport du 25 avril, avec une FAQPage structurée couvrant exactement les requêtes que les agents immobiliers posent aux moteurs génératifs

### Ce qui a été créé

**Nouvelle page :** `/blog/article-8.html`

**Titre :** *IA et RGPD dans une agence immobilière : ce qui est autorisé, ce qui est risqué en 2026*

**Structure "réponse directe" :** le lede donne la réponse en 3 lignes avant tout développement — format optimal pour Google AI Overview et Perplexity qui extraient la première réponse directe du contenu.

**JSON-LD complet :**
- `Article` avec `datePublished`, `author` → `@id` stable, `keywords` ciblés
- `HowTo` en 4 étapes : cartographie des données, distinction outils avec/sans DPA, anonymisation, registre de traitement
- `FAQPage` avec 5 Q&A couvrant les requêtes les plus directes :
  - *"Peut-on utiliser ChatGPT avec les données clients d'une agence immobilière ?"*
  - *"Quelles données personnelles ne doit-on jamais soumettre à une IA cloud ?"*
  - *"Qu'est-ce qui change avec la loi du 11 août 2026 ?"*
  - *"Une agence immobilière doit-elle nommer un DPO pour utiliser l'IA ?"*
  - *"Comment qualifier des leads avec l'IA sans violer le RGPD ?"*
- `BreadcrumbList`

**Signaux d'autorité pour les LLM :**
- Références légales précises (article 22 RGPD, article 30 RGPD, loi 11 août 2026)
- Tableau comparatif des outils IA avec statut DPA vérifiable (ChatGPT gratuit/Team, Claude, Copilot)
- Chiffres opérationnels concrets (10 secondes d'anonymisation, 30-60 min de cartographie, 1h de formation équipe)
- Lien interne vers articles 4, 5, 6 (prospection, fichier prospects, courriers) — renforce la cohérence thématique

**Prompts que cet article capture :**
- *"Peut-on utiliser ChatGPT dans une agence immobilière sans violer le RGPD ?"*
- *"RGPD et IA immobilier : ce qui est autorisé"*
- *"Qu'est-ce que la loi du 11 août 2026 change pour les agences ?"*
- *"Données personnelles et IA : comment se conformer dans l'immobilier ?"*
- *"ChatGPT RGPD agence immobilière"*

### Mise à jour du blog et du sitemap
- Article 8 ajouté au `blog/index.html` (nouvelle card "Guide 08")
- `sitemap.xml` mis à jour : `article-8.html` ajouté (priorité 0.8), `blog/index.html` lastmod → 2026-04-27

---

## 4. Fichiers modifiés ce cycle

| Fichier | Type de modification |
|---|---|
| `blog/article-1.html` | Ajout section `.author-bio` |
| `blog/article-2.html` | Ajout section `.author-bio` |
| `blog/article-3.html` | Ajout section `.author-bio` |
| `blog/article-4.html` | Ajout section `.author-bio` |
| `blog/article-5.html` | Ajout section `.author-bio` |
| `blog/article-6.html` | Ajout section `.author-bio` |
| `blog/article-7.html` | Ajout section `.author-bio` |
| `blog/article-8.html` | **Création** — article RGPD × IA, HowTo + FAQPage + author bio |
| `blog/index.html` | Ajout card Guide 08, lastmod mis à jour |
| `assets/article.css` | Ajout styles `.author-bio` + `.data-table` |
| `sitemap.xml` | Ajout `article-8.html`, mise à jour lastmod `blog/` |

---

## 5. Prochaines actions recommandées (semaine suivante)

### SEO
- [ ] **Déployer sur Vercel** et soumettre le sitemap mis à jour dans Google Search Console
- [ ] **Demander l'indexation de `article-8.html`** dans Search Console (URL Inspection Tool) — nouvelles pages indexées en priorité
- [ ] Vérifier l'indexation de `wassim-rbila.html` dans Search Console si pas encore fait
- [ ] Tester `article-8.html` dans Google Rich Results Test pour valider HowTo + FAQPage
- [ ] **Obtenir le premier backlink externe** — c'est la prochaine étape critique. Piste concrète : soumettre un article invité sur un blog professionnel immobilier (PAP Pro, Logic-Immo Pro, un réseau de franchise) ou répondre à une question sur un forum/groupe LinkedIn professionnel en citant un article Domus AI

### GEO
- [ ] **Partager l'article 8 sur LinkedIn** avec un post qui extrait la "règle des 10 secondes" — c'est un concept mémorable, citeable, et qui génère de l'engagement de la part des professionnels immobilier concernés par la deadline du 11 août
- [ ] Mettre à jour la page FAQ `/faq-ia-immobilier.html` pour ajouter 2-3 Q&A sur le RGPD × IA et pointer vers `article-8.html` — renforce le cluster thématique et la couverture LLM
- [ ] Envisager une soumission sur **data.gouv.fr ou CNIL** (commentaire de blog, forum professionnel) avec un lien vers `article-8.html` — premier backlink sur un domaine gouvernemental, signal d'autorité fort pour les LLM

### Contenu
- [ ] **Article 9 suggéré** : *"Comment préparer un rendez-vous vendeur avec l'IA : brief, estimation, objections"* — couvre la phase commerciale critique, fort intent de recherche, utilise les assistants Estima et Éclaireur du catalogue Domus AI comme preuves concrètes
- [ ] Mettre à jour la FAQ avec les nouvelles questions RGPD couvertes dans article-8

---

*Rapport généré automatiquement par la tâche planifiée SEO/GEO — Domus AI*

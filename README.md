# Chatbot Duhallé

Le chatbot de **duhalle-boutique.fr** : un conseiller en ligne qui répond aux questions des clients sur les produits Duhallé et sur le savoir-faire du bouchage, de la mise en bouteille, du cidre, du vinaigre et des conserves maison.

- **Aucun appel à un modèle de langage.** Les réponses viennent uniquement d'une base de connaissances écrite en TypeScript. Chaque réponse se rejoue et s'explique.
- **Hébergé sur Cloudflare Workers.** La réponse est calculée sur place en quelques millisecondes, sans service externe.
- **Question-réponse uniquement.** Le chatbot n'a accès ni aux comptes clients ni aux commandes. Pour tout ce qui demande une action, il renvoie vers le site ou le service client.
- **Vouvoiement systématique**, ton de la marque, sans emoji. Un test le vérifie.
- **Sécurisé pour une boutique en ligne** : empreinte d'intégrité sur le script, limite de questions par visiteur, questions enregistrées anonymisées. Voir [Sécurité](#sécurité).

---

## Comment il répond

L'algorithme s'inspire de l'« assistant déterministe » d'APISAAS (`lib/assistant-deterministe`). On n'y trouve pas de fiches question-réponse entières, mais :

| Élément | Rôle | Où |
|---|---|---|
| **Concepts** | Une notion, un produit ou une rubrique, avec ses **alias** et sa **famille** (`bouchon-naturel` → `bouchon-liege` → `bouchon` → `bouchage` → `catalogue`) | `src/savoir/*.ts` |
| **Faits** | Un énoncé court rattaché à un ou plusieurs concepts, avec son **aspect** (définition, choix, procédure, durée, prix…), sa **source** et sa date de vérification | `src/savoir/*.ts` |
| **Types de question** | Ce que la question **demande**, lu dans sa forme : « comment » (procédure), « combien de temps » (durée), « lequel » (choix), « où acheter » (lieu)… Une table ordonnée : la première marque qui s'applique gagne | `src/moteur/types-de-question.ts` |
| **Plans de réponse** | Pour chaque type, les aspects cherchés dans l'ordre | `src/savoir/types.ts` |

Pour chaque question, le moteur procède ainsi :

1. Il reconnaît les **concepts cités**, malgré les pluriels, les accents et les fautes de frappe.
2. Il lit le **type** de la question.
3. Il prend les **faits** de ces concepts et de leurs familles. Un fait propre au produit l'emporte sur le fait général de sa famille. Un fait qui croise deux concepts cités (« bouchon » + « vin de garde ») passe devant.
4. Il assemble 1 à 3 faits selon le plan du type, avec des liens vers les pages du site et des questions suggérées.

Cas particuliers :
- **Relances** : « et combien de temps ? » ou « et pour le cidre ? » reprennent le sujet précédent.
- **Rien de sûr** : l'assistant ne devine pas, il propose des pistes ou renvoie vers le service client.
- **Trace** : chaque réponse porte une `trace` qui dit pourquoi (type lu, concepts, faits retenus).

Aujourd'hui : **184 concepts** et **327 faits**, répartis en 10 fichiers de rubriques : entreprise, commande (livraison, paiement, retours), mise en bouteille, bouchage, cire, cave et service du vin, cidre, vinaigre, conserves, droguerie.

### Mesure de la qualité

- **Banc** (`test/banc.test.ts`) : 177 questions formulées comme les clients les posent, avec la réponse attendue. Tout doit passer.
- **Jeu inédit** (`test/inedit.test.ts`) : 25 questions écrites **après** le réglage, qu'on ne règle jamais une par une. Il est mesuré à **68 %** de premières réponses idéales, et les écarts restent en général dans le bon sujet. Quand un jeu inédit a servi à corriger, il rejoint le banc et on en écrit un nouveau. Les trois premiers jeux, mesurés à 57 %, 57 % puis 77 %, ont fait progresser les règles.

---

## Structure du dépôt

```
src/
  index.ts              le Worker : /api/chat, /api/accueil, /api/sante, CORS
  moteur/               l'algorithme (aucun mot de métier)
    texte.ts            normalisation, mots vides, racinisation, fautes de frappe
    types-de-question.ts
    concepts.ts         détection des concepts, lignée
    reponse.ts          choix des faits selon le plan
    recherche.ts        filet de sécurité : recherche plein texte dans les faits
    assistant.ts        orchestration, politesse, relances, repli
  savoir/               LA BASE DE CONNAISSANCES
    coordonnees.ts      téléphone, e-mail, seuils de livraison (à un seul endroit)
    liens.ts            les URL du site
    entreprise.ts, commande.ts, mise-en-bouteille.ts, bouchage.ts, cire.ts,
    cave-service.ts, cidre.ts, vinaigre.ts, conserves.ts, droguerie.ts
  widget/widget.ts      le script affiché sur le site (bulle + fenêtre)
public/
  widget.js             le widget compilé (généré par npm run build, versionné)
  index.html            page de démonstration
oxatis/                 les codes à coller dans le back-office Oxatis
test/                   base, banc, jeu inédit, Worker, robustesse
```

---

## Mise en ligne sur Cloudflare

Le déploiement passe par **Workers Builds** : Cloudflare se branche sur ce dépôt GitHub et redéploie à chaque modification de `main`.

1. Dans le tableau de bord Cloudflare, allez dans **Workers & Pages**, puis **Create**, puis **Import a repository**.
2. Choisissez ce dépôt GitHub. Le nom du Worker dans Cloudflare doit être identique au champ `name` du fichier `wrangler.jsonc` : aujourd'hui **`chatbot-duhalle`**. Pour le renommer, changez les deux.
3. Gardez les réglages proposés : *Build command* vide, *Deploy command* `npx wrangler deploy`. Le widget compilé est déjà dans le dépôt.
4. Lancez le déploiement. L'adresse du Worker s'affiche : `https://chatbot-duhalle.<votre-sous-domaine>.workers.dev`.
5. Vérifiez : `https://chatbot-duhalle.<votre-sous-domaine>.workers.dev/` affiche la page de démonstration, et `/api/sante` renvoie `{"ok":true,…}`.

Aucune clé secrète n'est nécessaire. Le plan gratuit de Cloudflare Workers (100 000 requêtes par jour) suffit largement.

**Sites autorisés.** La variable `ALLOWED_ORIGINS` de `wrangler.jsonc` liste les sites qui peuvent interroger le chatbot : `https://www.duhalle-boutique.fr` et `https://duhalle-boutique.fr`. Pour tester depuis un autre domaine, par exemple l'aperçu Oxatis, ajoutez-le, séparé par une virgule. Évitez `*` en production : n'importe quel site pourrait alors afficher votre chatbot.

## Installation sur le site Oxatis

Deux codes sont prêts dans le dossier `oxatis/`.

### 1. Le script du chatbot, sur toutes les pages : `oxatis/1-script-chatbot.html`

1. Remplacez `VOTRE-SOUS-DOMAINE` par celui de l'adresse workers.dev.
2. Collez le code **une seule fois** dans le bloc HTML du `<head>` du site, **et dans celui du site mobile** si Oxatis en a un séparé.
3. Enregistrez, puis ouvrez le site : la bulle **« Une question ? »** apparaît en bas à droite, au-dessus de la pastille des cookies.

**Après chaque mise à jour du widget** (`public/widget.js`), l'empreinte `integrity` change : attendez la fin du déploiement Cloudflare, puis recopiez la balise du fichier `oxatis/1-script-chatbot.html` dans Oxatis (ordinateur et mobile). Tant que l'empreinte ne correspond pas, le navigateur refuse le script : la bulle disparaît, le reste du site n'est pas touché.

Après 6 secondes sur une page, une petite carte au-dessus de la bulle invite le client à poser sa question, avec un message et une question adaptés à la page (cidre, cire, bouchons, conserves…, voir `src/widget/invitations.ts`). Elle apparaît sur deux pages au plus par visite, jamais au panier ni pendant la commande, et plus du tout une fois fermée ou le conseiller ouvert ; une pastille « 1 » reste ensuite sur la bulle.

Le visuel (bulle, fenêtre, vert et ocre Duhallé) est dessiné par le script lui-même, isolé du thème : il ne déforme pas le site et le site ne le déforme pas. Sur mobile, la discussion s'ouvre en plein écran. Réglages facultatifs, en attributs de la balise : `data-titre`, `data-couleur`, `data-position` (`droite` ou `gauche`), `data-decalage` (distance au bas de l'écran en pixels, 84 par défaut), `data-telephone`.

### 2. L'encart « Une question ? », dans une page : `oxatis/2-bloc-bouton-conseiller.html`

Un bloc de design à coller dans un élément « Code HTML » d'une page (contact, FAQ, conseils…). Son bouton ouvre le chatbot et ses questions cliquables le lancent directement. Si le script du chatbot n'est pas chargé, les liens mènent à la page Contact.

> Conseil : testez d'abord sur une page brouillon. Si votre offre Oxatis filtre les balises `<script>`, contactez le support Oxatis pour savoir où les scripts sont autorisés.

---

## Enrichir la base

Tout se passe dans `src/savoir/`. Un ajout sur GitHub, dans `main`, est redéployé automatiquement.

**Ajouter un fait à un concept existant**, dans le fichier de la rubrique :

```ts
r.fait("bouchon-naturel", "duree", `
  Un bouchon en liège naturel de 45 mm est fait pour les vins de longue garde.`);
```

**Ajouter un concept** avec ses alias (pluriels, accents et majuscules sont gérés tout seuls) :

```ts
r.concept("muselet", "Muselets", ["muselet", "muselets", "agrafe de bouchon"], {
  famille: "bouchage",
  lien: page("/muselets-c102x…", "Muselets"),
});
```

**Un fait qui croise deux concepts** ne sort que si les deux sont cités :

```ts
r.fait(["bouchon", "vin-de-garde"], "choix", `Pour un vin de garde, …`);
```

Les aspects possibles sont : `definition`, `usage`, `gamme`, `choix`, `dimension`, `procedure`, `duree`, `moment`, `condition`, `raison`, `erreur`, `entretien`, `lieu`, `prix`.

Règles de la maison :
- **Vouvoiement, pas d'emoji, jamais de mention de Lafitte.** Les tests le vérifient.
- **Pas d'alias qui désigne deux concepts** : un test le signale.
- Évitez les alias faits d'un mot trop général (« produit », « vin », « temps ») et les alias qui contiennent le nom d'un autre concept.
- Après une modification, lancez `npm test`. Si une question du banc change de réponse, vérifiez que la nouvelle est meilleure avant de mettre le banc à jour.

**Les questions posées** sont enregistrées, anonymisées, dans la base D1 `chatbot-duhalle` (table `questions_chatbot`, décrite dans `schema/questions_chatbot.sql`) : une ligne par question, avec son nombre d'occurrences et la nature de la dernière réponse. C'est la meilleure source pour savoir quels alias et quels faits ajouter. Les plus fréquentes restées sans réponse :

```sql
SELECT question, occurrences, dernier_jour FROM questions_chatbot
WHERE statut = 'a_revoir' AND nature_derniere IN ('inconnu', 'recherche')
ORDER BY occurrences DESC LIMIT 50;
```

Après tri, passez le `statut` à `retenue`, `integree` ou `ignoree`. Chaque nuit, une tâche planifiée du Worker supprime les questions `a_revoir` ou `ignoree` vues pour la dernière fois il y a plus de 90 jours.

## Sécurité

Le chatbot ajoute un script à une boutique en ligne : c'est le point à protéger. Ce qui est en place :

| Risque | Protection |
|---|---|
| Un `widget.js` modifié (compte GitHub ou Cloudflare piraté) qui lirait les pages de la boutique | **Empreinte d'intégrité (SRI)** sur la balise : le navigateur refuse tout fichier qui n'est pas exactement celui publié. `npm run build` la recalcule et la reporte dans `oxatis/1-script-chatbot.html` ; la CI vérifie qu'elle est à jour. |
| Injection de code dans la fenêtre de discussion | Aucun texte reçu (réponse, stockage) n'est inséré comme HTML : tout passe par `textContent`. Les liens ne mènent qu'à `duhalle-boutique.fr` en `https`. Les réponses et la conversation gardée en `sessionStorage` sont vérifiées avant affichage. |
| Robot qui inonde l'API (quota, coûts) | **30 appels par minute et par adresse IP** (binding `ratelimits` de Cloudflare), puis réponse 429 et message « merci de patienter ». |
| Message énorme ou piégé | Corps limité à 4 000 octets, lu en flux et coupé au-delà ; question lue sur 40 mots au plus ; correcteur de fautes indexé : un message piégé coûte moins de 5 ms de calcul (plus de 50 ms avant). Testé dans `test/robustesse.test.ts`. |
| Autre site qui utiliserait le chatbot | CORS : seuls les sites de `ALLOWED_ORIGINS` sont acceptés (403 sinon). |
| Données personnelles | Le chatbot ne demande rien. Les questions sont enregistrées **anonymisées** (e-mails, numéros, références de commande, adresses, noms, liens masqués — `src/questions.ts`), et le client en est informé sous la zone de saisie. Les questions non retenues sont effacées après 90 jours. La conversation reste dans l'onglet du client et disparaît à sa fermeture. Pensez à le mentionner dans la politique de confidentialité du site. |
| Fuite d'erreurs techniques | Toute erreur renvoie un message générique ; le détail reste dans les journaux Cloudflare. |
| En-têtes HTTP | API : `nosniff`, `Content-Security-Policy: default-src 'none'`, `no-store`. Fichiers statiques (`public/_headers`) : CSP stricte, `X-Frame-Options: DENY`, `noindex`. |

À faire de votre côté : activer la **double authentification** sur les comptes GitHub et Cloudflare, et protéger la branche `main` (relecture obligatoire avant fusion).

## Informations à faire valider avant la mise en ligne

Le site n'était pas accessible depuis l'environnement de développement. Les informations commerciales viennent donc d'extraits indexés du site et sont à confirmer. Elles sont centralisées dans `src/savoir/coordonnees.ts` et `src/savoir/commande.ts` :

- **Téléphone** `02 47 53 00 26` et **e-mail** `contact@duhalle-boutique.fr`. Un autre numéro (05 62 11 73 09) apparaît sur d'anciennes pages et dans des annuaires.
- **Livraison offerte** en France continentale dès **69 €** avec DPD (un extrait indiquait 59 €), **79 €** avec Colissimo et **150 €** avec Geodis. Corse et DOM-TOM : sur devis.
- **Paiement** : carte bancaire, PayPal, virement et 4 fois sans frais.
- Les **horaires** du service client ne sont pas donnés par le chatbot, car trois versions contradictoires circulent : il renvoie à la page Contact.
- Les **URL** des pages et des produits (`src/savoir/liens.ts`), relevées le 24/09/2026.
- Les **caractéristiques produits** (formats de bouchons, catégories, contenances…), reprises des titres et descriptions indexés.

Les faits de **savoir-faire général** (étapes de la mise en bouteille, du cidre, du vinaigre, conserves…) portent la source « Savoir-faire général ». Ils méritent une relecture par l'équipe Duhallé.

---

## Développement

```bash
npm install
npm test            # base, banc de questions, jeu inédit, Worker, robustesse
npm run typecheck   # types du Worker et du widget
npm run build       # recompile public/widget.js et son empreinte (à commiter)
npm run dev         # Worker en local sur http://localhost:8787 (page de démonstration)
```

API :

```http
POST /api/chat        {"message": "Quel bouchon pour un vin de garde ?", "contexte": {…}}
GET  /api/accueil     message d'accueil et questions de départ
GET  /api/sante       {"ok": true, "concepts": 184, "faits": 327}
```

La réponse de `/api/chat` contient `texte` (gras, listes, paragraphes), `liens`, `suggestions`, `contexte` (à renvoyer avec la question suivante pour les relances) et `trace`.

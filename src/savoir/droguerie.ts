// La droguerie : quelques produits utiles à la maison et au jardin.
import { EMAIL, TELEPHONE } from "./coordonnees";
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.droguerie.url);
export const droguerie = r;

r.concept("droguerie", "Droguerie", ["droguerie", "produits de droguerie"], { famille: "catalogue", lien: PAGES.droguerie });

r.fait("droguerie", "gamme", `
  La rubrique **Droguerie** propose : de l'**huile de cade** (1 L) pour protéger les bois en contact avec le sol, de l'**huile de paraffine** (1 L) pour la cosmétique, la pharmacie ou la lubrification des machines, et du **carbure de calcium** (5 kg), qui produit de l'acétylène.`, { liens: [PAGES.huileCade, PAGES.huileParaffine, PAGES.carbure] });

r.concept("huile-cade", "Huile de cade", ["huile de cade", "cade", "proteger le bois", "bois au sol"], { famille: "droguerie", lien: PAGES.huileCade });

r.fait("huile-cade", "usage", `
  L'**huile de cade** (bidon de 1 L) protège les **bois en contact avec le sol**.`, { liens: [PAGES.huileCade] });

r.concept("huile-paraffine", "Huile de paraffine", ["huile de paraffine", "paraffine", "lubrifier", "lubrification", "huile minerale", "parafine", "parafinne", "parrafine", "parrafinne"], { famille: "droguerie", lien: PAGES.huileParaffine });

/**
 * Fiche relevée le 12/10/2026 : « qualité pharma », « Codex alimentaire », lubrification de machines et de pièces en
 * contact alimentaire, cosmétiques, produits pharmaceutiques ; ni produits nasaux, oraux ou pour les lèvres, ni ingestion.
 * Les clients demandent aussi l'isolation du vin en cuve, une lampe, une pompe immergée, un laxatif : la fiche ne prévoit
 * aucun de ces usages, la réponse le dit et renvoie vers les bonnes personnes.
 */
const HUILE_DE_PARAFFINE = `
  L'**huile de paraffine** Duhallé (bidons de 1 L et de 5 L) est une huile minérale incolore et inodore, de qualité pharmaceutique et « Codex » alimentaire d'après sa fiche. Elle sert à **lubrifier des machines** (y compris des pièces en contact alimentaire) et à **fabriquer des cosmétiques ou des produits pharmaceutiques**.

  Elle n'est pas destinée à être ingérée ni utilisée dans des produits nasaux, oraux ou pour les lèvres, et ce n'est pas un médicament : pour tout usage médical, demandez l'avis d'un médecin ou d'un pharmacien. Je ne peux pas confirmer d'autres usages (isolation d'un vin dans une cuve, lampe, compatibilité avec une pompe précise) : vérifiez avec la notice du matériel ou contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`;

for (const aspect of ["usage", "definition", "condition", "choix", "raison", "dimension"] as const) {
  r.fait("huile-paraffine", aspect, HUILE_DE_PARAFFINE, { liens: [PAGES.huileParaffine, PAGES.contact] });
}

r.concept("planche-bois", "Planches à découper et ustensiles en bois", ["planche a decouper", "planches a decouper", "planche en bois", "planches en bois", "planche de bois", "planche de cuisine", "planches de cuisine", "billot", "billots", "ustensiles en bois", "plan de travail en bois", "cuilleres en bois", "saladier en bois"], {
  famille: "droguerie",
});

// « L'huile de paraffine Codex peut-elle servir sur des planches à découper en bois ? » : la fiche ne cite pas cet usage ;
// l'huile minérale de qualité alimentaire est l'entretien courant des planches (savoir-faire général, à faire valider).
const HUILE_ET_PLANCHES = `
  La fiche de l'huile de paraffine Duhallé ne cite pas cet usage, mais c'est une huile minérale de qualité **alimentaire** (« Codex »), et ce type d'huile est couramment employé pour **nourrir les planches à découper en bois** : appliquez-en une fine couche sur une planche propre et sèche, laissez pénétrer plusieurs heures, puis essuyez l'excédent. Pour une confirmation de l'équipe, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`;

for (const aspect of ["usage", "condition", "choix", "raison", "procedure", "entretien", "definition"] as const) {
  r.fait(["huile-paraffine", "planche-bois"], aspect, HUILE_ET_PLANCHES, { source: SAVOIR_FAIRE, liens: [PAGES.huileParaffine, PAGES.contact] });
}

r.concept("carbure", "Carbure de calcium", ["carbure", "carbure de calcium", "acetylene", "lampe a carbure", "soudage"], { famille: "droguerie", lien: PAGES.carbure });

r.fait("carbure", "usage", `
  Le **carbure de calcium** (5 kg) produit de l'**acétylène** au contact de l'eau, utilisé notamment pour le soudage.`, { liens: [PAGES.carbure] });

r.fait("carbure", "condition", `
  Le carbure de calcium se conserve **au sec**, dans son contenant bien fermé : au contact de l'humidité, il dégage un gaz **inflammable**. Manipulez-le à l'écart de toute flamme et hors de portée des enfants.`, { source: SAVOIR_FAIRE });

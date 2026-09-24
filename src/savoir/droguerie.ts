// La droguerie : quelques produits utiles à la maison et au jardin.
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

r.concept("huile-paraffine", "Huile de paraffine", ["huile de paraffine", "paraffine", "lubrifier", "lubrification", "huile minerale"], { famille: "droguerie", lien: PAGES.huileParaffine });

r.fait("huile-paraffine", "usage", `
  L'**huile de paraffine** (1 L) s'utilise pour des préparations cosmétiques et pharmaceutiques, ou pour **lubrifier les machines**.`, { liens: [PAGES.huileParaffine] });

r.concept("carbure", "Carbure de calcium", ["carbure", "carbure de calcium", "acetylene", "lampe a carbure", "soudage"], { famille: "droguerie", lien: PAGES.carbure });

r.fait("carbure", "usage", `
  Le **carbure de calcium** (5 kg) produit de l'**acétylène** au contact de l'eau, utilisé notamment pour le soudage.`, { liens: [PAGES.carbure] });

r.fait("carbure", "condition", `
  Le carbure de calcium se conserve **au sec**, dans son contenant bien fermé : au contact de l'humidité, il dégage un gaz **inflammable**. Manipulez-le à l'écart de toute flamme et hors de portée des enfants.`, { source: SAVOIR_FAIRE });

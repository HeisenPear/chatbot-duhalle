// LA TOURNÉE DU 19 OCTOBRE : ce que les questions du 12 au 18 octobre ont montré.
// Une erreur de fond (le vinaigrier noir existe), des clients qui collent un lien à la place d'un nom,
// des reproches faits au chatbot, et des produits que la base ne décrivait pas (mortier, Emile Henry,
// capsules à sertir, bouteilles alsaciennes…).
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { EMAIL, REGLAGES, TELEPHONE } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

const dit = (question: string, ...motifs: RegExp[]) => {
  const reponse = assistant.repondre(question);
  expect(reponse.nature, question).toBe("reponse");
  for (const motif of motifs) expect(reponse.texte, question).toMatch(motif);
  return reponse;
};

describe("les vinaigriers", () => {
  it("le vinaigrier noir existe : la base ne dit plus le contraire", () => {
    expect(JSON.stringify(BASE)).not.toMatch(/pas de mod[eè]le noir/i);
    for (const question of ["Est ce que ce vinaigrier existe en noir", "Y a-t-il un vinaigrier noir ?", "existe-t-il un vinaigrier noir ?"]) {
      dit(question, /noir mat/, /Emile Henry/);
    }
  });

  it("présente les vinaigriers Emile Henry comme de la céramique émaillée, pas du grès du Portugal", () => {
    dit("vinaigrier Emile Henry", /céramique émaillée/, /2,5 L/, /coupelle/);
    dit("vinaigrier E. Henry bleu calanque", /bleu calanque/);
  });

  it("annonce que le grès du vinaigrier est étanche et que la fuite vient du robinet ou du bouchon", () => {
    for (const question of ["Étanchéité du vinaigrier", "mon vinaigrier fuit", "le vinaigrier suinte"]) dit(question, /robinet en bois/, /24 heures/);
    // « le robinet fuit » reste une question sur le robinet.
    expect(assistant.repondre("mon robinet de vinaigrier fuit").trace.faits[0]).toBe("robinet-vinaigrier.condition");
  });

  it("explique comment faire sa mère de vinaigre", () => {
    for (const question of ["Et comment faire une mère", "À partir d’un fond de vin peut-on créer une mère", "comment créer une mère de vinaigre", "puis-je fabriquer ma mère de vinaigre ?"]) {
      dit(question, /vinaigre de vin non pasteurisé/, /toile fine/);
    }
  });

  it("répond sur le mortier sans inventer sa contenance, et sans parler de vinaigrier", () => {
    for (const question of ["Mortier grès emaille", "Mortier pas vinaigriers", "Quelle est la contenance du Mortier en Grès Émaillé", "pilon en bois"]) {
      const reponse = dit(question, /mortier en grès émaillé avec son pilon/, /n'est pas dans ma base/);
      expect(reponse.texte, question).not.toMatch(/Les vinaigriers Duhallé sont en/);
    }
  });
});

describe("les capsules et les capsuleuses", () => {
  it("annonce 40 cm de hauteur maximale de bouteille (donnée de l'équipe, 20/10/2026)", () => {
    for (const question of ["Bonjour, qu'elle est la hauteur maximale des bouteille que peux recevoir la capsuleuse ?", "hauteur maximale de bouteille pour la capsuleuse super pro"]) {
      dit(question, /jusqu'à \*\*40 cm de haut\*\*/, /se règle/);
    }
  });

  it("distingue les capsules couronne, serties à la capsuleuse, et le surbouchage, posé à la chaleur", () => {
    for (const question of [
      "J ai du vin rouge avec des capsules en aluminium je cherche une machine manuelle pour les sertir",
      "Non j ai des capsules a sertir",
      "sertisseuse pour capsules aluminium",
    ]) {
      dit(question, /capsules couronne/, /thermorétractable/, /Vik Capper/);
    }
  });
});

describe("les produits qui n'existent pas ou dont la base ne sait pas tout", () => {
  it("n'a pas de bouteille alsacienne", () => {
    for (const question of ["Des bouteilles alsaciennes", "flûte d'Alsace"]) dit(question, /pas trace de \*\*bouteilles alsaciennes/, /bordelaises/);
  });

  it("dit où les produits sont fabriqués quand la base le sait, sinon renvoie vers la fiche", () => {
    for (const question of ["d'où viennent vos bouchons ?", "made in france ?"]) dit(question, /Portugal/, /Italie/, /fiche de chaque produit/);
  });

  it("dit que les pressoirs en bois viennent d'Italie (donnée de l'équipe, 20/10/2026)", () => {
    for (const question of ["ou sont fabriqués ces pressoirs?", "où est fabriqué le pressoir en bois ?", "d'où vient le pressoir 20 L ?"]) {
      dit(question, /pressoirs en bois.*Italie/);
    }
  });

  it("répond à un bouchon percé pour un verseur sans inventer le diamètre du trou", () => {
    dit(
      "je cherche un liège percé d'un trou pour un bouchon verseur pour bouteille de vin. Diamètre du trou de mon verseur est de 11mm extérieur",
      /bouchons en liège percés/,
      /pas le diamètre du trou/,
    );
  });

  it("conseille un bouchon à tête pour une eau-de-vie, une liqueur ou un rhum", () => {
    for (const question of ["Quelle bouchon choisir pour une eau de vie", "quel bouchon pour une liqueur", "quel bouchon pour du rhum"]) dit(question, /bouchon à tête/);
  });

  it("dit que l'huile de paraffine alimentaire sert aux planches en bois, tout en précisant que la fiche ne le cite pas", () => {
    for (const question of ["Bonjour l'huile paraffine codex peut elle être utilisée sur des planches a decouper en bois ? Merci", "peut-on utiliser l'huile de paraffine pour entretenir une planche en bois"]) {
      dit(question, /ne cite pas cet usage/, /alimentaire/);
    }
  });

  it("dit que les filtres papier sont à usage unique", () => {
    for (const question of ["Est ce que les filtres pour vin sont lavables ?", "les filtres sont-ils réutilisables ?"]) dit(question, /usage unique/);
    // Sans le mot « lavable », la question sur la filtration garde sa réponse.
    expect(assistant.repondre("faut il filtrer son vin avant de le mettre en bouteille").texte).not.toMatch(/usage unique/);
  });

  it("explique le niveau automatique sans le prendre pour un paiement", () => {
    for (const question of ["Est ce le niveau se fait tout seul", "le niveau se règle tout seul ?"]) {
      const reponse = dit(question, /arrêt automatique/);
      expect(reponse.texte, question).not.toMatch(/carte bancaire/);
    }
  });

  it("répond à la compatibilité d'une grille avec un hachoir d'une autre marque sans la garantir", () => {
    dit("bonjour est ce compatible avec hachoir PORKERT 10 ?", /Porkert/, /n'est pas garantie/);
  });

  it("répond à un goulot de 18 cm par la limite des bondes : 12 cm", () => {
    dit("Ma bouteille a un goulot de 18 cm de large. Quel bouchon choisir ?", /12 cm au maximum/);
  });
});

describe("la commande, la livraison et le retrait", () => {
  it("annonce 2 à 5 jours ouvrés à qui se demande quand il sera livré, et aussi pour une commande en attente", () => {
    for (const question of [
      "en commandant aujourdhui je recois ma commande quand exactement ?",
      "si je commande ce soir, quand serai-je livré ?",
      "quand ma commande sera t elle expédiée",
    ]) {
      dit(question, /2 à 5 jours ouvrés/);
    }
  });

  it("explique pourquoi la livraison est payante même vers 70 euros", () => {
    for (const question of ["pk je dois payer les frais de livraison", "il me fait payer la livraison alors quz ca fait 70 euros et que je passe avec dpd"]) {
      dit(question, /69 €/, /lourds et volumineux/);
    }
  });

  it("répond à qui ne peut pas choisir sa livraison, ou ne peut pas commander", () => {
    dit("Dommage car votre site ne permet pas le choix de la livraison !!!", /transporteurs proposés dépendent/);
    for (const question of ["Comment commander , vous bloquez", "Impossible de choisir sur le site !!!!", "je ne peux pas valider ma commande"]) {
      dit(question, /service client/, /capture d'écran/);
    }
  });

  it("renvoie vers un devis pour un prix au lot ou pour 150 bouteilles", () => {
    for (const question of ["est ce qu'il y a un prix au lot pour ces casiers ?", "bonjour quel prix pour 150 bouteilles de vin ?", "quel prix pour 36 bouteilles", "tarif au lot"]) {
      dit(question, /devis/);
    }
  });

  it("répond aux prix professionnels sans inventer de grille", () => {
    dit("les prix indiqués sont ils des prix pro?", /tarifs professionnels\*\* sont à l'étude/, /rien n'est encore en place/);
  });

  it("renvoie vers le service client pour définir un retrait sur place", () => {
    for (const question of [
      "Je suis près de Toulouse. Est-il possible de retirer un bidon d’huile de paraffine 1 L directement à votre site ? Et pouvez-vous me donner le numéro de ce site ?",
      "retrait sur place possible ?",
      "puis-je venir chercher ma commande ?",
    ]) {
      dit(question, /définira avec vous les possibilités/, new RegExp(TELEPHONE));
    }
  });
});

describe("les reproches faits au chatbot", () => {
  it("s'excuse et offre l'équipe, sans proposer de produit", () => {
    for (const message of ["Vous n avez pas compris la question", "je vais chercher un autre foirnisseur", "je vais chercher un autre fournisseur", "vous ne comprenez rien", "j'achète ailleurs"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("politesse");
      expect(reponse.texte, message).toMatch(/désolé/);
      expect(reponse.texte, message).toContain(TELEPHONE);
      expect(reponse.texte, message).toContain(EMAIL);
      expect(reponse.suggestions, message).toEqual([]);
    }
  });

  it("ne prend pas pour un reproche une vraie question avec les mêmes mots", () => {
    expect(assistant.repondre("comment comprendre le réglage de la boucheuse ?").nature).toBe("reponse");
    expect(assistant.repondre("avez-vous un autre fournisseur de cire ?").nature).not.toBe("politesse");
  });
});

describe("les liens collés dans un message", () => {
  const BOUTIQUE = "https://www.duhalle-boutique.fr";

  it("lit le nom du produit dans l'adresse d'un produit de la boutique", () => {
    expect(assistant.repondre(`je recherche ${BOUTIQUE}/mustimetre-c2x35079023`).trace.concepts).toContain("mustimetre");
    expect(assistant.repondre(`${BOUTIQUE}/boucheuse-2-leviers-c2x35078790`).trace.concepts).toContain("boucheuse-2-leviers");
    expect(assistant.repondre(`duhalle-boutique.fr/pressoir-cage-bois-20-l-c2x35078717 quel prix pour 150 ?`).trace.concepts).toContain("pressoir");
  });

  it("ignore la requête et l'ancre d'une adresse de la boutique", () => {
    const reponse = assistant.repondre(`quelle est la contenance ${BOUTIQUE}/mortier-pilon-bois-c2x35079047?utm_source=x#avis`);
    expect(reponse.trace.concepts).toContain("mortier");
  });

  it("dit qu'il ne peut pas ouvrir un lien vers un autre site, et demande le nom du produit", () => {
    for (const message of ["je recherche https://www.exemple.com/produit/123", "voici le lien www.exemple.com/x", "https://exemple.com"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("inconnu");
      expect(reponse.texte, message).toMatch(/ne peux pas ouvrir les liens/);
      expect(reponse.suggestions.length, message).toBeGreaterThan(0);
    }
  });

  it("résiste aux adresses mal formées ou démesurées", () => {
    for (const message of [
      `${BOUTIQUE}/%E0%A4%A`,
      `${BOUTIQUE}/${"a-".repeat(200)}c2x1`,
      `javascript:alert(1) ${BOUTIQUE}/`,
      `http://${"x.".repeat(200)}com/${"y".repeat(300)}`,
    ]) {
      expect(() => assistant.repondre(message.slice(0, 500)), message).not.toThrow();
    }
  });
});

describe("les numéros de commande seuls", () => {
  it("N° suivi d'un numéro est une demande de suivi", () => {
    expect(assistant.repondre("N°1234567").trace.faits[0]).toBe("suivi-commande.procedure");
  });
});

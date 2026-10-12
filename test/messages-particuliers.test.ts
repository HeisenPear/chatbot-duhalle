// LES MESSAGES QUI NE SONT PAS (OU PAS SEULEMENT) UNE QUESTION SUR UN PRODUIT.
//
// Relevés dans la base D1 (2 au 12 octobre 2026) : un « e » tapé 29 fois, des
// questions en anglais posées 42 fois, des injures, des numéros de commande
// seuls, des questions courtes qui renvoient à la réponse précédente.
// Ces cas ne se règlent pas phrase par phrase : on vérifie la règle, puis les
// cas voisins qui ne doivent PAS être pris pour elle.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { EMAIL, REGLAGES, TELEPHONE } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

describe("une lettre isolée n'est pas un mot", () => {
  it("n'invente aucune réponse à un « e » ou un « u » seul", () => {
    for (const message of ["e", "u", "E", "e e", "x y z"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("inconnu");
      expect(reponse.trace.faits, message).toEqual([]);
      expect(reponse.texte, message).toMatch(/en quelques mots/);
      expect(reponse.suggestions.length, message).toBeGreaterThan(0);
    }
  });

  it("garde une salutation suivie d'une lettre égarée pour une salutation", () => {
    expect(assistant.repondre("Bonjour, U").nature).toBe("accueil");
    expect(assistant.repondre("bonsoir e").nature).toBe("accueil");
  });

  it("ne touche pas aux nombres ni aux formats", () => {
    expect(assistant.repondre("45x24").trace.concepts.length).toBeGreaterThan(0);
  });
});

describe("un client mécontent reçoit des excuses et l'équipe, pas la procédure pour commander", () => {
  const MECONTENTS = [
    "tu nesers à rien",
    "vous êtes nuls",
    "vous ne connaissez pas les produits que vous vendez ?",
    "je m'en branle de la dame jeanne, ça n'a rien à voir avec ma question",
    "ok, va te faire enculer, je vais acheter ailleurs",
    "n'importe quoi",
    "c'est hors sujet",
  ];

  it("s'excuse, donne le téléphone et l'e-mail, et ne propose pas de questions", () => {
    for (const message of MECONTENTS) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("politesse");
      expect(reponse.texte, message).toMatch(/désolé/);
      expect(reponse.texte, message).toContain(TELEPHONE);
      expect(reponse.texte, message).toContain(EMAIL);
      expect(reponse.texte, message).not.toMatch(/commander sur la boutique/i);
      expect(reponse.suggestions, message).toEqual([]);
      expect(reponse.liens.length, message).toBeGreaterThan(0);
    }
  });

  it("ne confond pas un débutant avec un mécontent", () => {
    for (const message of [
      "je ne sais rien faire en vinification, par où commencer ?",
      "je ne connais rien au cidre, comment débuter ?",
      "je ne comprends rien à la mise en bouteille",
      "à quoi ça sert un barboteur ?",
    ]) {
      expect(assistant.repondre(message).nature, message).not.toBe("politesse");
    }
  });
});

describe("l'anglais", () => {
  it("répond dans les deux langues à une question sans sujet reconnu", () => {
    for (const message of ["can I ask you a question please?", "do you ship to Belgium?", "what is the price of a cork?", "how do I order?", "Anglaise", "do you speak English ?"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("politesse");
      expect(reponse.texte, message).toMatch(/Je ne réponds qu'en français/);
      expect(reponse.texte, message).toMatch(/I can only answer in French/);
      expect(reponse.texte, message).toContain(EMAIL);
    }
  });

  it("répond à « upload an image » sur le fond : les images ne passent pas par le chat", () => {
    for (const message of ["is it ok if I upload an image?", "can I send you a picture ?", "may I attach a file"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.nature, message).toBe("reponse");
      expect(reponse.texte, message).toMatch(/cannot receive images/);
      expect(reponse.texte, message).toContain(EMAIL);
    }
  });

  it("répond à la même question en français", () => {
    for (const message of ["puis-je vous envoyer une photo ?", "Comment joindre une image à ma demande ?"]) {
      const reponse = assistant.repondre(message);
      expect(reponse.trace.faits[0], message).toMatch(/^envoi-photo\./);
      expect(reponse.texte, message).toMatch(/photos par e-mail/);
      // Une photo de colis abîmé ne ramène pas la livraison : le concept répond seul.
      expect(reponse.trace.faits, message).toHaveLength(1);
    }
  });

  it("ne prend pas une phrase française pour de l'anglais", () => {
    for (const message of ["Quel est le prix du wine cooler ?", "bouchon pour mon vin de noix", "photo image"]) {
      expect(assistant.repondre(message).texte, message).not.toMatch(/I can only answer in French/);
    }
  });
});

describe("les numéros de commande", () => {
  it("lit « commande 1234567 » comme « commande [référence] », la forme enregistrée", () => {
    const brut = assistant.repondre("commande 1234567");
    const masque = assistant.repondre("commande [référence]");
    expect(brut.trace.faits).toEqual(masque.trace.faits);
    expect(brut.trace.faits[0]).toBe("suivi-commande.procedure");
    expect(assistant.repondre("où en est ma commande n° 987654 ?").trace.faits[0]).toBe("suivi-commande.procedure");
  });

  it("ne confond pas un format de bouchon avec un numéro", () => {
    expect(assistant.repondre("bouchon 45 x 24").trace.faits[0]).not.toBe("suivi-commande.procedure");
  });
});

describe("les questions courtes qui renvoient à la réponse précédente", () => {
  it("garde le sujet de la réponse précédente quand un pronom le désigne", () => {
    const avant = assistant.repondre("comment préparer le bouchon du vinaigrier");
    const suite = assistant.repondre("faut-il le tremper ?", avant.contexte);
    expect(suite.trace.relance).toBe(true);
    expect(suite.trace.concepts).toContain("bouchon-vinaigrier");
    expect(suite.trace.faits[0]).toBe("bouchon-vinaigrier.condition");
    expect(suite.texte).toMatch(/24 heures/);
  });

  it("comprend la même suite écrite avec une faute", () => {
    const avant = assistant.repondre("comment préparer le bouchon du vinaigrier");
    const suite = assistant.repondre("faut-i le tremper ?", avant.contexte);
    expect(suite.trace.relance).toBe(true);
    expect(suite.texte).toMatch(/24 heures/);
  });

  it("ne rattache pas à la réponse précédente une question qui a son propre sujet", () => {
    const avant = assistant.repondre("dimensions du casier 90 bouteilles");
    const suivante = assistant.repondre("Est-il possible d'avoir un devis ?", avant.contexte);
    expect(suivante.trace.relance).toBe(false);
    expect(suivante.trace.faits[0]).toBe("devis.condition");
  });

  it("ne rattache pas une question courte sans pronom", () => {
    const avant = assistant.repondre("dimensions du casier 90 bouteilles");
    const suivante = assistant.repondre("pressoir", avant.contexte);
    expect(suivante.trace.relance).toBe(false);
    expect(suivante.trace.concepts).toContain("pressoir");
  });
});

describe("un concept exclusif répond seul", () => {
  it("la disponibilité ne rappelle pas le mode d'emploi du produit", () => {
    for (const message of [
      "quand seront de nouveau commercialisées les mèches soufrées sur coton 7 trempages ?",
      "Quand aurez vous l'hygromère thermometre ?",
      "quand les casiers 144 seront-ils de retour en stock ?",
    ]) {
      const reponse = assistant.repondre(message);
      expect(reponse.trace.faits, message).toEqual(["disponibilite.condition"]);
    }
  });

  it("laisse parler le produit quand la question demande autre chose que le stock", () => {
    expect(assistant.repondre("avez-vous des bouchons en stock ?").trace.faits[0]).toBe("bouchon.gamme");
  });

  it("la recharge Larroseptol répond à « puis-je en acheter », pas la procédure pour commander", () => {
    const reponse = assistant.repondre("puis-je acheter du Larrosseptol");
    expect(reponse.trace.faits).toEqual(["bonde-aseptique.condition"]);
    expect(reponse.texte).toMatch(/Duhallé vend la \*\*recharge LARROSEPTOL\*\*/);
  });
});

describe("ce que disent les fiches relevées le 12/10/2026", () => {
  const dit = (question: string, motif: RegExp) => {
    const reponse = assistant.repondre(question);
    expect(reponse.nature, question).toBe("reponse");
    expect(reponse.texte, question).toMatch(motif);
  };

  it("donne l'échelle du mustimètre, la hauteur de l'éprouvette et la longueur de la cuillère fournies par l'équipe", () => {
    dit("quelle est l'échelle du mustimètre ?", /0,98 à 1,30/);
    dit("Quelle est la graduation d’un mustimètre", /0,98 à 1,30/);
    dit("quel est la hauteur de l'éprouvette graduée 250Ml", /29 cm de hauteur/);
    dit("Quelle est la longueur de la cuillère avec crochet ?", /19 cm\*\* de long/);
    dit("Quelle est la longueur de la cuillère pour pot à confiture ?", /19 cm\*\* de long/);
  });

  it("ne conseille pas l'huile de paraffine pour un usage que sa fiche ne prévoit pas", () => {
    for (const question of [
      "L huile de parrafinne est elle pour la constipation chez l homme",
      "huile de paraffine pour lampe fontaine",
      "huile de paraffine pour protéger le vin dans une cuve",
      "peut-on boire de l'huile de paraffine",
    ]) {
      dit(question, /n'est pas destinée à être ingérée/);
      dit(question, /Je ne peux pas confirmer d'autres usages/);
    }
    dit("L huile de parrafinne est elle pour la constipation chez l homme", /médecin ou d'un pharmacien/);
  });

  it("donne les cols des dames-jeannes et les bondes qui leur vont", () => {
    dit("Quel bonde en liège dois je prendre pour dame Jane 20l", /3,9 cm/);
    dit("quel bouchon pour une dame-jeanne de 2 litres ?", /col à vis de 22 mm/);
    dit("Bouchon pour dame Jeanne grande ouverture", /11,7 cm/);
  });

  it("limite les bondes à 12 cm", () => {
    dit("je cherche bouchon conique de 13 cm", /12 cm au maximum/);
    dit("bouchon de 15 cm", /12 cm au maximum/);
  });

  it("dit que les bouchons mécaniques ne supportent ni stérilisation ni pasteurisation", () => {
    dit("Bonjour, es ce que les rondelles polyéthylène supportent la stérilisation", /ni à la stérilisation ni à la pasteurisation/);
    dit("capsule couronne pasteurisation", /\*\*pasteurisation\*\* comme à la \*\*stérilisation\*\*/);
  });

  it("dit de tremper le bouchon du vinaigrier, et pas les bouchons de bouteille", () => {
    dit("faut-il tremper le bouchon du vinaigrier ?", /24 heures dans l'eau/);
    dit("Faut-il tremper les bouchons avant de boucher ?", /à sec/);
  });

  it("dit qu'un vinaigrier est livré avec son robinet, et qu'un fût l'est aussi", () => {
    dit("Le vinaigrier est il vendu avec son robinet", /robinet en bois/);
    dit("le fût de 50 litres est-il vendu avec un robinet ?", /robinet de soutirage/);
  });

  it("répond sur les magnums sans promettre qu'ils entrent dans un casier", () => {
    dit("dans votre sasier a 13, 50 € peut-on y mettre des magnums", /trop étroites pour un magnum/);
  });
});

describe("les libellés des nouveaux concepts, tels qu'ils sont proposés en suggestion", () => {
  // Un client qui clique sur une suggestion doit obtenir la réponse du concept proposé.
  const LIBELLES: Array<[string, RegExp]> = [
    ["Envoyer une photo ou un fichier", /^envoi-photo\./],
    ["Livraison offerte non proposée", /^livraison-offerte-absente\./],
    ["Choix du transporteur", /^transporteur-propose\./],
    ["Commander sans créer de compte", /^commande-sans-compte\./],
    ["Devis et prix par quantité", /^devis\./],
    ["Robinet livré avec le vinaigrier", /^robinet-fourni\./],
    ["Démarrer son vinaigre avec une mère", /^demarrer-vinaigre\./],
    ["Col des dames-jeannes", /^col-dame-jeanne\./],
    ["Robinet de fût alimentaire", /^robinet-fut\./],
    ["Couvercle de fût alimentaire", /^couvercle-fut\./],
    ["Mustimètre", /^mustimetre\./],
    ["Éprouvette graduée", /^eprouvette\./],
    ["Mèches soufrées", /^meche-soufree\./],
    ["Bonde aseptique et recharge Larroseptol", /^bonde-aseptique\./],
    ["Magnums et grands formats", /^magnum\./],
    ["Vin de noix et vins de fruits", /^vin-de-fruits\./],
    ["Bouchons Pratic", /^bouchon-pratic\./],
    ["Cuillère à confiture avec crochet", /^cuillere-confiture\./],
    ["Grilles de hachoir", /^grille-hachoir\./],
    ["Boucher le plus simplement", /^facilite-bouchage\./],
    ["Livraison en Belgique", /^livraison-belgique\./],
    ["Livraison en Suisse", /^livraison-suisse\./],
  ];

  for (const [libelle, attendu] of LIBELLES) {
    it(`« ${libelle} »`, () => {
      const reponse = assistant.repondre(libelle);
      expect(reponse.nature).toBe("reponse");
      expect(reponse.trace.faits[0]).toMatch(attendu);
    });
  }

  it("ne propose jamais un libellé anglais à un client français", () => {
    const anglais = BASE.concepts.filter((c) => c.famille === undefined && /\bsending\b/i.test(c.libelle)).map((c) => c.id);
    for (const id of anglais) {
      expect(BASE.concepts.filter((c) => c.famille === id || c.voirAussi?.includes(id)), id).toEqual([]);
    }
  });
});

describe("une question courte qui ouvre un nouveau sujet n'est pas une suite", () => {
  it("ne reprend pas le sujet précédent quand le message commence par un article", () => {
    const avant = assistant.repondre("comment préparer le bouchon du vinaigrier");
    const suivante = assistant.repondre("la poignée ?", avant.contexte);
    expect(suivante.trace.relance).toBe(false);
    expect(suivante.trace.concepts).not.toContain("bouchon-vinaigrier");
  });
});

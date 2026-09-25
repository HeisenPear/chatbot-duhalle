// L'invitation du conseiller : le bon message sur la bonne page, et des
// questions auxquelles la base sait répondre.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";
import { choisirInvitation, INVITATION_GENERALE, TOUTES_LES_INVITATIONS } from "../src/widget/invitations";

const assistant = new Assistant(BASE, REGLAGES);

describe("les invitations", () => {
  for (const { texte, question } of TOUTES_LES_INVITATIONS) {
    it(`« ${question} » obtient une vraie réponse`, () => {
      expect(assistant.repondre(question).nature).toBe("reponse");
    });

    it(`« ${texte} » vouvoie, sans emoji`, () => {
      for (const phrase of [texte, question]) {
        expect(phrase).not.toMatch(/(?<!\p{L})(tu|toi|ton|ta|tes|te|t['’])(?!\p{L})/iu);
        expect(phrase).not.toMatch(/\p{Extended_Pictographic}/u);
        expect(phrase.length).toBeLessThan(110);
      }
    });
  }
});

describe("le choix selon la page", () => {
  const CAS: Array<[string, string | null]> = [
    ["/", INVITATION_GENERALE.question],
    ["/comment-faire-son-cidre", "Comment faire son cidre ?"],
    ["/pressoir-a-pommes-c2x1", "Comment faire son cidre ?"],
    ["/cire-dure-c102x4302096", "Cire dure ou souple ?"],
    ["/vinaigrier-en-gres-c2x2", "Comment faire du vinaigre ?"],
    ["/bocaux-le-parfait-c2x3", "Comment stériliser des bocaux ?"],
    ["/tire-bouchon-2-temps-c2x4", "Quel tire-bouchon choisir ?"],
    ["/service-du-vin-c102x4247837", "Quel tire-bouchon choisir ?"],
    ["/comment-organiser-sa-cave-a-vins", "Comment conserver une bouteille de vin ?"],
    ["/bouchons-de-liege-pour-le-vin-c102x4185089", "Quel bouchon choisir pour mon vin ?"],
    ["/boucheuse-2-leviers-c2x35078790", "Quel bouchon choisir pour mon vin ?"],
    ["/bouteille-de-vin-vide-75-cl-bordelaise-verte-c2x38513710", "Comment mettre mon vin en bouteille ?"],
    ["/capsules-pvc-retract-or-50-c2x35078859", "Comment mettre mon vin en bouteille ?"],
    // Panier, commande, compte : aucune invitation.
    ["/PBShoppingCart.asp", null],
    ["/PBSCOrder.asp?etape=2", null],
    ["/PBSCCustomerAccount.asp", null],
    ["/paiement", null],
  ];
  for (const [adresse, attendue] of CAS) {
    it(`${adresse} → ${attendue ?? "aucune invitation"}`, () => {
      expect(choisirInvitation(adresse)?.question ?? null).toBe(attendue);
    });
  }
});

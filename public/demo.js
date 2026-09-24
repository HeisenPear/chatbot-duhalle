// Page de démonstration : les boutons d'essai posent leur question au chatbot.
// (Dans un fichier à part : la politique de sécurité de la page interdit les scripts en ligne.)
document.querySelectorAll("button.essai").forEach(function (b) {
  b.addEventListener("click", function () {
    if (window.DuhalleChat) window.DuhalleChat.poser(b.textContent);
  });
});

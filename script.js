/* ==========================================================================
   PORTFOLIO — COMPORTEMENTS
   01. Horloge et date de la feuille de service
   02. Année du pied de page
   03. Apparition des sections au défilement
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     01. Horloge et date de la feuille de service
     ------------------------------------------------------------------ */
  const horloge = document.getElementById('horloge');
  const jour    = document.getElementById('jour');

  if (horloge) {
    const tic = () => {
      horloge.textContent = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    };
    tic();
    setInterval(tic, 1000);
  }

  if (jour) {
    jour.textContent = new Date()
      .toLocaleDateString('fr-FR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
      })
      .toUpperCase();
  }

  /* ------------------------------------------------------------------
     02. Année du pied de page
     ------------------------------------------------------------------ */
  const annee = document.getElementById('annee');
  if (annee) annee.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     03. Apparition des sections au défilement
     Ajoute la classe .vu aux éléments .reveal quand ils entrent
     dans l'écran. Si l'utilisateur a demandé moins d'animations,
     tout est affiché immédiatement.
     ------------------------------------------------------------------ */
  const elements = document.querySelectorAll('.reveal');
  const animationsReduites = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animationsReduites || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('vu'));
    return;
  }

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (!entree.isIntersecting) return;
      entree.target.classList.add('vu');
      observateur.unobserve(entree.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observateur.observe(el));
})();

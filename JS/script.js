document.addEventListener('DOMContentLoaded', function() {
    // Date de début de la construction du site (mettre la date souhaitée)
    const startDate = new Date('2024-07-23');
    const today = new Date();

    // Calcul du nombre de jours depuis la date de début de la construction
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Affichage du nombre de jours dans le HTML
    document.getElementById('days').textContent = diffDays;

    // Fonction pour mettre à jour le compteur de visites
    function updateVisitCount() {
        // Récupérer le compteur de visites depuis le Local Storage
        let visitCount = localStorage.getItem('visitCount');

        // Si le compteur de visites n'existe pas encore, initialiser à 0
        if (!visitCount) {
            visitCount = 0;
        }

        // Convertir en entier
        visitCount = parseInt(visitCount);

        // Incrémenter le compteur
        visitCount++;

        // Mettre à jour le Local Storage avec la nouvelle valeur
        localStorage.setItem('visitCount', visitCount);

        // Afficher le compteur sur la page
        document.getElementById('visitCount').innerText = visitCount;
    }

    // Appeler la fonction pour mettre à jour et afficher le compteur au chargement de la page
    updateVisitCount();

    // Réinitialiser le compteur de visites avec une combinaison de touches
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'U') {
            localStorage.setItem('visitCount', 0);
            updateVisitCount();
            alert('Compteur réinitialisé.');
        }
    });
});
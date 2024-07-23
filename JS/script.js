document.addEventListener('DOMContentLoaded', function() {
    // Date de début de la construction du site (mettre la date souhaitée)
    const startDate = new Date('2024-07-23');
    const today = new Date();
    
    // Calcul du nombre de jours depuis la date de début de la construction
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Affichage du nombre de jours dans le HTML
    document.getElementById('days').textContent = diffDays;
});

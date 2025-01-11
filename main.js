const toggleLink = document.getElementById('header-nav__item-toggle');
const menu = document.getElementById('header-nav__item-pages');

// Event Listener für den Klick auf den Link
toggleLink.addEventListener('click', function(event) {
    event.preventDefault();  // Verhindert das Standard-Verhalten des Links (Seite neu laden)
    
    // Toggle die Anzeige des Menüs zwischen 'none' und 'flex'
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';  // Menü ausblenden
    } else {
        menu.style.display = 'flex';  // Menü einblenden
    }
});
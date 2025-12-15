(function(){
    let outsideListener = null;

    function closeMenu(menu, icon) {
        menu.classList.remove('open');
        icon.classList.remove('open');
        icon.setAttribute('aria-expanded', 'false');
        if (outsideListener) {
            document.removeEventListener('click', outsideListener, true);
            outsideListener = null;
        }
    }

    window.toggleMenu = function() {
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (!menu || !icon) return;

        const isOpen = menu.classList.toggle('open');
        icon.classList.toggle('open');
        icon.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

        if (isOpen) {
            // close when clicking outside
            outsideListener = function(e) {
                const menuWrap = document.querySelector('.hamburger-menu');
                if (!menuWrap) return;
                if (!menuWrap.contains(e.target)) {
                    closeMenu(menu, icon);
                }
            };
            // use capture to ensure we receive the click before other handlers
            document.addEventListener('click', outsideListener, true);
        } else {
            if (outsideListener) {
                document.removeEventListener('click', outsideListener, true);
                outsideListener = null;
            }
        }
    };

    // enhance accessibility on load
    document.addEventListener('DOMContentLoaded', function(){
        const icon = document.querySelector('.hamburger-icon');
        const menu = document.querySelector('.menu-links');
        if (icon) {
            icon.setAttribute('role', 'button');
            icon.setAttribute('tabindex', '0');
            icon.setAttribute('aria-expanded', 'false');
            icon.addEventListener('keydown', function(e){
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.toggleMenu();
                }
            });
        }
        if (menu) {
            menu.setAttribute('aria-hidden', 'true');
        }
    });
})();
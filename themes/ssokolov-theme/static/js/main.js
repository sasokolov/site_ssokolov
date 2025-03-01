// Function to detect user's preferred language
function detectLanguage() {
    // If URL already has language, don't redirect
    if (window.location.pathname.includes('/en/')) {
        return;
    }

    // Get user's browser language preferences
    const userLang = navigator.language || navigator.userLanguage;
    
    // If language starts with 'en', redirect to English version
    // Otherwise default to Russian (no redirect needed as it's the default)
    if (userLang && userLang.startsWith('en') && !window.location.pathname.includes('/en/')) {
        // Get current path and redirect to English version
        const currentPath = window.location.pathname;
        const englishPath = '/en' + (currentPath === '/' ? '/' : currentPath);
        
        // Store that we've already redirected in session storage to prevent redirect loops
        if (!sessionStorage.getItem('languageRedirected')) {
            sessionStorage.setItem('languageRedirected', 'true');
            window.location.href = englishPath;
        }
    }
}

// Function to switch between languages while preserving current page path
function switchLanguage(targetLang) {
    console.log('Switching language to', targetLang);
    
    // Get current path
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    
    let newPath;
    
    if (targetLang === 'en') {
        // Switch to English
        if (currentPath === '/' || currentPath === '') {
            // Home page
            newPath = '/en/';
        } else if (!currentPath.startsWith('/en/')) {
            // Any other page - add /en/ prefix
            newPath = '/en' + currentPath;
        } else {
            // Already in English
            console.log('Already in English, not switching');
            return;
        }
    } else {
        // Switch to Russian
        if (currentPath === '/en/' || currentPath === '/en') {
            // Home page
            newPath = '/';
        } else if (currentPath.startsWith('/en/')) {
            // Any other page - remove /en/ prefix
            newPath = currentPath.replace(/^\/en/, '');
        } else {
            // Already in Russian
            console.log('Already in Russian, not switching');
            return;
        }
    }
    
    console.log('New path:', newPath);
    
    // Navigate to the new URL
    window.location.href = newPath;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check for language preference and redirect if needed
    detectLanguage();
    
    // Add direct language toggle function to window
    window.toggleLanguage = function(targetLang) {
        console.log('toggleLanguage called with:', targetLang);
        switchLanguage(targetLang);
    };
    
    // Sidebar toggle
    const sidebarToggleOpen = document.querySelector('.sidebar-toggle.open');
    const sidebarToggleClose = document.querySelector('.sidebar-toggle.close');
    const secondary = document.getElementById('secondary');
    
    if (sidebarToggleOpen && secondary) {
        sidebarToggleOpen.addEventListener('click', function() {
            secondary.classList.add('open');
        });
    }
    
    if (sidebarToggleClose && secondary) {
        sidebarToggleClose.addEventListener('click', function() {
            secondary.classList.remove('open');
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('toggled');
        });
    }
    
    // Language switcher on mobile
    const languageSwitcher = document.querySelector('.language-switcher-toggle');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', function(e) {
            // For mobile devices, prevent the default behavior so the submenu stays open
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('sub-menu')) {
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        submenu.style.display = 'block';
                    }
                }
            }
        });
    }
});
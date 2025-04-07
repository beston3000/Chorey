// Get the base URL for assets
const baseUrl = window.location.hostname === 'beston3000.github.io' ? '/Chorey' : '';

document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'default';
    themeStylesheet.href = `${baseUrl}/themes/${savedTheme}.css`;
}); 
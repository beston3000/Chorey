document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'default';
    themeStylesheet.href = `Themes/${savedTheme}.css`;
}); 
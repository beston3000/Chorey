// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'default';
const themeStylesheet = document.getElementById('theme-stylesheet');
const baseUrl = window.location.hostname === 'beston3000.github.io' ? '/chorey' : '';

// Set the theme
themeStylesheet.href = `${baseUrl}/themes/${savedTheme}.css`;

// Function to change theme
function changeTheme(theme) {
    themeStylesheet.href = `${baseUrl}/themes/${theme}.css`;
    localStorage.setItem('theme', theme);
} 
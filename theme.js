// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'default';
const themeStylesheet = document.getElementById('theme-stylesheet');

// Set the theme
themeStylesheet.href = `./themes/${savedTheme}.css`;

// Function to change theme
function changeTheme(theme) {
    themeStylesheet.href = `./themes/${theme}.css`;
    localStorage.setItem('theme', theme);
} 
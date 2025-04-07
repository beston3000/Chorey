// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'default';
const themeStylesheet = document.getElementById('theme-stylesheet');

// Set the theme
themeStylesheet.href = `./Themes/${savedTheme}.css`;

// Function to change theme
function changeTheme(theme) {
    themeStylesheet.href = `./Themes/${theme}.css`;
    localStorage.setItem('theme', theme);
} 
// Get the base URL for assets
const baseUrl = window.location.hostname === 'beston3000.github.io' ? '/Chorey' : '';

document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const resetButton = document.getElementById('resetButton');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'default';
    themeStylesheet.href = `${baseUrl}/Themes/${savedTheme}.css`;

    // Add active class to current theme button
    themeButtons.forEach(button => {
        if (button.dataset.theme === savedTheme) {
            button.classList.add('active');
        }
    });

    // Theme switching
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            themeStylesheet.href = `${baseUrl}/Themes/${theme}.css`;
            localStorage.setItem('theme', theme);
            
            // Update active state of buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Reset data
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data? This will delete all chores, accounts, and completion data. This action cannot be undone.')) {
            localStorage.clear();
            // Keep the theme setting
            localStorage.setItem('theme', savedTheme);
            alert('All data has been reset.');
            window.location.reload();
        }
    });
}); 
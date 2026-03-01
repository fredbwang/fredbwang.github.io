document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    // Check for saved theme preference or use system preference
    // The actual background/text theme is applied by the blocking script in the HTML <head>
    // Here we just need to ensure the toggle UI matches the document state
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateToggleUI(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleUI(newTheme);
        });
    }

    function updateToggleUI(theme) {
        if (!themeIcon || !themeText) return;

        if (theme === 'dark') {
            themeIcon.className = 'fa fa-sun-o'; // Switch icon to sun
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fa fa-moon-o'; // Switch icon to moon
            themeText.textContent = 'Dark Mode';
        }
    }
});

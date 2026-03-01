document.addEventListener('DOMContentLoaded', () => {
    // Determine active tab
    const path = window.location.pathname;
    const isBlog = path.includes('/blog');
    const isAbout = path.includes('/about');
    const isHome = !isBlog && !isAbout;

    // Inject Sidebar HTML
    const sidebarHTML = `
    <aside class="sidebar">
        <div class="profile-section">
            <img class="profile-img" src="/assets/images/portrait.png" alt="Fred W.">
            <h1>Fred W.</h1>
            <h2>Senior Software Engineer @ Microsoft<br>Distributed Systems & Cloud Infrastructure</h2>
        </div>
        
        <nav class="main-nav">
            <a href="/" class="${isHome ? 'active' : ''}">Home</a>
            <a href="/blog/" class="${isBlog ? 'active' : ''}">Blog</a>
            <a href="/about/" class="${isAbout ? 'active' : ''}">About</a>
        </nav>

        <div class="theme-toggle" id="theme-toggle">
            <i class="fa ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'fa-sun-o' : 'fa-moon-o'}" id="theme-icon"></i>
            <span id="theme-text">${document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Initialize Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

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

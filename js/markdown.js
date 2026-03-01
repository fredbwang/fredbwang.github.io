document.addEventListener('DOMContentLoaded', () => {
    // Get the post name from the URL query string (e.g., ?post=first-post)
    const urlParams = new URLSearchParams(window.location.search);
    const postName = urlParams.get('post');

    const contentDiv = document.getElementById('content');
    const postListSection = document.getElementById('post-list');

    if (postName) {
        // A specific post was requested
        fetchPost(postName);
        postListSection.style.display = 'none';
        contentDiv.style.display = 'block';
    } else {
        // No post requested, show the blog list
        contentDiv.style.display = 'none';
        postListSection.style.display = 'block';
    }

    // Function to fetch and render the markdown
    async function fetchPost(name) {
        try {
            if (window.location.protocol === 'file:') {
                throw new Error('FILE_PROTOCOL');
            }

            // Attempt to fetch the markdown file from the posts directory
            const response = await fetch(`posts/${name}.md`);

            if (!response.ok) {
                throw new Error('Post not found');
            }

            const markdownContext = await response.text();

            // Render the markdown using marked.js
            contentDiv.innerHTML = marked.parse(markdownContext);

            // Optional: Update document title dynamically based on the first h1
            const h1 = contentDiv.querySelector('h1');
            if (h1) {
                document.title = `${h1.textContent} | Fred W.`;
            }

        } catch (error) {
            if (error.message === 'FILE_PROTOCOL') {
                contentDiv.innerHTML = `
                    <h1>Local Server Required</h1>
                    <p>Because you are viewing this page locally via a <code>file:///</code> URL, your browser's security settings (CORS) block fetching the Markdown files.</p>
                    <p>To view your blog posts locally, you must view the site using a local web server. For example, open your terminal in the site directory and run:</p>
                    <pre><code>python -m http.server 8080</code></pre>
                    <p>Then visit <a href="http://localhost:8080/blog/?post=${name}">http://localhost:8080/blog/?post=${name}</a></p>
                    <br><br>
                    <a href="index.html">&larr; Back to Blog List</a>
                `;
            } else {
                contentDiv.innerHTML = `
                    <h1>Post Not Found</h1>
                    <p>Sorry, the post you are looking for does not exist or has been moved.</p>
                    <a href="index.html">&larr; Back to Blog</a>
                `;
            }
            console.error('Error fetching post:', error);
        }
    }
});

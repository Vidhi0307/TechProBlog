const createBlogHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const post_name = document.querySelector('#blog-name').value.trim();
    const post_desc = document.querySelector('#blog-content').value.trim();

    if (post_name && post_desc) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/dashboard/newblog', {
            method: 'POST',
            body: JSON.stringify({ post_name, post_desc }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};


document
    .querySelector('.post-blog-form')
    .addEventListener('submit', createBlogHandler);

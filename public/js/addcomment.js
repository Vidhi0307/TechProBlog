const addComment = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const comment = document.querySelector('#comment-content').value.trim();
    const blog_id = document.querySelector('#comment-blog-id').value.trim();

    if (comment) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/dashboard/blog/addcomment', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};


document
    .querySelector('#add-comment')
    .addEventListener('click', addComment);

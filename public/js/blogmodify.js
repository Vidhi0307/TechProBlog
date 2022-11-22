//update blog
const updateBlog = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const post_name = document.querySelector('#blog-title').value.trim();
    const post_desc = document.querySelector('#blog-content').value.trim();
    // Collect values from the login form
    let id = document.querySelector('#blog-id').value.trim();

    if (post_name && post_desc) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, post_name, post_desc }),
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
//delete blog
const deleteBlog = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    let id = document.querySelector('#blog-id').value.trim();
    console.log("ID DELTEEEEEEEEEE" + id)

    if (id) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/dashboard/delete/${id}`, {
            method: 'DELETE',
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
    .querySelector('#delete-blog')
    .addEventListener('click', deleteBlog);

document
    .querySelector('#update-blog')
    .addEventListener('click', updateBlog);
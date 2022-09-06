async function editComment(event) {
    event.preventDefault();

    // get needed data for comments
    const comment_text = document.querySelector('#comment_content').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text,
            star_style
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    }
}; 

document.querySelector('.edit-comment-form').addEventListener('submit', editComment);

async function newComment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    // const star_style = document.querySelector('#star-style').value.trim();
    const employee_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'Post',
            body: JSON.stringify({
                employee_id,
                comment_text,
                star_style
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', newComment);
// import * as mdb from 'mdb-ui-kit'; // lib

async function newComment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const employee_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'Post',
            body: JSON.stringify({
                employee_id,
                comment_text
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

// $(document).ready(function() {
//     $('#starRate').mdbRate();
// });

// document.querySelector('#starRate').mdbRate();

document.querySelector('.comment-form').addEventListener('submit', newComment);

const blogId = document.querySelector('#comment-submit').getAttribute('data-id');


const newCommentFormHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, blogId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blogs/${blogId}`);
    } else {
      alert('Failed to create comment');
    }
  }
};


const deleteCommentHandler = async (event) => {
  const commentId = event.target.getAttribute('data-id');
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/blogs/${blogId}`);
  } else {
    alert('Failed to delete comment');
  }
};


document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);


const commentDeleteButtons = document.querySelectorAll('.comment-list');
commentDeleteButtons.forEach((commentDeleteButton) => {
  commentDeleteButton.addEventListener('click', deleteCommentHandler);
});

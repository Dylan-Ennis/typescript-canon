import { useState, ChangeEvent, FormEvent } from "react";
import React from 'react';

export default function CreateCommentForm() {
  const [comment, setComment] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      content: comment,
      author,
      storyID: "6649c146f67e417ecc2ef597",
    };

    const URL = `https://canon-backend.onrender.com/stories/6649c146f67e417ecc2ef597/comments`;
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const responseComment = await fetch(URL, config);
      const commentResponse = await responseComment.json();
      console.log(commentResponse);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    window.location.reload(); // Reload to show new comments
  };

  return (
    <div className="flex py-10 justify-center">
      <form onSubmit={handleSubmit} id="commentForm">
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            onChange={handleCommentChange}
            required
            type="text"
            id="comment"
            name="comment"
            value={comment}
            placeholder="Comment"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            onChange={handleAuthorChange}
            required
            type="text"
            id="author"
            name="author"
            value={author}
            placeholder="Author"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit">Create comment</button>
        </div>
      </form>
    </div>
  );
}

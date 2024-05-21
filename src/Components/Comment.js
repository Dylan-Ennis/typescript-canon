import { useState } from "react";

export default function CreateCommentForm() {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
    content: comment,
    author,
    storyID: "6649c146f67e417ecc2ef597"
  
  };


    const URL = `https://canon-backend.onrender.com/stories/6649c146f67e417ecc2ef597/comments`
    const config = {
        method: `POST`,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }
    
    try {
      const responseComment = await fetch(URL, config);
      const commentResponse = await responseComment.json();
      console.log(commentResponse);
    } catch (error) {
      console.error("Error submitting comment:", error);
      
    }
    window.location.reload() //We put this in here so that comments actually generate and so that after submitting a comment on the app, it displays on the page. It does not work if preventdefault is missing for some reason. We aren't sure why this works though.
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
            <button
              type="submit"
            >
              Create comment
            </button>
          </div>
      </form>
    </div>
  );
}

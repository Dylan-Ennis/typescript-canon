import { useState, ChangeEvent, FormEvent } from "react";
import React from 'react';


export default function SubmitForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      Title: title,
      StoryContent: content,
      Author: author,
    };

    const URL = "https://canon-backend.onrender.com/stories";
    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(URL, config);
      const story = await response.json();
      console.log(story);
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div className="flex py-10 justify-center">
      <form onSubmit={handleSubmit} id="storyForm">
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={handleTitleChange}
            required
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            onChange={handleContentChange}
            required
            id="content"
            name="content"
            value={content}
            placeholder="Content"
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
          <button type="submit">Submit Story</button>
        </div>
      </form>
    </div>
  );
}

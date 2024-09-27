import React, { useState } from "react";

const QuizForm = ({ onQuizCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://assignment-1-ez8u.onrender.com/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Failed to create quiz");

      setTitle("");
      setDescription("");
      onQuizCreated();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Quiz Description"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Create Quiz
      </button>
    </form>
  );
};

export default QuizForm;

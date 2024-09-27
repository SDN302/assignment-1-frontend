import { useState } from "react";

const QuestionForm = ({ quizId, onQuestionCreated }) => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://assignment-1-ez8u.onrender.com/questions/${quizId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            options,
            correctAnswerIndex,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to create question");

      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(0);
      onQuestionCreated();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Question Text"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}
      <div>
        <select
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((_, index) => (
            <option key={index} value={index}>
              Correct Answer: Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
      >
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;

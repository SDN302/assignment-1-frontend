import { useState } from "react";
import QuizForm from "./QuizForm";

const QuizList = ({ quizzes, onQuizDeleted, onSelectQuiz }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    onSelectQuiz(quiz);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(
        `https://assignment-1-ez8u.onrender.com/quizzes/${quizId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onQuizDeleted(quizId);
        setSelectedQuiz(null);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Quizzes</h2>
      <ul className="space-y-2 mb-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="flex justify-between items-center p-3 border border-gray-300 rounded shadow-sm"
          >
            <span
              className="flex-grow cursor-pointer"
              onClick={() => handleSelectQuiz(quiz)}
            >
              {quiz.title}
            </span>
            <div className="ml-3">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200 mr-2"
                onClick={() => handleSelectQuiz(quiz)}
              >
                Select
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                onClick={() => handleDeleteQuiz(quiz._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <QuizForm onQuizCreated={onSelectQuiz} />
    </div>
  );
};

export default QuizList;

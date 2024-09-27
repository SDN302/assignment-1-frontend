import { useState, useEffect } from "react";

const QuestionList = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://assignment-1-ez8u.onrender.com/quizzes/${quizId}`
      );
      const data = await response.json();

      (async () => {
        const responses = await Promise.all(
          data.questions.map(async (question) => {
            const response = await fetch(
              `https://assignment-1-ez8u.onrender.com/questions/${question}`
            );
            return response.json(); // Return the parsed JSON directly
          })
        );

        setQuestions([]);

        // Update the state with the collected responses
        setQuestions((prevQuestions) => [...prevQuestions, ...responses]);
      })();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <ul className="space-y-4">
      {questions.length > 0 ? (
        questions.map((question) => (
          <li
            key={question._id}
            className="p-4 border border-gray-300 rounded shadow-sm"
          >
            <h5 className="text-lg font-semibold">{question.text}</h5>
            <ul className="mt-2 space-y-2">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 rounded ${
                    index === question.correctAnswerIndex
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))
      ) : (
        <li className="p-4 border border-gray-300 rounded shadow-sm">
          No questions found
        </li>
      )}
    </ul>
  );
};

export default QuestionList;

import { useState, useEffect } from "react";
import QuizList from "./components/QuizList";
import QuestionList from "./components/QuestionList";
import QuestionForm from "./components/QuestionForm";

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("https://assignment-1-ez8u.onrender.com/quizzes");
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizDeleted = (quizId) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz._id !== quizId)
    );
    if (selectedQuiz && selectedQuiz._id === quizId) {
      setSelectedQuiz(null); // Clear selected quiz if deleted
    }
  };

  return (
    <div className="container mx-auto my-4 px-4">
      <h1 className="text-center text-3xl font-bold mb-4">Quiz App</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4">
          <QuizList
            quizzes={quizzes}
            onSelectQuiz={setSelectedQuiz}
            onQuizDeleted={handleQuizDeleted}
          />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h2 className="text-2xl mb-3">Questions</h2>
          {selectedQuiz && (
            <>
              <QuestionList quizId={selectedQuiz._id} />
              <QuestionForm quizId={selectedQuiz._id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../Provider/AuthContext.jsx";
import useLesson from "../../hooks/useLesson.jsx";

const LessonQuiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { student } = useAuth();
  const [lessons] = useLesson();

  const [quizzes, setQuizzes] = useState([]);
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState(0);
  const [loadingResult, setLoadingResult] = useState(false);

  // Guard values safely
  const lesson = lessons?.find((l) => String(l.id) === lessonId);

  const hasPaid = student?.paidLessons?.includes(lessonId);

  // ✅ Always call useEffect at top level
  useEffect(() => {
    if (hasPaid) {
      fetch(`http://localhost:8089/api/v1/lesson/${lessonId}/quiz/all`)
        .then((res) => res.json())
        .then((data) => setQuizzes(data))
        .catch(console.error);
    }
  }, [lessonId, hasPaid]);

  // Handle loading states safely
  if (!lessons) return <div>Loading lessons...</div>;
  if (!lesson) return <div>Lesson not found</div>;

  const submitAnswer = async (quizId) => {
    await fetch(
      `http://localhost:8089/api/v1/lesson/${lessonId}/quiz/submit/${quizId}?studentId=${student.id}&selectedOption=${selected[quizId]}`,
      { method: "POST" },
    );
  };

  const fetchResult = async () => {
    setLoadingResult(true);
    const res = await fetch(
      `http://localhost:8089/api/v1/lesson/${lessonId}/quiz/result/${student.id}`,
    );
    setResults(await res.json());
    setLoadingResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Lesson Info */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{lesson?.title}</h1>
        <p className="text-gray-700 mt-2">{lesson?.description}</p>
      </div>

      {/* NOT PAID */}
      {!hasPaid && (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-center">
          <p className="text-lg font-semibold mb-4">
            You must purchase this lesson to access the quiz.
          </p>
          <button
            onClick={() => navigate(`/payment/${lessonId}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buy Lesson
          </button>
        </div>
      )}

      {/* PAID → SHOW QUIZ */}
      {hasPaid && (
        <div className="max-w-7xl mx-auto flex gap-6 p-6">
          <div className="flex-1">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white p-4 mb-4 rounded shadow">
                <h3 className="font-semibold mb-2">{quiz.question}</h3>

                {quiz.options.map((opt, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="radio"
                      name={quiz.id}
                      onChange={() =>
                        setSelected({ ...selected, [quiz.id]: index })
                      }
                    />
                    <span className="ml-2">{opt}</span>
                  </label>
                ))}

                <button
                  onClick={() => submitAnswer(quiz.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            ))}
          </div>

          {/* Result Panel */}
          <div className="w-72 bg-white p-4 rounded shadow sticky top-6">
            <h2 className="font-semibold mb-2">Your Result</h2>
            <p>
              Correct Answers:{" "}
              <span className="font-bold">
                {loadingResult ? "Loading..." : results}
              </span>
            </p>

            <button
              onClick={fetchResult}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
            >
              See Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonQuiz;

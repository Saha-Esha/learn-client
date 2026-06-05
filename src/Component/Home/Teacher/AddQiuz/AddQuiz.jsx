import { useState } from "react";
import { useParams } from "react-router-dom";
import useLesson from "../../../hooks/useLesson";

const AddQuiz = () => {
  const { lessonId } = useParams();

  const [lessons] = useLesson();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      question,
      options,
      correctOptionIndex,
    };

    try {
      const res = await fetch(
        `http://localhost:8089/api/v1/lesson/${lessonId}/quiz/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        },
      );

      if (res.ok) {
        alert("Quiz added successfully!");
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectOptionIndex(0);
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Quiz</h2>

      <form onSubmit={handleSubmit}>
        {/* Question */}
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Options */}
        {options.map((opt, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="radio"
              name="correctOption"
              checked={correctOptionIndex === index}
              onChange={() => setCorrectOptionIndex(index)}
              className="mr-2"
            />

            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
        >
          Add Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;

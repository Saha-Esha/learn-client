import { useEffect, useState } from "react";
import { useAuth } from "../../Provider/AuthContext.jsx";
import { useNavigate } from "react-router";

const Home = () => {
  const [lessons, setLessons] = useState([]);
  const { student } = useAuth();
  console.log(student);
  const navigate = useNavigate();
  // Fetch lessons from API

  useEffect(() => {
    fetch("http://localhost:8089/api/v1/lesson/all")
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error("Error fetching lessons:", err));
  }, []);

  const handleLessonClick = (lessonId) => {
    console.log("object");
    console.log(student?.role);
    if (student?.role === "teacher") {
      navigate(`/lesson/${lessonId}/add-quiz`);
    } else {
      console.log("object2");
      navigate(`/lesson/${lessonId}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Lessons</h1>

      {student?.role === "teacher" ? (
        <button
          className="font-bold text-2xl bg-amber-700 pt-2 pb-2 pl-3 pr-3 rounded-xl text-white mb-4  cursor-pointer"
          onClick={() => navigate("/lesson/add")}
        >
          Add Lesson
        </button>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => handleLessonClick(lesson.id)}
            className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-2   ">
                {lesson.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

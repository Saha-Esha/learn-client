import { useEffect, useState } from "react";

const ALLUsers = () => {
  const [students, setStudents] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8089/api/v1/student/getAll")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {students.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="bg-white rounded shadow divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id} className="p-4 hover:bg-gray-50">
              {student.studentname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ALLUsers;

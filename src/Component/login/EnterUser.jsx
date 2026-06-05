import { useState } from "react";
import { useAuth } from "../../Provider/AuthContext.jsx";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const EnterUser = () => {
  const [mobile, setMobile] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8089/api/v1/student/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }), // ✅ send mobile only
        },
      );

      if (!response.ok) {
        throw new Error("Student not found");
      }

      const studentData = await response.json(); // ✅ backend response

      login(studentData); // ✅ store ALL data in AuthProvider
      alert("Login successful");
      navigate("/home");
    } catch (error) {
      alert("Invalid mobile number");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="  mb-4 text-2xl font-bold text-red-700 text-center">
            Login
          </h2>
          <label className="text-xl" htmlFor="">
            Enter Your Name
          </label>
          <input
            type="text"
            placeholder="Enter User Name"
            className="w-full border mt-5 px-3 py-2 rounded mb-4"
            required
          />

          <label className="text-xl" htmlFor="">
            Enter Your Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border mt-5 px-3 py-2 rounded mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2 rounded font-bold hover:bg-red-700"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?
          <NavLink to="/" className="text-red-800 ml-2">
            <span>Sign Up</span>{" "}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default EnterUser;

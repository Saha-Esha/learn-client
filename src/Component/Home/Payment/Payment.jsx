import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../Provider/AuthContext.jsx";

const Payment = () => {
  const { lessonId } = useParams(); // course / lesson id
  const { student, login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const amount = 500; // course price (can come from backend later)

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `http://localhost:8089/api/v1/payment/pay?studentId=${student.id}&courseId=${lessonId}&amount=${amount}`,
        { method: "POST" },
      );
      const text = await res.text();
      setMessage(text);

      if (text.includes("successful")) {
        // ✅ Update student state to include the new paid lesson
        const updatedStudent = {
          ...student,
          paidLessons: [...(student.paidLessons || []), lessonId],
        };
        login(updatedStudent); // update AuthContext
        setTimeout(() => {
          navigate(`/lesson/${lessonId}`);
        }, 1000);
      }
    } catch (err) {
      setMessage("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#E2136E]">bKash Payment</h1>
          <p className="text-gray-500 text-sm mt-1">Secure digital payment</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-sm text-gray-600">Paying as</p>
          <p className="font-semibold">{student?.studentname}</p>
          <p className="text-sm text-gray-500">{student?.mobile}</p>
        </div>

        {/* Course Info */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Course ID</span>
          <span className="font-medium">{lessonId}</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">Amount</span>
          <span className="text-xl font-bold text-green-600">৳ {amount}</span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400" : "bg-[#E2136E] hover:bg-[#c8105f]"
          }`}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-sm font-medium text-green-600">
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to bKash terms & conditions
        </p>
      </div>
    </div>
  );
};

export default Payment;

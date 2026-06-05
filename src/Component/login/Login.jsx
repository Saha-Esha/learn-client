import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8089/api/v1/student/save",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("Saved student ID:", result);
      alert("Account created successfully! ID: " + result);
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-xl">Name</label>
            <input
              type="text"
              {...register("studentname", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded"
            />

            {errors.studentname && (
              <p className="text-red-500 text-sm">
                {errors.studentname.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-xl">Address</label>
            <input
              type="text"
              {...register("studentaddress", {
                required: "Address is required",
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.studentaddress && (
              <p className="text-red-500 text-sm">
                {errors.studentaddress.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-xl">Mobile</label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile is required",
                pattern: {
                  value: /^[0-9]{6,15}$/,
                  message: "Invalid mobile number",
                },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 text-xl">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Guardian Name (optional) */}
          <div>
            <label className="block mb-1 text-xl">
              Guardian Name (Optional)
            </label>
            <input
              type="text"
              {...register("gurdianname")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2 rounded font-bold hover:bg-red-700"
          >
            Create Account
          </button>
        </form>
        <NavLink
          to="/enterUser"
          className="mt-4 text-center block text-red-800"
        >
          <p>Already have an Account </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;

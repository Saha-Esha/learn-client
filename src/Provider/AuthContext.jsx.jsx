import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load student from localStorage on refresh
  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = (studentData) => {
    setStudent(studentData);
    localStorage.setItem("student", JSON.stringify(studentData));
  };

  // Logout handler
  const logout = () => {
    setStudent(null);
    localStorage.removeItem("student");
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

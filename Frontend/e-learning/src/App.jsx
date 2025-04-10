import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navigare/Navbar";
import { AuthProvider } from "./Auth/AuthProvider";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import ProtectedRoute from "./Auth/ProtectedRoute";
import AddCourse from "./Cursuri/AddCourse";
import Cursuri from "./Cursuri/Cursuri";
import Contact from "./Contact/Contact";
import DashboardProfesor from "./Profesor/DashboardProfesor";
import DashboardStudent from "./Student/DashboardStudent";
import EditCourse from "./Cursuri/EditCourse";
import EnrolledCourses from "./Student/EnrolledCourses";
import EnrollmentCalendar from "./Profesor/EnrollmentCalendar";
import EnrollmentStats from "./Profesor/EnrollmentStats";
import ChatBot from "./chat/ChatBot";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cursuri" element={<Cursuri />} />

          {}
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <EditCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={["student", "profesor"]}>
                <ChatBot />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar-inrolari"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <EnrollmentCalendar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/statistici-inrolari"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <EnrollmentStats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrolled"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <EnrolledCourses />
              </ProtectedRoute>
            }
          />

          {}
          <Route
            path="/profesor"
            element={
              <ProtectedRoute allowedRoles={["profesor"]}>
                <DashboardProfesor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <DashboardStudent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

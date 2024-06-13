// /frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterStudent from "./components/RegisterStudent";
import RegisterProfessor from "./components/RegisterProfessor";
import ForgotPassword from "./components/ForgotPassword";
import TeacherCourses from "./components/TeacherCourses";
import EditCourse from "./components/EditCourse";
import AddModules from "./components/AddModules";
import CourseDetail from "./components/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import AdminStudents from "./components/AdminStudents";
import AdminProfessors from "./components/AdminProfessors";
import ApproveProfessors from "./components/ApproveProfessors";
import CreateAdmin from "./components/CreateAdmin";
import AdminCourses from "./components/AdminCourses";
import Statistics from "./components/Statistics";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
import TeacherCreateCourse from "./components/TeacherCreateCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-professor" element={<RegisterProfessor />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/my-learning" element={<Home />} />
            <Route path="/professor/courses" element={<TeacherCourses />} />
            <Route path="/professor/course/:id" element={<CourseDetail />} />
            <Route path="/professor/edit-course/:id" element={<EditCourse />} />
            <Route path="/professor/add-modules/:id" element={<AddModules />} />
            <Route
              path="/professor/create-course"
              element={<TeacherCreateCourse />}
            />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/professors" element={<AdminProfessors />} />
            <Route
              path="/admin/approve-professor"
              element={<ApproveProfessors />}
            />
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

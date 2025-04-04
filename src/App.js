import { Route, Routes } from "react-router-dom";
import Login from "./panges/LoginPage";
import SignIn from "./panges/SignInPage";
import Home from "./panges/Home";
import SDashboard from "./panges/StudentPage";
import TDashboard from "./panges/TeacherPage";
import ForgetPassword from "./panges/ForgetPage";
import ProtectedRoute from "./panges/ProtectedRoute";
import StudentList from "./components/Student";
// import TeacherSignIn from "./panges/TeacherSignIn";
import FaceRecognition from "./components/FaceRecognition";
// import Profile from "./components/Profile";
import ShowApplication from "./components/ShowApplication";
import AttendanceTable from "./components/AttendenceTable";
import FaceRegistration from "./components/FaceRegistration";
import AdminDashboard from "./panges/AdminDashboard";
import PDFViewer from "./components/PDFViewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<SignIn />} />
      <Route path="/faced" element={<FaceRecognition />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/send" element={<ShowApplication />} />
      <Route path="/demoooo" element={<FaceRegistration/>} />
      <Route path="/attendanceTable" element={<AttendanceTable/>} />
      {/* <Route path="/Teacher/signup" element={<TeacherSignIn/>} /> */}
        <Route path="/Admin/dashboard" element={<AdminDashboard />} />
        <Route path="/view-pdf" element={<PDFViewer />} />
      <Route element={<ProtectedRoute/>}>
        <Route path="/Students/dashboard" element={<SDashboard />} />
        <Route path="/Teachers/dashboard" element={<TDashboard />} />

        <Route path="/students" element={<StudentList/>} />
      </Route>
      <Route path="/forget/password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;

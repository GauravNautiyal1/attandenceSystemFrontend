import { Mail, Calendar, BookOpen, GraduationCap, Hash, User, Medal } from "lucide-react";
import "../CSS/StudentProfile.css"; // Importing custom CSS
import user from "../Images/profilePicture.png"

export default function StudentProfile({student}) {
  console.log("456123845",student)
  const attendance= 87;
  // const student = {
  //   id: 1,
  //   first_name: "GAURAV",
  //   last_name: "NAUTIYAL",
  //   Roll_No: 22006120015,
  //   semester: "5",
  //   Branch: "IT",
  //   Email: "hacker.ai0987654321@gmail.com",
  //   Age: 20,
  //   attendance: 87,
  // };

  const getRank = (attendance) => {
   if (attendance === 100) return { rank: "Diamond", color: "#0dcaf0" };
   if (attendance >= 95) return { rank: "Platinum", color: "#adb5bd" };
   if (attendance >= 80) return { rank: "Gold", color: "#ffc107" };
   if (attendance >= 60) return { rank: "Silver", color: "#c0c0c0" };
   return { rank: "Bronze", color: "#cd7f32" };
 };

 const { rank, color } = getRank(attendance);

  return (
   <div className="profile-container">
   <header className="profile-header">
     <h1>Student Profile</h1>
   </header>

   <main className="container py-5">
     <div className="profile-card shadow-lg">
       <div className="row g-0">
         {/* Profile Picture and Rank */}
         <div className="col-md-4 profile-sidebar text-white text-center">
           <img
             src={user}
             alt="Student profile"
             className="profile-img"
           />
           <h2>{`${student.name}`}</h2>
           <p>{student.Branch} Student</p>

           {/* 🏅 Attendance Rank Badge */}
           <div className="rank-badge" style={{ backgroundColor: color }}>
             <Medal size={24} className="me-2" />
             <span>{rank}</span>
           </div>
           <p className="mt-2">Attendance: {attendance}%</p>
         </div>

         {/* Student Info */}
         <div className="col-md-8 p-4">
           <div className="row g-4">
             <InfoItem icon={<Hash size={20} />} label="Roll Number" value={student.id} />
             <InfoItem icon={<BookOpen size={20} />} label="Semester" value={student.semester} />
             <InfoItem icon={<GraduationCap size={20} />} label="Branch" value={student.branch} />
             <InfoItem icon={<Calendar size={20} />} label="Age" value={student.age} />
             <InfoItem icon={<Mail size={20} />} label="Email" value={student.email} />
             <InfoItem icon={<User size={20} />} label="Student ID" value={student.id}  className="mt-3"/>
           </div>
         </div>
       </div>
     </div>
   </main>
 </div>
);
}

// 💡 InfoItem Component
function InfoItem({ icon, label, value }) {
return (
 <div className="col-12 col-md-6 d-flex align-items-center info-item">
   <div className="me-2 text-primary">{icon}</div>
   <div>
     <small className="text-muted">{label}</small>
     <p className="mb-0 fw-semibold text-dark">{value}</p>
   </div>
 </div>
);
}
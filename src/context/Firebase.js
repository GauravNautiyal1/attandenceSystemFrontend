import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app"; // initilize firebase
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"; //create user
import { getDatabase, ref, set } from "firebase/database"; //create database
import { collection, getFirestore, addDoc,setDoc, doc, getDocs, getDoc } from "firebase/firestore"; //create database

const firebaseConfig = {
  apiKey: "AIzaSyDB_OjRxtrLyK-_aqHCmDZACx25C2Fl6ME",
  authDomain: "app-1ffba.firebaseapp.com",
  databaseURL: "https://app-1ffba-default-rtdb.firebaseio.com",
  projectId: "app-1ffba",
  storageBucket: "app-1ffba.firebasestorage.app",
  messagingSenderId: "8134793793",
  appId: "1:8134793793:web:df8dc761b6a69abc2784c0",
};

// instance
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp); //create instance to create firebase authers
const database = getDatabase(firebaseApp); //create instance to use firebase database
const firestore = getFirestore(firebaseApp); //create instance to use firebase database

// context

const FirebaseContext = createContext(null);
// costom hook

export const useFirebase = () => useContext(FirebaseContext);

// functions

export const FirebaseProvider = (props) => {
  // functions.......

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

    


  const singupUserWithEmailAndPassword = async (email, password,role,department) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: role, // Store role
        department: department, // Store role
      });
  
      return { success: true, user };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message };
    }
  };
  const singupStudentWithEmailAndPassword = async (email, password,role,Branch,semester,Roll_No) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: role, // Store role
        Branch: Branch, // Store role
        Semester: semester, // Store role
        Roll_No: Roll_No, // Store role
      });
  
      return { success: true, user };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message };
    }
  };

  
  const LoginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const isLoggedIn = user ? true : false;

  const LogoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      console.log("Password reset email sent!");
      return { success: true, message: "Password reset email sent!" };
    } catch (error) {
      console.error("Password reset error:", error);
      return { success: false, message: error.message };
    }
  };

  const putStudentData = async (branch, semester, rollNo, data) => {
    try {
      // Firestore reference for the nested collection structure
      const docRef = doc(firestore, `users/Students/${branch}/${semester}/students`, rollNo);
      
      await setDoc(docRef, data);
  
      console.log(`Document successfully written at: users/Students/${branch}/${semester}/students/${rollNo}`);
      return { success: true, id: rollNo };
    } catch (error) {
      console.error("Error adding document:", error);
      return { success: false, message: error.message };
    }
  };

  const putTeacherData = async (department, departmentId, data) => {
    if (!department || !departmentId || !data) {
      console.error("Invalid department, teacher ID, or data:", department, departmentId, data);
      return { success: false, message: "Invalid input data" };
    }
  
    try {
      // Correct Firestore reference with an even number of segments
      const teacherDocRef = doc(firestore, `users/Teachers/${department}/${departmentId}`);
      
      await setDoc(teacherDocRef, data, { merge: true }); // Merge to avoid overwriting
  
      console.log(`Teacher data stored successfully at users/Teachers/${department}/${departmentId}`);
      return { success: true, id: departmentId };
    } catch (error) {
      console.error("Error adding teacher document:", error);
      return { success: false, message: error.message };
    }
  };
  
  
  
  



  const fetchAllStudents = async (branch, semester) => {
    try {
      const studentsCollection = collection(firestore, `users/Students/${branch}/${semester}/students`);
      const studentSnapshot = await getDocs(studentsCollection);
      
      const students = studentSnapshot.docs.map((doc) => {
        const studentData = doc.data();
        return {
          id: doc.id, // Roll number as document ID
          name: studentData.first_name + " " + studentData.last_name || "N/A",
          email: studentData.Email || "N/A",
          branch: studentData.Branch || "N/A",
          semester: studentData.semester || "N/A",
          phone: studentData.phone || "N/A",
          address: studentData.address || "N/A",
        };
      });
  
      return { success: true, data: students };
    } catch (error) {
      console.error("Error fetching students:", error);
      return { success: false, message: error.message };
    }
  };

  const fetchSingleStudent = async (branch, semester, studentId) => {
    try {
      // Reference to a specific student document
      const studentRef = doc(firestore, `users/Students/${branch}/${semester}/students/${studentId}`);
      const studentSnapshot = await getDoc(studentRef);
  
      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();
        console.log("85888",studentData)
        return {
          id: studentSnapshot.id, // Roll number as document ID
          age: studentData.Age|| "N/A",
          name: `${studentData.first_name || ""} ${studentData.last_name || ""}`.trim() || "N/A",
          email: studentData.Email || "N/A",
          branch: studentData.Branch || "N/A",
          semester: studentData.semester || "N/A",
          phone: studentData.phone || "N/A",
          address: studentData.address || "N/A",
        };
      } else {
        console.log("No student found with the given ID");
        return null;
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      return null;
    }
  };

  // ...............................................................
  
  
  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(firestore, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { success: true, data: userSnap.data() };
      } else {
        return { success: false, message: "User not found!" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  const fetchStudentData = async (branch, semester, rollNo) => {
    try {
      // Reference to the student's document
      const studentDocRef = doc(firestore, `users/Students/${branch}/${semester}/students`, rollNo);
  
      // Fetch the document
      const studentSnap = await getDoc(studentDocRef);
  
      if (studentSnap.exists()) {
        return { success: true, data: studentSnap.data() };
      } else {
        return { success: false, message: "Student not found!" };
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      return { success: false, message: error.message };
    }
  };
  


  // return functions
  return (
    <FirebaseContext.Provider
      value={{
        singupUserWithEmailAndPassword,
        singupStudentWithEmailAndPassword,
        LoginUserWithEmailAndPassword,
        isLoggedIn,
        LogoutUser,
        resetPassword,
        putStudentData,
        putTeacherData,
        fetchAllStudents,
        fetchUserData,
        fetchStudentData,
        fetchSingleStudent,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

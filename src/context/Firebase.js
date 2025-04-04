import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app"; // initilize firebase
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
} from "firebase/auth"; //create user
import { getDatabase, query, ref, set } from "firebase/database"; //create database
import { collection, getFirestore, addDoc,setDoc, doc, getDocs, getDoc, updateDoc, where, deleteDoc } from "firebase/firestore"; //create database

// const firebaseConfig = {
//   apiKey: "AIzaSyDB_OjRxtrLyK-_aqHCmDZACx25C2Fl6ME",
//   authDomain: "app-1ffba.firebaseapp.com",
//   databaseURL: "https://app-1ffba-default-rtdb.firebaseio.com",
//   projectId: "app-1ffba",
//   storageBucket: "app-1ffba.firebasestorage.app",
//   messagingSenderId: "8134793793",
//   appId: "1:8134793793:web:df8dc761b6a69abc2784c0",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDdSpN3iXR3xHRxvCENySOQGVvR1tu6yq0",
  authDomain: "fir-fcb7a.firebaseapp.com",
  projectId: "fir-fcb7a",
  storageBucket: "fir-fcb7a.firebasestorage.app",
  messagingSenderId: "147875796591",
  appId: "1:147875796591:web:6a4201bd19fb3f53f09f9a",
  measurementId: "G-TFKS7NYEFD"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user){
        console.log("User logged in:", user);
        setUser(user);
        setIsLoggedIn(true);
      }
      else setUser(null);
    });
  }, []);
  



  const singupUserWithEmailAndPassword = async (email, password,role,department) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role,
        department,
        password,
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
        role,
        Branch,
        semester,
        Roll_No,
        IsAuthorised: false,
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

  const LogoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      setIsLoggedIn(false);
      localStorage.setItem("role", null);
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
      const docRef = doc(firestore, `Students/${branch}/${semester}`, rollNo);
      
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
      const teacherDocRef = doc(firestore, `Teachers/${department}`);
      
      await setDoc(teacherDocRef, data, { merge: true });
  
      console.log(`Teacher data stored successfully at users/Teachers/${department}/${departmentId}`);
      return { success: true, id: departmentId };
    } catch (error) {
      console.error("Error adding teacher document:", error);
      return { success: false, message: error.message };
    }
  };
  
  // const deleteUserAccount = async (uid) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser; // Get the current authenticated user
  
  //   if (user && user.uid === uid) {
  //     try {
  //       await deleteUser(user);
  //       return { success: true };
  //     } catch (error) {
  //       return { success: false, error: error.message };
  //     }
  //   } else {
  //     return { success: false, error: "User not found or not authenticated." };
  //   }
  // };
  
  const deleteUserData = async (branch,semester,rollNo,docId) => {
    try {
      const docRef = doc(firestore, `Students/${branch}/${semester}`, rollNo);
      await deleteDoc(docRef);
      const docRef2 = doc(firestore, "users", docId);
      await deleteDoc(docRef2);
      console.log(`Document with ID ${docId} has been deleted.`);
      return { success: true };
    } catch (error) {
      return { success: false };
      console.error("Error deleting document: ", error);
    }
  };


  // const putData = (title, data) => {
  //   // Your logic for saving data in Firebase
  //   return firebase.firestore().collection("applications").add({
  //     ...data,
  //     title,
  //   });
  // };
  const putData = async (title, data) => {
    try {
      const docRef = doc(firestore, `Applications`, title);
      
      await setDoc(docRef, data);
  
      console.log(`Document successfully written at: Application ${title}`);
      return { success: true, id: title };
    } catch (error) {
      console.error("Error adding document:", error);
      return { success: false, message: error.message };
    }
  };
  
  



  const fetchAllStudents = async (branch, semester) => {
    try {
      console.log("fetching students from branch:", branch, "semester:", semester);
      const studentsCollection = collection(firestore, `Students/${branch}/${semester}`);
      const studentSnapshot = await getDocs(studentsCollection);
      
      const students = studentSnapshot.docs.map((doc) => {
        const studentData = doc.data();
        console.log("studentData",studentData)
        return {
          id: doc.id, // Roll number as document ID
          name: studentData.first_name + " " + studentData.last_name || "N/A",
          email: studentData.Email || "N/A",
          branch: studentData.Branch || "N/A",
          semester: studentData.semester || "N/A",
          phone: studentData.phone || "N/A",
          address: studentData.address || "N/A",
          IsAuthorised: studentData.IsAuthorised,
          uid: studentData.uid || "N/A",
        };
      });
  
      return { success: true, data: students };
    } catch (error) {
      console.error("Error fetching students:", error);
      return { success: false, message: error.message };
    }
  };
  const fetchAllTeacher = async (branch) => {
    try {
      console.log("fetching teachers from branch:", branch);
      const teacherCollection = collection(firestore, "Teachers");
      const q = query(teacherCollection, where("department", "==", branch));
      const teacherSnapshot = await getDocs(q);
  
      const teachers = teacherSnapshot.docs.map((doc) => {
        const teacherData = doc.data();
        return {
          departmentId: teacherData.departmentId,
          department: teacherData.department || "N/A",
          email: teacherData.email || "N/A",
          phone: teacherData.phone || "N/A",
          address: teacherData.address || "N/A",
          IsAuthorised: teacherData.IsAuthorised ?? false,
          uid: teacherData.uid || "N/A",
        };
      });
  
      return { success: true, data: teachers };
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return { success: false, message: error.message };
    }
  };

  const uploadPDF = async (file) => {
    if (!file ) {
    console.log("Uploading file to Cloudinary:");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Polyresource");
    formData.append("folder", "pdf_uploads");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dpciu7mp5/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Cloudinary response:", data);
    return data;
  };
  

  const fetchUnauthorisedStudents = async (branch, semester) => {
    try {
      console.log("fetching students from branch:", branch, "semester:", semester);
      const studentsCollection = collection(firestore, `Students/${branch}/${semester}`);
      const studentsQuery = query(
        studentsCollection,
        where("Branch", "==", branch),
        where("semester", "==", semester),
        where("IsAuthorised", "==", false)
      );
      const studentSnapshot = await getDocs(studentsQuery);
      
      const students = studentSnapshot.docs.map((doc) => {
        const studentData = doc.data();
        console.log("studentData",studentData)
        return {
          id: doc.id,
          name: studentData.first_name + " " + studentData.last_name || "N/A",
          email: studentData.Email || "N/A",
          branch: studentData.Branch || "N/A",
          semester: studentData.semester || "N/A",
          rollNo: studentData.Roll_No || "N/A",
          address: studentData.address || "N/A",
          IsAuthorised: studentData.IsAuthorised,
          uid: studentData.uid || "N/A",
        };
      });
  
      return { success: true, data: students };
    } catch (error) {
      console.error("Error fetching students:", error);
      return { success: false, message: error.message };
    }
  };

  const updateUserData = async (UID, value,Roll_No,branch,semester) => {
    console.log("UID",UID,"value",value,"Roll_No",Roll_No,"branch",branch,"semester",semester);
      try {
        await updateDoc(doc(firestore, "users", UID), { IsAuthorised: value });
        await updateDoc(doc(firestore, `Students/${branch}/${semester}`, Roll_No), { IsAuthorised: value });
        console.log(`Document successfully updated at: users/${UID}`);
        return { success: true, id: UID };
      } catch (error) {
        console.error(`Error updating IsAuthorised`, error.message);
      }
  };
// ............................................................................................................ 
const fetchApplications = async (branch, semester) => {
  try {
    console.log("fetching students from branch:", branch, "semester:", semester);
    const ApplicationCollection = collection(firestore, `Applications`);
    const applicationQuery = query(
      ApplicationCollection,
      where("branch", "==", branch),
      where("semester", "==", semester),
      where("isAccepted", "==", false)
    );
    const applicationSnapshot = await getDocs(applicationQuery);
    
    const application = applicationSnapshot.docs.map((doc) => {
      const applicationData = doc.data();
      console.log("applicationData",applicationData)
      return {
        id: doc.id,
        name: applicationData.name || "N/A",
        email: applicationData.Email || "N/A",
        branch: applicationData.Branch || "N/A",
        semester: applicationData.semester || "N/A",
        rollNo: applicationData.Roll_No || "N/A",
        isAccepted: applicationData.isAccepted||false,
        uid: applicationData.uid || "N/A",
        reason: applicationData.reason || "N/A",
        PDFurl: applicationData.pdfFile || "N/A",
      };
    });

    return { success: true, data: application };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { success: false, message: error.message };
  }
};

const AcceptApplication = async (UID,name,value) => {
    try {
      // await updateDoc(doc(firestore, "Applications", UID), { isAccepted: value });
      await updateDoc(doc(firestore, `Applications`, name), { isAccepted: value });
      console.log(`Document successfully updated at: Application/${name}/${UID}`);
      return { success: true, id: UID };
    } catch (error) {
      console.error(`Error updating IsAuthorised`, error.message);
    }
};

const deleteApplicationData = async (uid,name) => {
  try {
    const docRef = doc(firestore, `Applications`, name);
    await deleteDoc(docRef);
    console.log(`Document with ID ${uid} has been deleted.`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};


// ............................................................................................................

  const fetchSingleStudent = async (branch, semester, studentId) => {
    try {
      const studentRef = doc(firestore, `Students/${branch}/${semester}/${studentId}`);
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
          uid: studentData.uid || "N/A",
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
      return { success: false, message:error.message };
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
        updateUserData,
        putData,
        putStudentData,
        putTeacherData,
        fetchAllStudents,
        fetchAllTeacher,
        fetchUnauthorisedStudents,
        // deleteUserAccount,
        uploadPDF,
        deleteUserData,
        fetchUserData,
        fetchStudentData,
        fetchSingleStudent,
        AcceptApplication,
        deleteApplicationData,
        // ............................................
        fetchApplications,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

// src/getUserRole.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjusted import path

export const getUserRole = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      throw new Error("No user data found");
    }
  } catch (error) {
    console.error("❌ Error fetching user role:", error.message);
    throw error;
  }
};

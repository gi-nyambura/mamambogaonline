// src/registerUserWithRole.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjusted import path

export const registerUserWithRole = async (email, password, role, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Create user document in Firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      name,
      role,
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Registered as ${role}`);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Error registering:", error.message);
    throw error;
  }
};

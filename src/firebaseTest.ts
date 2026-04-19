import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function testFirebaseConnection() {
  try {
    // Test adding a document to Firestore
    const docRef = await addDoc(collection(db, "orders"), {
      name: "Test User",
      total: 1000,
      status: "pending",
      createdAt: new Date()
    });

    console.log("✅ Firebase connected successfully!");
    console.log("✅ Document written with ID:", docRef.id);
    alert("Firebase connected successfully! Document ID: " + docRef.id);
    return true;
  } catch (error) {
    console.error("❌ Firebase connection error:", error);
    alert("Firebase connection failed. Check console for details.");
    return false;
  }
}

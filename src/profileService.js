import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveUserProfile = async (user) => {
  await setDoc(
    doc(db, "users", user.uid),
    {
      name: user.displayName || "User",
      email: user.email || "",
      phone: user.phoneNumber || "",
    },
    { merge: true }
  );
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }

  return null;
};

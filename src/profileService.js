import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";

const PROFILE_STORAGE_KEY = "local-user-profile";

const getStoredProfile = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveStoredProfile = (profile) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage errors
  }
};

export const saveUserProfile = async (user) => {
  const profile = {
    name: user.displayName || user.name || "User",
    email: user.email || "",
    phone: user.phoneNumber || user.phone || "",
  };

  saveStoredProfile(profile);

  try {
    await setDoc(doc(db, "users", user.uid), profile, { merge: true });
  } catch (error) {
    console.warn("Unable to save profile to Firestore:", error);
  }

  return profile;
};

export const getUserProfile = async (uid) => {
  const fallbackProfile = getStoredProfile() ||
    (auth.currentUser
      ? {
          name: auth.currentUser.displayName || "User",
          email: auth.currentUser.email || "",
          phone: auth.currentUser.phoneNumber || "",
        }
      : null);

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }
  } catch (error) {
    console.warn("Unable to load profile from Firestore:", error);
  }

  return fallbackProfile;
};

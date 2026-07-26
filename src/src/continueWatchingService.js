import {
  doc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export const saveContinueWatching = async (userId, movie) => {
  await setDoc(
    doc(db, "users", userId, "continueWatching", String(movie.id)),
    {
      movieId: movie.id,
      title: movie.title,
      image: movie.image || movie.img || "",
      progress: movie.progress || 0,
      currentTime: movie.currentTime || 0,
      duration: movie.duration || 0,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getContinueWatching = async (userId) => {
  const snapshot = await getDocs(
    collection(db, "users", userId, "continueWatching")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

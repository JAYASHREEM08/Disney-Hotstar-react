import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase/firebase";

export const addToWatchHistory = async (userId, movie) => {
  await addDoc(
    collection(db, "users", userId, "watchHistory"),
    {
      movieId: movie.id,
      title: movie.title,
      thumbnail: movie.thumbnail || movie.img || "",
      watchedAt: serverTimestamp(),
    }
  );
};

export const getWatchHistory = async (userId) => {
  const snapshot = await getDocs(
    collection(db, "users", userId, "watchHistory")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

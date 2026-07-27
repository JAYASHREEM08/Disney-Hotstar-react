import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase/firebase";

const GUEST_MY_LIST_KEY = "guestMyList";

const readGuestMyList = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(GUEST_MY_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading guest My List:", error);
    return [];
  }
};

const writeGuestMyList = (movies) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(GUEST_MY_LIST_KEY, JSON.stringify(movies));
};

// ADD MOVIE TO MY LIST
export const addToMyList = async (userId, movie) => {
  if (!userId) {
    const currentList = readGuestMyList();
    const alreadyExists = currentList.some((item) => String(item.id) === String(movie.id));

    if (!alreadyExists) {
      const updatedList = [...currentList, movie];
      writeGuestMyList(updatedList);
    }

    return;
  }

  try {
    await setDoc(
      doc(db, "users", userId, "myList", String(movie.id)),
      movie
    );

    console.log("Movie added to My List");
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// REMOVE MOVIE FROM MY LIST
export const removeFromMyList = async (userId, movieId) => {
  if (!userId) {
    const currentList = readGuestMyList();
    const updatedList = currentList.filter((item) => String(item.id) !== String(movieId));
    writeGuestMyList(updatedList);
    return;
  }

  try {
    await deleteDoc(
      doc(db, "users", userId, "myList", String(movieId))
    );

    console.log("Movie removed from My List");
  } catch (error) {
    console.error("Error removing movie:", error);
  }
};

// GET MY LIST MOVIES
export const getMyList = async (userId) => {
  if (!userId) {
    return readGuestMyList();
  }

  try {
    const snapshot = await getDocs(
      collection(db, "users", userId, "myList")
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching My List:", error);
    return [];
  }
};
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA22UGx4ewsgGRkBtZjm2Tx4qboUo2cMY",
  authDomain: "restaurant-res-mng.firebaseapp.com",
  projectId: "restaurant-res-mng",
  storageBucket: "restaurant-res-mng.appspot.com",
  messagingSenderId: "200722440320",
  appId: "1:200722440320:web:1dbcfdd17b602d42d00665",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const updateUserProps = async (currentUser, toUpdate) => {
  if (!currentUser) return;

  const userRef = firestore.doc(`users/${currentUser.id}`);
  const snapShot = await userRef.get();

  if (snapShot.exists) {
    try {
      await userRef.set({
        ...currentUser,
        ...toUpdate,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getTables = async (currentUser) => {
  let tables = [];
  if (!currentUser) return;
  const tablesFirestore = await getDocs(
    collection(firestore, `users/${currentUser.id}/tables`)
  );
  tablesFirestore.forEach((table) => {
    tables = [...tables, { id: table.id, ...table.data() }];
  });
  return tables;
};

export const persistTables = async (currentUser, tables) => {
  if (!currentUser) return;
  const tablesFirestore = await getDocs(
    collection(firestore, `users/${currentUser.id}/tables`)
  );
  tablesFirestore.forEach((table) => {
    deleteDoc(table.ref);
  });
  tables.forEach((table) => {
    const { id, ...other } = table;
    const ref = doc(firestore, "users", `${currentUser.id}`, "tables", `${id}`);
    setDoc(ref, other);
  });
};

export const getReservations = async (currentUser) => {
  let reservations = [];
  if (!currentUser) return;
  const reservationsFirebase = await getDocs(
    collection(firestore, `users/${currentUser.id}/reservations`)
  );
  reservationsFirebase.forEach((reservation) => {
    reservations = [
      ...reservations,
      { id: reservation.id, ...reservation.data() },
    ];
  });
  return reservations;
};

export const persistReservations = async (currentUser, reservations) => {
  if (!currentUser) return;
  const reservationsFirebase = await getDocs(
    collection(firestore, `users/${currentUser.id}/reservations`)
  );
  reservationsFirebase.forEach((reservation) => {
    deleteDoc(reservation.ref);
  });
  reservations.forEach((reservation) => {
    const { id, ...other } = reservation;
    const ref = doc(
      firestore,
      "users",
      `${currentUser.id}`,
      "reservations",
      `${id}`
    );
    setDoc(ref, other);
  });
};

export default firebase;

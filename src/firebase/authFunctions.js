import { useState, useEffect, useNavigate } from "react";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useAuthCheck = (navigate) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const user = auth.currentUser;
        if (user) {
          console.log(user, "User logged in");
          setIsLoading(false);
          navigate("/");
        } else {
          navigate("/signin");
          setIsLoading(false);
          console.log("Not logged in");
        }
      }, 1000);
    };
    fetchData();
  }, [navigate]);

  return isLoading;
};

export const logup = async (email, password, navigate) => {
  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created with email and password", userCredential);

    // Get the current user
    const user = auth.currentUser;
    const userEmail = user.email;

    // Sign in the created user
    await signInWithEmailAndPassword(auth, userEmail, password);
    console.log("User created and signed in:", user);

    navigate("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert(errorCode);
  }
};

export const login = async (email, password, navigate) => {
  console.log("control reached");
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = auth.currentUser;
    console.log("User signed in:", user);
    navigate("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    alert(errorCode);
  }
};

export const logout = async (navigate) => {
  console.log("control reached");
  await auth.signOut();
  console.log("User logged out");
  navigate("/signin");
};

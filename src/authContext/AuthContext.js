import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig/FirebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = db.collection("users").doc(user.uid);
          const unsubscribeUserData = userDocRef.onSnapshot((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
              setUser(user);
            }
          });

          return () => unsubscribeUserData();
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = userCredential;

      await db.collection("users").doc(user.uid).set({
        email,
        name: "Business Name",
        number: 9876543210,
        uid: user.uid,
        maxItems: 96,
        userType: "user",
        address: "Business Address",
        tandc: "Terms and conditions",
        createdAt: new Date(),
      });

      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserData(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userData, login, signup, logout, loading }}
    >
      {loading && (
        <div className="flone-preloader-wrapper">
          <div className="flone-preloader">
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

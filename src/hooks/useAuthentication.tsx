import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth"
import { useEffect, useState } from "react"
import { IUser } from "../interfaces/User";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);


  console.log(db);

  const auth = getAuth();

  //clear na memória
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data: IUser) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )

      await updateProfile(user, { displayName: data.name })

      return user;

    } catch (error: any) {

      let translateError = "";
      if (error.message.includes("Password")) {
        translateError = "A senha precisa ter no mínimo 6 caracteres"
      }
      if (error.message.includes("email-already")) {
        translateError = "O usuário já existe"
      }

      setError(translateError);
    }
    finally {
      setLoading(false);
    }
  }

  //login
  const login = async (data: IUser) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password)

    } catch (error: any) {
      setError("Usuário ou senha inválido!")
    }
    finally {
      setLoading(false);
    }
  }

  //logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  //limpar memória
  useEffect(() => {
    return () => setCancelled(true);
  }, []);


  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
}
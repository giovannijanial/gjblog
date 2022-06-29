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

    //limpar memória
    useEffect(() => {
      return () => setCancelled(true);
    }, [])

    setLoading(false);
  }
  return {
    auth,
    createUser,
    error,
    loading
  }
}
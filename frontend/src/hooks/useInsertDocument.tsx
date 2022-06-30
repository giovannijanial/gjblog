import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useReducer, useState } from "react";

interface IInsertDocument {
  error: Error | null,
  loading: boolean,
}

const initialState = {
  error: null,
  loading: false,
}

const insertReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }
    case "LOADDED":
    case "ERROR":
    default:
  }

}

export const useInsertDocument = (docCollection: any) => {
  const [response, dispatch] = useReducer(insertReducer, initialState)

  //vazamento de memoria
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action: any) => {
    if (!cancelled) {
      dispatch(action)
    }
  }

  const insertDocument = async (document: any) => {
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancelBeforeDispatch({
        type: "",
        payload: insertDocument,
      })

    } catch (error) {

    }
  }
}
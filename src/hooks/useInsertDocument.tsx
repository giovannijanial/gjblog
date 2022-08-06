import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { IPost } from "../interfaces/Post";

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
      return { loading: false, error: null }
    case "ERROR":
      return { loading: false, error: action.payload }
    default:
      return state
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
  const insertDocument = async (document: IPost) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    })

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }



      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancelBeforeDispatch({
        type: "LOADDED",
        payload: insertedDocument,
      })

    } catch (error: Error | any) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message
      })
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])


  return { insertDocument, response }
}
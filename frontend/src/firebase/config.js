import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDhjZorhEvUZs4vD8eDQ7ZE6ZW824Nzl-8",
	authDomain: "gjblog-afb07.firebaseapp.com",
	projectId: "gjblog-afb07",
	storageBucket: "gjblog-afb07.appspot.com",
	messagingSenderId: "389894952077",
	appId: "1:389894952077:web:75cce897d53b8b9a51bec4",
};

const app = initializeApp(firebaseConfig);

const db = getFireStore();

export { db };

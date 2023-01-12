import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAweowBgU-D7ENJXKWy3tMwmrHbOVVYuec",
  authDomain: "task-tracker-morrisseybr.firebaseapp.com",
  projectId: "task-tracker-morrisseybr",
  storageBucket: "task-tracker-morrisseybr.appspot.com",
  messagingSenderId: "367914644617",
  appId: "1:367914644617:web:b202e0ba51b14c17c78258",
  measurementId: "G-50T97TL37H",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

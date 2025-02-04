import { useEffect } from "react";
import { app } from "@/firebaseConfig";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("Firebase app initialized:", app);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

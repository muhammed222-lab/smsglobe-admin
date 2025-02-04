import { useEffect } from "react";

const Custom404 = () => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Firebase initialization here
      }
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }, []);

  return <h1>404 - Page Not Found</h1>;
};

export default Custom404;

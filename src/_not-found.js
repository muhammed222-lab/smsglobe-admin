import dynamic from "next/dynamic";

// Dynamically import Firebase to avoid loading during static build
const FirebaseComponent = dynamic(() => import("./firebaseConfig"), {
  ssr: false,
});

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <FirebaseComponent />
    </div>
  );
}

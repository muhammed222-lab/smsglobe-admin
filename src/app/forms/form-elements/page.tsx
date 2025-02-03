"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export default function FormElementsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#000000");
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const docRef = doc(db, "in-app-msg", "latest");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMessage(docSnap.data().message);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "in-app-msg", "latest");
      await setDoc(docRef, {
        message: editorRef.current?.innerHTML || "",
        date: serverTimestamp(),
      });
      alert("Message updated successfully!");
      setIsDirty(false);
    } catch (error) {
      console.error("Error updating message:", error);
      alert("Failed to update message.");
    }
  };

  const applyStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    setIsDirty(true);
  };

  const handleInput = () => {
    setIsDirty(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Breadcrumb pageName="Form Elements" />
      <div className="mb-4 flex items-center justify-end">
        <span
          className={`h-3 w-3 rounded-full ${
            isDirty ? "bg-red-500" : "bg-green-500"
          }`}
          title={isDirty ? "Unsaved changes" : "Data up-to-date"}
        ></span>
        <span className="ml-2">
          {isDirty ? "Unsaved changes" : "Data up-to-date"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
        <div className="flex flex-col gap-9"></div>
        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Textarea Fields" className="space-y-6 !p-6.5">
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => applyStyle("bold")}
                className="rounded bg-gray-200 p-2"
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                onClick={() => applyStyle("italic")}
                className="rounded bg-gray-200 p-2"
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                onClick={() => applyStyle("fontSize", "7")}
                className="rounded bg-gray-200 p-2"
                title="H1"
              >
                H1
              </button>
              <button
                onClick={() => applyStyle("fontSize", "6")}
                className="rounded bg-gray-200 p-2"
                title="H2"
              >
                H2
              </button>
              <button
                onClick={() => applyStyle("fontSize", "5")}
                className="rounded bg-gray-200 p-2"
                title="H3"
              >
                H3
              </button>
              <button
                onClick={() => applyStyle("fontSize", "4")}
                className="rounded bg-gray-200 p-2"
                title="H4"
              >
                H4
              </button>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="rounded bg-gray-200 p-2"
                title="Text Color"
              />
              <button
                onClick={() => applyStyle("foreColor", color)}
                className="rounded bg-gray-200 p-2"
                title="Apply Color"
              >
                <span style={{ color }}>A</span>
              </button>
            </div>
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[200px] rounded border p-4"
              dangerouslySetInnerHTML={{ __html: message }}
              onInput={handleInput}
            ></div>
            <button
              onClick={handleUpdate}
              className="rounded-md bg-green-600 p-2 text-white"
            >
              Update In-App Message
            </button>
          </ShowcaseSection>
        </div>
      </div>
    </>
  );
}

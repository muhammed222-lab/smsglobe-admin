import { useState, useRef, useEffect } from "react";
import { sendEmailVerification } from "@/firebaseConfig";
import { RadioGroup } from "@headlessui/react";

type VerificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const VerificationModal = ({ isOpen, onClose }: VerificationModalProps) => {
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [isOpen]);

  const handleEmailSubmit = async () => {
    // Send email verification
    await sendEmailVerification(email);
    setIsScanning(true);
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Verify Your Identity</h2>
        {!isScanning ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleEmailSubmit}
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Send Verification Code
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <video
                ref={videoRef}
                className="h-48 w-48 rounded-full border-4 border-dashed border-gray-300"
              ></video>
              <p className="mt-2 text-sm text-gray-500">Scanning...</p>
            </div>
            <RadioGroup value={selectedUser} onChange={setSelectedUser}>
              <RadioGroup.Label className="sr-only">
                Confirm who you are
              </RadioGroup.Label>
              <div className="space-y-2">
                <RadioGroup.Option value="Muhammed Olayemi (Developer)">
                  {({ checked }) => (
                    <span
                      className={`block cursor-pointer rounded-md px-4 py-2 ${
                        checked ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Muhammed Olayemi (Developer)
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="Ogunlade Micheal (CEO)">
                  {({ checked }) => (
                    <span
                      className={`block cursor-pointer rounded-md px-4 py-2 ${
                        checked ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Ogunlade Micheal (CEO)
                    </span>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
            <button
              onClick={() => {
                alert("Access granted for 5 minutes");
                onClose();
              }}
              className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;

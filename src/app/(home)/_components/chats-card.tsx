"use client";
import { useEffect, useState } from "react";
import { DotIcon } from "@/assets/icons";
import { formatMessageTime } from "@/lib/format-message-time";
import { getChatsData } from "../fetch";
import Modal from "./Modal"; // Assuming you have a Modal component

const ChatsCard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const chatsData = await getChatsData();
      console.log("Fetched chats data in component:", chatsData);
      setData(chatsData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Rendering chats data:", data);

  const handleFeedbackClick = (feedback: any) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Feedbacks
      </h2>

      <ul>
        {data.map((feedback, key) => (
          <li key={key}>
            <button
              onClick={() => handleFeedbackClick(feedback)}
              className="flex items-center gap-4.5 px-7.5 py-3 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-2 dark:focus-visible:bg-dark-2"
            >
              <div className="relative shrink-0">
                <div className="flex size-14 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
                  {feedback.user_name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
              </div>

              <div className="relative flex-grow">
                <h3 className="font-medium text-dark dark:text-white">
                  {feedback.user_name}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium dark:text-dark-5 xl:max-w-[8rem]">
                    {feedback.feedback}
                  </span>

                  <DotIcon />

                  <time className="text-xs" dateTime={feedback.date}>
                    {formatMessageTime(feedback.date)}
                  </time>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selectedFeedback && (
        <Modal onClose={handleCloseModal}>
          <div className="p-4">
            <h3 className="text-lg font-medium text-dark dark:text-white">
              {selectedFeedback.user_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedFeedback.email}
            </p>
            <p className="mt-2 text-base text-dark dark:text-white">
              {selectedFeedback.feedback}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 rounded bg-primary px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChatsCard;

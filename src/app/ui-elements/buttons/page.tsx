"use client";
import { useState } from "react";
import { MessageOutlineIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import VerificationModal from "./VerificationModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Breadcrumb pageName="Action Center" />

      <div className="space-y-10">
        <ShowcaseSection title="Stop Flutterwave Payment Server">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Button
              label="Stop Flutterwave Payment from going through"
              variant="primary"
              className="bg-red-dark"
              onClick={handleButtonClick}
            />
            <small>
              <span className="text-red-800">Note:</span> When you stop this, no
              Flutterwave payment will be accepted. This includes bank
              transfers, card payments, and USSD payments. Additionally, users
              won&lsquo;t be able to withdraw their referral commission. Please
              ensure that this is the desired action before.
            </small>
          </div>
        </ShowcaseSection>
        <ShowcaseSection title="Stop Crypto Payment Server">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Button
              label="Stop Crypto Server from running"
              variant="primary"
              className="bg-red-dark"
              onClick={handleButtonClick}
            />
            <small>
              <span className="text-red-800">Note:</span> No Crypto payment will
              be processed when this stops. This action will halt all ongoing
              and future crypto transactions until the server is restarted.
              Please ensure that this is the desired action before proceeding,
              as it may affect users attempting to make payments.
            </small>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Stop Referral Processes">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5">
            <Button
              label="Stop all Referral Operations"
              variant="outlineDark"
              size="small"
              icon={<MessageOutlineIcon />}
              className="bg-red-dark"
              onClick={handleButtonClick}
            />
            <small>
              <span className="text-red-800">Note:</span> Stopping referral
              processes will prevent any new referral operations from being
              recorded or processed. This includes tracking new referrals,
              updating referral statuses, and processing referral commissions.
              Ensure this is the intended action as it may impact users relying
              on referral benefits.
            </small>
          </div>
        </ShowcaseSection>
      </div>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

import React, { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white rounded-[18px]">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl text-center font-bold leading-[42px]")}>
            {title}
          </h1>
          {children}
          <button
            className="bg-blue-1 p-3 rounded-[12px] focus-visible:ring-0 focus-visible:ring-offset-0 flex justify-center items-center gap-1"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="Button Icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Start An Instant Meeting"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;

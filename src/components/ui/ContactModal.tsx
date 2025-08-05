"use client";

import React from "react";
import { Whatsapp, Call } from "@/components/icons/SvgIcons";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}const ContactModal = ({ isOpen }: ContactModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 contact-modal">
      <div className="">
        <button className="w-full px-4 py-3 text-left hover:bg-[#0063BF1A] hover:rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center ">
            <Whatsapp width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Whatsapp</span>
        </button>
        <button className="w-full px-4 py-3 text-left hover:bg-[#0063BF1A] hover:rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center ">
            <Call width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Call</span>
        </button>
      </div>
    </div>
  );
};

export default ContactModal;

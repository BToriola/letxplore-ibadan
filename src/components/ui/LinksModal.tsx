"use client";

import React from "react";
import { Instagram, Facebook, Website } from "@/components/icons/SvgIcons";
import { Post } from "@/services/api";

interface LinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Post;
}

const LinksModal = ({ isOpen, onClose, event }: LinksModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 links-modal">
      <div className="">
        <a
          href={event?.social_ig || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-3 text-left hover:bg-[#0063BF1A] hover:rounded-lg flex items-center gap-3"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center ">
            <Instagram width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Instagram</span>
        </a>
        <a
          href={event?.social_fb || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-3 text-left hover:bg-[#0063BF1A] hover:rounded-lg flex items-center gap-3"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center ">
            <Facebook width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Facebook</span>
        </a>
        <a
          href={event?.website || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-3 text-left hover:bg-[#0063BF1A] hover:rounded-lg flex items-center gap-3"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center ">
            <Website width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Website</span>
        </a>
      </div>
    </div>
  );
};

export default LinksModal;
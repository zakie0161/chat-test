// components/Modal.tsx
import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  isFullWidth?: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, isFullWidth, setIsOpen, title, children }) => {

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close the modal if clicked outside
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Return null if modal is closed (for performance reasons)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`rounded-lg shadow-lg ${isFullWidth? 'p-8' : 'max-w-2xl'} w-full`}>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

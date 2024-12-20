"use client";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();
  const closeButtonRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Piéger le focus dans la modale
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKey = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleTabKey);
      document.addEventListener("keydown", handleEscapeKey);

      // Focus initial sur le bouton de fermeture
      closeButtonRef.current.focus();

      return () => {
        document.removeEventListener("keydown", handleTabKey);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
      role="dialog"
      aria-labelledby="Contact et horaires"
      aria-describedby="Le numéro de téléphone de contact et les horaires d'ouverture"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="rounded bg-white p-10 text-center shadow-lg">
        {title && (
          <h2 id="modal-title" className="mb-4 text-lg font-semibold">
            {title}
          </h2>
        )}
        <div id="modal-description" className="mb-4" role="document">
          {children || "Informations supplémentaires."}
        </div>
        <button
          onClick={onClose}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          ref={closeButtonRef}
          aria-label="Fermer la modale"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;

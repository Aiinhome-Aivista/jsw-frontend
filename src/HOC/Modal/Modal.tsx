import React, { useEffect, ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  // Modal visibility
  isOpen: boolean;
  onClose: () => void;
  
  // Header props
  title?: string;
  description?: string;
  
  // Container props
  width?: string;
  maxHeight?: string;
  
  // Heat number badge
  showHeatNumber?: boolean;
  heatNumber?: string;
  heatNumberLabel?: string;
  
  // Destination selection
  showDestination?: boolean;
  destinations?: string[];
  selectedDestination?: string;
  onDestinationChange?: (destination: string) => void;
  
  // Custom content
  children?: ReactNode;
  
  // Button props
  showButtons?: boolean;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  submitButtonVariant?: 'primary' | 'secondary';
  
  // Additional options
  zIndex?: number;
  showCloseButton?: boolean;
  
  // Custom className
  modalClassName?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  // Modal visibility
  isOpen,
  onClose,
  
  // Header props
  title,
  description,
  
  // Container props
  width = '380px',
  maxHeight,
  
  // Heat number badge
  showHeatNumber = false,
  heatNumber,
  heatNumberLabel = 'Heat Number',
  
  // Destination selection
  showDestination = false,
  destinations = [],
  selectedDestination,
  onDestinationChange,
  
  // Custom content
  children,
  
  // Button props
  showButtons = true,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitButtonVariant = 'primary',
  
  // Additional options
  zIndex = 100,
  showCloseButton = true,
  
  // Custom className
  modalClassName = '',
  contentClassName = '',
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay"
      style={{ zIndex }}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className={`modal-container ${modalClassName}`}
        style={{ 
          width,
          maxHeight: maxHeight || 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            <div>
              {title && (
                <h2 id="modal-title" className="modal-title">
                  {title}
                </h2>
              )}
              {description && (
                <p className="modal-description">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button 
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`modal-content ${contentClassName}`}>
          {/* Heat Number Badge */}
          {showHeatNumber && (
            <div className="heat-number-badge">
              <span className="heat-number-label">{heatNumberLabel}</span>
              <span className="heat-number-value">
                {heatNumber || "1211J0001"}
              </span>
            </div>
          )}

          {/* Destination Selection */}
          {showDestination && destinations.length > 0 && (
            <div className="destination-selection">
              <label className="destination-label">Destination</label>
              <div className="destination-options">
                {destinations.map((dest, index) => (
                  <label 
                    key={index} 
                    className="destination-option"
                  >
                    <div className="radio-container">
                      <input
                        type="radio"
                        name="destination"
                        checked={selectedDestination === dest}
                        onChange={() => onDestinationChange && onDestinationChange(dest)}
                      />
                      <div 
                        className={`radio-circle ${selectedDestination === dest ? 'checked' : ''}`}
                      >
                        {selectedDestination === dest && <div className="radio-dot" />}
                      </div>
                    </div>
                    <span className="destination-text">{dest}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Custom Children */}
          {children}
        </div>

        {/* Footer with Buttons */}
        {showButtons && (
          <div className="modal-footer">
            <button
              onClick={onClose}
              className="modal-button modal-button-cancel"
            >
              {cancelText}
            </button>
            {onSubmit && (
              <button
                onClick={onSubmit}
                className={`modal-button modal-button-submit ${submitButtonVariant === 'secondary' ? 'modal-button-secondary' : 'modal-button-primary'}`}
              >
                {submitText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;


import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RotateCcw, Edit2 } from 'lucide-react';

interface LadleLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputField {
  label: string;
  type: string;
  value: string;
  icon?: React.ReactNode;
}

const LadleLifeModal: React.FC<LadleLifeModalProps> = ({ isOpen, onClose }) => {
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

  const inputFields: InputField[] = [
    { label: "Ladle no.", type: "select", value: "L01" },
    { label: "Heat No", type: "text", value: "2602J0001", icon: <RotateCcw size={16} /> },
    { label: "Grade", type: "text", value: "12", icon: <RotateCcw size={16} /> },
    { label: "Teeming Ladle life", type: "text", value: "10", icon: <RotateCcw size={16} /> },
    { label: "Inner nozzle life", type: "text", value: "10", icon: <RotateCcw size={16} /> },
    { label: "Outer nozzle life", type: "text", value: "4", icon: <RotateCcw size={16} /> },
    { label: "Porous plug life", type: "text", value: "3", icon: <RotateCcw size={16} /> },
    { label: "Life of slide gate plate", type: "text", value: "12", icon: <RotateCcw size={16} /> },
    { label: "Bore of Inner nozzle (mm)", type: "text", value: "12", icon: <Edit2 size={16} /> },
    { label: "Bore of slide gate plate (mm)", type: "text", value: "#123", icon: <Edit2 size={16} /> },
    { label: "TDE spring no.", type: "text", value: "#123", icon: <Edit2 size={16} /> },
    { label: "TDE spring life", type: "text", value: "5", icon: <RotateCcw size={16} /> },
  ];

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-container" style={{ width: '900px', maxHeight: '90vh' }} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="modal-header" style={{ padding: '24px 32px', paddingBottom: '16px' }}>
          <div>
            <h2 id="modal-title" className="modal-title" style={{ fontSize: '24px' }}>
              Ladle life register
            </h2>
          </div>
          <button 
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="modal-content" style={{ padding: '0 32px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 20px' }}>
            {inputFields.map((field, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>{field.label}</label>
                <div style={{ position: 'relative' }}>
                  {field.type === "select" ? (
                    <select style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f7f7f7', appearance: 'none', outline: 'none', fontSize: '14px', color: '#1e293b' }}>
                      <option>{field.value}</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f7f7f7' }}>
                      <input
                        type="text"
                        defaultValue={field.value}
                        style={{ flex: 1, padding: '10px', background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: '#1e293b' }}
                      />
                      <span style={{ padding: '0 12px', color: '#94a3b8', cursor: 'pointer' }}>
                        {field.icon}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Radio/Status Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Gap between slide gate plate</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="gap" defaultChecked style={{ width: '20px', height: '20px', accentColor: '#D98E2B' }} />
                  <span style={{ color: '#1f2937' }}>Ok</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="gap" style={{ width: '20px', height: '20px', accentColor: '#D98E2B' }} />
                  <span style={{ color: '#1f2937' }}>Not Ok</span>
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Machine operation</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="operation" defaultChecked style={{ width: '20px', height: '20px', accentColor: '#D98E2B' }} />
                  <span style={{ color: '#1f2937' }}>Ok</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="operation" style={{ width: '20px', height: '20px', accentColor: '#D98E2B' }} />
                  <span style={{ color: '#1f2937' }}>Not Ok</span>
                </label>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Remarks</label>
            <textarea
              placeholder="Enter any additional remarks"
              style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', minHeight: '100px', outline: 'none', fontSize: '14px', resize: 'none' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ padding: '24px 32px', justifyContent: 'space-between' }}>
          <button style={{ background: 'none', border: 'none', color: '#D98E2B', fontSize: '18px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>
            Ladle Life Calculator
          </button>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={onClose}
              className="modal-button modal-button-cancel"
              style={{ padding: '10px 32px', fontSize: '16px' }}
            >
              Cancel
            </button>
            <button
              className="modal-button modal-button-primary"
              style={{ padding: '10px 32px', fontSize: '16px' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LadleLifeModal;


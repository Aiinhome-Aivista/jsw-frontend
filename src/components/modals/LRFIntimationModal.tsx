import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface LRFIntimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const LRFIntimationModal: React.FC<LRFIntimationModalProps> = ({ isOpen, onClose, onSubmit }) => {
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

  const destinations = ["CCS1", "CCS4", "LRF 2", "Ingot", "VD"];

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-container" style={{ width: '700px', maxHeight: '90vh' }} role="dialog" aria-modal="true">
        {/* Header Section */}
        <div className="modal-header" style={{ padding: '32px 32px 16px' }}>
          <div>
            <h2 id="modal-title" className="modal-title" style={{ fontSize: '30px' }}>
              Lrf Intimation Slip
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

        {/* Form Body */}
        <div className="modal-content" style={{ padding: '0 32px 32px' }}>
          
          {/* Row 1: Shop, Date, Heat no. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Shop</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', appearance: 'none', outline: 'none', fontSize: '14px', color: '#1e293b' }}>
                  <option>SMS 1</option>
                </select>
                <ChevronDown style={{ position: 'absolute', right: '12px', top: '14px', color: '#94a3b8', pointerEvents: 'none' }} size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Date</label>
              <input type="text" defaultValue="25th jan, 2025" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Heat no.</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', appearance: 'none', outline: 'none', fontSize: '14px', color: '#1e293b' }}>
                  <option>2602J0001</option>
                </select>
                <ChevronDown style={{ position: 'absolute', right: '12px', top: '14px', color: '#94a3b8', pointerEvents: 'none' }} size={18} />
              </div>
            </div>
          </div>

          {/* Row 2: Series, Grade, Lifting Temp */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Series</label>
              <input type="text" defaultValue="Dummy" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Grade</label>
              <input type="text" defaultValue="SS304" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Lifting temperature °C</label>
              <input type="text" defaultValue="1230" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
          </div>

          {/* Row 3: LM Weight, Ladle no, Ladle life */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>LM weight (MT)</label>
              <input type="text" placeholder="Enter weight here" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Ladle no.</label>
              <input type="text" defaultValue="Ladle 1" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Ladle life</label>
              <input type="text" defaultValue="12" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
          </div>

          {/* Row 4: NFC Name, Addition */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>NFC Name</label>
              <input type="text" placeholder="Enter NFC" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Addition (kg)</label>
              <input type="text" defaultValue="1000" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#F3F6F9', outline: 'none', fontSize: '14px', color: '#1e293b' }} />
            </div>
          </div>

          {/* Destination Radio Group */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', display: 'block', marginBottom: '12px' }}>Destination</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              {destinations.map((dest, idx) => (
                <label key={dest} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="destination" 
                    defaultChecked={idx === 0}
                    style={{ width: '20px', height: '20px', accentColor: '#D98E2B' }} 
                  />
                  <span style={{ color: '#1f2937', fontWeight: '500' }}>{dest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', display: 'block', marginBottom: '8px' }}>Remarks</label>
            <textarea 
              placeholder="Enter any additional remarks"
              style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', minHeight: '120px', outline: 'none', fontSize: '14px', resize: 'none' }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer" style={{ padding: '24px 32px' }}>
          <button
            onClick={onClose}
            className="modal-button modal-button-cancel"
            style={{ padding: '12px 40px', fontSize: '16px' }}
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            className="modal-button modal-button-primary"
            style={{ padding: '12px 40px', fontSize: '16px' }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LRFIntimationModal;


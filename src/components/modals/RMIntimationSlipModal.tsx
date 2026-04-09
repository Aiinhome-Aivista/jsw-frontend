import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../css/RMIntimationSlipModal.css';

interface RMItem {
  id: number;
  itemCode: string;
  description: string;
  remarks: string;
  qtyRequired: number;
  qtyIssued: number;
  truckNo: string;
}

interface RMIntimationSlipModalProps {
  onClose: () => void;
}

const RMIntimationSlipModal: React.FC<RMIntimationSlipModalProps> = ({ onClose }) => {
  const [items, setItems] = useState<RMItem[]>([
    { id: 1, itemCode: 'Code', description: 'Description', remarks: 'Dummy', qtyRequired: 0, qtyIssued: 0, truckNo: 'DL3282A28' },
    { id: 2, itemCode: 'Code', description: 'Description', remarks: 'Dummy', qtyRequired: 0, qtyIssued: 0, truckNo: 'HR6785245' }
  ]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddItem = () => {
    const newItem: RMItem = {
      id: items.length + 1,
      itemCode: 'Code',
      description: 'Description',
      remarks: 'Dummy',
      qtyRequired: 0,
      qtyIssued: 0,
      truckNo: ''
    };
    setItems([...items, newItem]);
  };

  const handleConfirm = () => {
    alert("Issue Slip confirmed successfully.");
  };

  const modalContent = (
    <div className="rm-modal-overlay">
      <div className="rm-modal-card">
        
        {/* LEFT SIDEBAR - UNTOUCHED */}
        <aside className="rm-sidebar">
          <h2 className="rm-sidebar-title">Intimation Slip #123</h2>
          
          <div className="rm-sidebar-form-grid">
            <div className="rm-field">
              <label>Shop</label>
              <div className="rm-input-box">SMS 1</div>
            </div>
            <div className="rm-field">
              <label>Series</label>
              <div className="rm-input-box">456789</div>
            </div>
            <div className="rm-field">
              <label>Grade</label>
              <div className="rm-input-box">304</div>
            </div>
            <div className="rm-field">
              <label>Shift</label>
              <div className="rm-input-box">3rd Shift (10PM - 6AM)</div>
            </div>
            <div className="rm-field">
              <label>SMS charging supervisor</label>
              <div className="rm-input-box">AK Ghosh</div>
            </div>
          </div>

          <div className="rm-requisition-section">
            <h3 className="rm-section-title">Material Requisitioned</h3>
            <div className="rm-requisition-card">
              <table className="rm-sidebar-table">
                <thead>
                  <tr>
                    <th style={{color:'#334155',fontWeight:600}}>Material Name</th>
                    <th style={{color:'#334155',fontWeight:600}} className="text-right">Vehicle No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{color:'#334155',fontWeight:500}}>SAF Metal</td><td  style={{color:'#334155',fontWeight:500}} className="text-right">KL09GH2958</td></tr>
                  <tr><td style={{color:'#334155',fontWeight:500}}>2205 Pipe</td><td  style={{color:'#334155',fontWeight:500}} className="text-right">TN22WE7812</td></tr>
                  <tr><td style={{color:'#334155',fontWeight:500}}>400 Revert</td><td style={{color:'#334155',fontWeight:500}} className="text-right">KA04RT5690</td></tr>
                  <tr><td style={{color:'#334155',fontWeight:500}}>HCFeCr(HP)</td><td style={{color:'#334155',fontWeight:500}} className="text-right">AP05QA1234</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>

        {/* MAIN SECTION - UPDATED ALIGNMENT */}
        <main className="rm-main-section">
          <div className="rm-main-header">
            <h2 className="rm-issue-title">Issue Slip</h2>
            <div className="rm-header-right">
              <div className="rm-wb-info">
                Weigh Bridge Number : 483824829
              </div>
            </div>
          </div>

          <div className="rm-main-form-grid">
            <div className="rm-form-field">
              <label>Cost Center Name</label>
              <select className="rm-select"><option>SMS 1</option></select>
            </div>
            <div className="rm-form-field">
              <label>Cost Center Code</label>
              <input type="text" value="456789" readOnly className="rm-input-disabled" />
            </div>
            <div className="rm-form-field">
              <label>Slip ID</label>
              <input type="text" placeholder="Enter ID" className="rm-input" />
            </div>
            <div className="rm-form-field">
              <label>Sub Store Location</label>
              <input type="text" placeholder="Enter" className="rm-input" />
            </div>
          </div>

          <div className="rm-items-container">
            <div className="rm-items-header">
              <span className="rm-items-label">Items</span>
              <span className="rm-add-item" onClick={handleAddItem}>+ Add Item</span>
            </div>
            <div className="rm-table-wrapper">
              <table className="rm-main-table">
                <thead>
                  <tr>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>S.No.</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Item Code</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Description</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Remarks</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Qty Required</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Qty Issued</th>
                    <th style={{backgroundColor:'#CEF0F6',color:'#364153',fontWeight:500 }}>Truck No.</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <select className="table-select">
                          <option>{item.itemCode}</option>
                        </select>
                      </td>
                      <td className="placeholder-text">{item.description}</td>
                      <td style={{color:'#64748B'}}>{item.remarks}</td>
                      <td>{item.qtyRequired} (kg)</td>
                      <td>{item.qtyIssued}</td>
                      <td>
                        <select className="table-select">
                          <option>{item.truckNo || 'Select'}</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rm-bottom-row">
            <div className="rm-form-field">
              <label>SMS charging supervisor</label>
              <select className="rm-select"><option>Search & enter na...</option></select>
            </div>
            <div className="rm-form-field">
              <label>Issued By</label>
              <select className="rm-select"><option>Dummy</option></select>
            </div>
            <div className="rm-form-field">
              <label>Remarks</label>
              <input type="text" placeholder="Enter..." className="rm-input" />
            </div>
          </div>

          <div className="rm-footer">
            <button className="rm-btn-back" onClick={onClose}>Back</button>
            <button className="rm-btn-confirm" onClick={handleConfirm}>Confirm</button>
          </div>
        </main>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default RMIntimationSlipModal;


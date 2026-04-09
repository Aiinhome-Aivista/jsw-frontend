import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../css/RMSupplySlipSummaryModal.css';

interface RMSupplySlipSummaryModalProps {
  onClose: () => void;
}

const RMSupplySlipSummaryModal: React.FC<RMSupplySlipSummaryModalProps> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleConfirm = () => {
    alert("Material Supply Slip #123 has been confirmed.");
  };

  const modalContent = (
    <div className="supply-modal-overlay">
      <div className="supply-modal-card">
        {/* LEFT SIDEBAR SECTION */}
        <aside className="supply-sidebar-container">
          <div className="supply-sidebar-box">
            <h2 className="supply-sidebar-title">Intimation Slip #123</h2>
            
            <div className="supply-sidebar-grid">
              <div className="supply-info-item">
                <label>Shop</label>
                <span>SMS 1</span>
              </div>
              <div className="supply-info-item">
                <label>Series</label>
                <span>300</span>
              </div>
              <div className="supply-info-item">
                <label>Grade</label>
                <span>304</span>
              </div>
              <div className="supply-info-item full-width">
                <label>Shift</label>
                <span>3rd Shift (10PM - 6AM)</span>
              </div>
              <div className="supply-info-item full-width">
                <label>SMS charging supervisor</label>
                <span>AK Ghosh</span>
              </div>
            </div>

            <div className="supply-requisition-section">
              <h3 className="supply-req-title">Material Requisitioned</h3>
              <table className="supply-req-table">
                <thead>
                  <tr>
                    <th>Material Name</th>
                    <th >Vehicle No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>SAF Metal</td><td >DL19AB38494</td></tr>
                  <tr><td>2205 Pipe</td><td >DL19AB38494</td></tr>
                  <tr><td>Hot Coiler</td><td >DL19AB38494</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT SECTION */}
        <main className="supply-main-content">
          <header className="supply-main-header">
            <h1 className="supply-main-title">Material Supply Slip #123</h1>
            <div className="supply-wb-tag">
              Weigh Bridge Number : <strong>483824829</strong>
            </div>
          </header>

          <section className="supply-summary-banner">
            <div className="summary-item">
              <label>Unique No.</label>
              <strong>#14241</strong>
            </div>
            <div className="summary-item">
              <label>Date</label>
              <strong>14/02/2025</strong>
            </div>
            <div className="summary-item">
              <label>Loading Point</label>
              <strong>SS Scrap yard</strong>
            </div>
            <div className="summary-item">
              <label>Unloading Point</label>
              <strong>SMS 1</strong>
            </div>
            <div className="summary-item">
              <label>RM Supervisor</label>
              <strong>AK Ghosh</strong>
            </div>
            <div className="summary-item">
              <label>WB Supervisor</label>
              <strong>Sujit Rai</strong>
            </div>
            <div className="summary-item">
              <label>Transport No.</label>
              <strong>#1234</strong>
            </div>
          </section>

          <section className="supply-table-section">
            <h3 className="supply-section-subtitle">Chemical Composition</h3>
            <div className="supply-table-wrapper">
              <table className="supply-composition-table">
                <thead>
                  <tr>
                    <th>Vehicle No</th>
                    <th>Batch ID</th>
                    <th>Item Code</th>
                    <th>Material</th>
                    <th>Mn</th>
                    <th>P</th>
                    <th>Ni</th>
                    <th>Cr</th>
                    <th>Cu</th>
                    <th>Mo</th>
                    <th>Pb</th>
                    <th>Sn</th>
                    <th>Tentative Weight</th>
                    <th>Net Weight</th>
                    <th>Lead Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3} className="bold-cell">DL19AB38494</td>
                    <td>133213</td>
                    <td>302</td>
                    <td>SAF Metal</td>
                    <td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td>
                    <td>5600 Kg</td>
                    <td rowSpan={2} className="merged-cell">10178 Kg</td>
                    <td className="merged-cell">15 min</td>
                  </tr>
                  <tr>
                    <td>133214</td>
                    <td>304</td>
                    <td>2205 Pipe</td>
                    <td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td>
                    <td>4500 Kg</td>
                    <td>12 min</td>
                  </tr>
                  <tr>
                    <td>133215</td>
                    <td>400</td>
                    <td>Hot Coiler</td>
                    <td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td><td>1%</td>
                    <td>7650 Kg</td>
                    <td>7690 Kg</td>
                    <td>12 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

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

export default RMSupplySlipSummaryModal;


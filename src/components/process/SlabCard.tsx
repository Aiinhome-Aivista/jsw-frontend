import React, { useState } from 'react';

interface HeatInfo {
  id: string;
  time: string;
  status: 'new' | 'first';
}

const SlabCastingDashboard: React.FC<{ heatId?: string }> = ({ heatId: _heatId }) => {
  const [selectedHeat, setSelectedHeat] = useState<string | null>(null);

  const heatIds: HeatInfo[] = [
    { id: '2602J0004', time: '2 mins ago', status: 'new' },
    { id: '2602J0003', time: '2 mins ago', status: 'new' },
    { id: '2602J0002', time: '20 mins ago', status: 'first' },
    { id: '2602J0001', time: '45 mins ago', status: 'first' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF2] p-5 font-sans relative">
      {/* Top Fixed Save Button - As per Figma absolute top-right */}
      <div className="absolute top-5 right-5 z-50">
        <button className="px-10 py-2 bg-[#E5D1B8] text-white font-bold rounded-lg cursor-not-allowed">
          Save
        </button>
      </div>

      <div className="grid grid-cols-[280px_1fr_380px] gap-5 h-[calc(100vh-100px)] mt-12">
        
        {/* LEFT PANEL: Sequence ID Selection */}
        <aside className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 shadow-sm">
          <div className="bg-[#FEF3C7] text-[#854D0E] font-bold py-3 px-4 rounded-xl text-center mb-6 text-lg">
            Sequence ID Selection
          </div>
          
          <div className="flex items-center gap-3 mb-6 text-xs font-semibold">
            <span className="bg-[#E5E7EB] w-5 h-5 flex items-center justify-center rounded-full text-[10px]">1</span>
            <span>Heat IDs</span>
            <span className="flex items-center gap-1 text-[#2563EB] ml-2"><span className="text-[10px]">●</span> First</span>
            <span className="flex items-center gap-1 text-[#DC2626]"><span className="text-[10px]">●</span> New</span>
          </div>

          <div className="space-y-4">
            {heatIds.map((heat) => (
              <div key={heat.id} className="flex items-center justify-between group">
                <div>
                  <div className="flex items-center gap-1 font-bold text-[#D48625]">
                    {heat.id} 
                    <span className={heat.status === 'new' ? 'text-[#DC2626]' : 'text-[#2563EB]'}>●</span>
                  </div>
                  <div className="text-[10px] text-gray-400">{heat.time}</div>
                </div>
                <button 
                  onClick={() => setSelectedHeat(heat.id)}
                  className="bg-[#D48625] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#b87420] transition-colors"
                >
                  View Slip
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER PANEL: Dynamic Content */}
        <main className="bg-white border-2 border-[#D48625] rounded-2xl overflow-hidden flex flex-col relative">
          {!selectedHeat ? (
            /* EMPTY STATE */
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="text-6xl mb-6 opacity-80">📄</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Select Intimation Slip for further process</h2>
              <p className="text-gray-500 max-w-xs leading-relaxed">
                Click Intimation slip from the left panel (Heat IDs) to add sequence
              </p>
            </div>
          ) : (
            /* FORM STATE (LRF Intimation Slip) */
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold mb-6 text-gray-800">LRF Intimation Slip (Heat ID - {selectedHeat})</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Shop</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600">
                    <option>SMS 1</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Date</label>
                  <input type="text" value="25th Jan, 2025" readOnly className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">Heat no.</label>
                  <input type="text" value={selectedHeat} readOnly className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm" />
                </div>
              </div>
              {/* Additional form rows would go here... */}
              
              <div className="mt-auto flex justify-center gap-4 pt-6">
                <button onClick={() => setSelectedHeat(null)} className="px-8 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button className="px-8 py-2.5 bg-[#D48625] text-white font-bold rounded-xl shadow-lg hover:bg-[#b87420] transition-transform active:scale-95">
                  Submit to Basic Details
                </button>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT PANEL: Basic Details */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-8 text-gray-800">Basic Details</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Series</label>
              <div className="w-full p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-gray-300">--</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Grade</label>
              <div className="w-full p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-gray-300">--</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Width</label>
              <div className="w-full p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-gray-300">--</div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold">Confirm Sequence ID</label>
              <div className="w-full p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-gray-300">--</div>
            </div>
          </div>

          {/* Info Alert at bottom */}
          <div className="mt-auto bg-[#EFF6FF] border border-[#DBEAFE] p-4 rounded-2xl flex gap-3 items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">📜</div>
            <p className="text-[13px] text-[#1E40AF] font-medium leading-tight">
              Please submit LRF intimation slip to add sequence for further process.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SlabCastingDashboard;


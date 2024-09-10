import React from 'react';

interface RxItem {
  id: number;
  name: string;
}

interface RxItemDropdownProps {
  rxItems: RxItem[];
  selectedRxItemId: number;
  handleRxItemSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RxItemDropdown: React.FC<RxItemDropdownProps> = ({ rxItems, selectedRxItemId, handleRxItemSelect }) => {
  return (
    <div className="mb-3">
      <label htmlFor="rxItemDropdown" className="form-label">Rx Item</label>
      <select
        id="rxItemDropdown"
        value={selectedRxItemId}
        onChange={handleRxItemSelect}
        className="form-select"
      >
        <option value="">Select Rx Item</option>
        {rxItems.map(item => (
          <option key={item.id} value={item.id}>
            {item.name} (ID: {item.id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default RxItemDropdown;

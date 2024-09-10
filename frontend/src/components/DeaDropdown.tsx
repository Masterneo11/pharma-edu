import React from 'react';

interface DeaDownProps {
    selectedDeaType: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DeaTypeDropdown: React.FC<DeaDownProps> = ({ selectedDeaType: selectedDea, onChange }) => {
    const states = [
        "Legend",
        "Schedule II",
        "Schedule III",
        "Schedule IV",
        "Schedule V",
    ];

    return (
        // 
        <select
            aria-label="DEA Schedule"
            value={selectedDea}
            onChange={onChange}
            className="state-dropdown"
        >
            <option value="" disabled>Dea Schedule</option>
            {states.map(dea => (
                <option key={dea} value={dea}>{dea}</option>
            ))}
        </select>

    );
};

export default DeaTypeDropdown;




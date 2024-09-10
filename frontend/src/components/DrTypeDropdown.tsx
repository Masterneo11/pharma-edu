import React from 'react';

interface StateDropdownProps {
    selectedDrType: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DrTypeDropdown: React.FC<StateDropdownProps> = ({ selectedDrType: selectedDr, onChange }) => {
    const states = [
        "MD",
        "DO",
        "DPM",
        "DDS",
        "DMD",
        "OD",
        "PharmD",
        "DC",
        "ND",
        "NMD",
        "DVM",
        "PhD",
    ];

    return (
        <>
            <select
                aria-label="Doctor Type"
                value={selectedDr}
                onChange={onChange}
                className="state-dropdown"
            >
                <option value="" disabled>Dr Type</option>
                {states.map(dr => (
                    <option key={dr} value={dr}>{dr}</option>
                ))}
            </select>
        </>
    );
};

export default DrTypeDropdown;

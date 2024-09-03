import React from 'react';

interface StateDropdownProps {
    selectedState: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StateDropdown: React.FC<StateDropdownProps> = ({ selectedState, onChange }) => {
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    return (
        <select value={selectedState} onChange={onChange} className="state-dropdown">
            <option value="" disabled>Select State</option>
            {states.map(state => (
                <option key={state} value={state}>{state}</option>
            ))}
        </select>
    );
};

export default StateDropdown;

















// import React, { useState } from 'react';

// interface StateDropdownProps {
//     selectedState: string;
//     onChange: (value: string) => void;
// }

// const StateDropdown: React.FC<StateDropdownProps> = ({ selectedState, onChange }) => {
//     const [isDropdown, setIsDropdown] = useState(true);
//     const states = [
//         "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
//         "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
//         "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
//         "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
//         "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
//     ];

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         onChange(event.target.value);
//     };

//     const toggleInputType = () => {
//         setIsDropdown(!isDropdown);
//     };

//     return (
//         <div className="state-input-container">
//             {isDropdown ? (
//                 <select value={selectedState} onChange={handleInputChange} className="state-dropdown">
//                     <option value="" disabled>Select State</option>
//                     {states.map(state => (
//                         <option key={state} value={state}>{state}</option>
//                     ))}
//                 </select>
//             ) : (
//                 <input
//                     type="text"
//                     value={selectedState}
//                     onChange={handleInputChange}
//                     placeholder="Enter state abbreviation"
//                     className="state-input"
//                 />
//             )}
//             <button type="button" onClick={toggleInputType} className="toggle-input-button">
//                 {isDropdown ? "Type instead" : "Select from list"}
//             </button>
//         </div>
//     );
// };

// export default StateDropdown;

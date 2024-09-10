// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// interface Patient {
//     id: string;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;

// }

// interface SearchWord {
//     Word: string;
//     value: string;
//     onChange: (string: string) => void;
// }

// const PatientModal: React.FC<SearchWord> = ({ Word }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [patients, setPatients] = useState<Patient[]>([]);

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const response = await fetch("http://localhost:8000/patients", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setPatients(data);
//             } else {
//                 console.error("Failed to fetch patient data.");
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (value) {
//             const filtered = patients.filter(patient =>
//                 `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setIsDropdownVisible(true);
//         } else {
//             setIsDropdownVisible(false);
//         }
//     };

//     const handleOptionClick = (option: Patient) => {
//         setInputValue(`${option.first_name} ${option.last_name}_id ${option.id}`);
//         setIsDropdownVisible(false);
//     };

//     return (
//         <div>
//             <div className='PatientSearch'>
//                 <label id="PatSar" htmlFor='input'>{Word}</label>
//                 <input
//                     type='text'
//                     id='input'
//                     className='quickinput'
//                     value={inputValue}
//                     onChange={handleInputChange}
//                 />
//                 <button className='enter'>Search</button>
//             </div>
//             {isDropdownVisible && (
//                 <div className='dropdown'>
//                     {filteredOptions.map((option) => (
//                         <div
//                             key={option.id}
//                             className='dropdown-option'
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.id} {option.first_name}  {option.last_name}DOB: {option.date_of_birth}
//                         </div>
//                     ))}
//                 </div>
//             )}</div>
//     );
// };

// export default PatientModal;


// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Modal.setAppElement('#root');

// interface Patient {
//     id: string;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;
// }

// interface SearchWord {
//     Word: string;
//     value: string;
//     onChange: (string: string) => void;
// }

// const PatientModal: React.FC<SearchWord> = ({ Word }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [patients, setPatients] = useState<Patient[]>([]);

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const response = await fetch("http://localhost:8000/patients", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setPatients(data);
//             } else {
//                 console.error("Failed to fetch patient data.");
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (value) {
//             const filtered = patients.filter(patient =>
//                 `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setIsDropdownVisible(true);
//         } else {
//             setIsDropdownVisible(false);
//         }
//     };

//     const handleOptionClick = (option: Patient) => {
//         setInputValue(`${option.first_name} ${option.last_name} (ID: ${option.id})`);
//         setIsDropdownVisible(false);
//     };

//     return (
//         <div className="container mt-3">
//             <div className="form-group">
//                 <label htmlFor='input'>{Word}</label>
//                 <div className="input-group">
//                     <input
//                         type='text'
//                         id='input'
//                         className='form-control'
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Search for a patient..."
//                     />
//                     <div className="input-group-append">
//                         <button className='btn btn-primary' type="button">Search</button>
//                     </div>
//                 </div>
//             </div>
//             {isDropdownVisible && (
//                 <div className='dropdown-menu show'>
//                     {filteredOptions.map((option) => (
//                         <button
//                             key={option.id}
//                             className='dropdown-item'
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.id} {option.first_name} {option.last_name} (DOB: {option.date_of_birth})
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PatientModal;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface Patient {
//     id: string;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;
// }

// interface SearchWord {
//     Word: string;
//     value: string;
//     onChange: (value: string) => void;
// }

// const PatientModal: React.FC<SearchWord> = ({ Word }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [patients, setPatients] = useState<Patient[]>([]);

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const response = await fetch("http://localhost:8000/patients", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setPatients(data);
//             } else {
//                 console.error("Failed to fetch patient data.");
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (value) {
//             const filtered = patients.filter(patient =>
//                 `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setIsDropdownVisible(true);
//         } else {
//             setIsDropdownVisible(false);
//         }
//     };

//     const handleOptionClick = (option: Patient) => {
//         setInputValue(`${option.first_name} ${option.last_name} (ID: ${option.id})`);
//         setIsDropdownVisible(false);
//     };

//     return (
//         <div className="container mt-3">
//             <div className="form-group">
//                 <label htmlFor='input'>{Word}</label>
//                 <div className="input-group">
//                     <input
//                         type='text'
//                         id='input'
//                         className='form-control'
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Search for a patient..."
//                     />
//                     <div className="input-group-append">

//                     </div>
//                 </div>
//             </div>
//             {isDropdownVisible && (
//                 <div className='dropdown-menu show'>
//                     {filteredOptions.map((option) => (
//                         <button
//                             key={option.id}
//                             className='dropdown-item'
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.id} {option.first_name} {option.last_name} (DOB: {option.date_of_birth})
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PatientModal;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PatientModal.css'; // Import custom CSS

// interface Patient {
//     id: number;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;
// }

// interface SearchWord {
//     Word: string;
//     value: string;
//     onChange: (value: string) => void;
// }

// const PatientModal: React.FC<SearchWord> = ({ Word }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [patients, setPatients] = useState<Patient[]>([]);

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const response = await fetch("http://localhost:8000/patients", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setPatients(data);
//             } else {
//                 console.error("Failed to fetch patient data.");
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (value) {
//             const filtered = patients.filter(patient =>
//                 `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setIsDropdownVisible(true);
//         } else {
//             setIsDropdownVisible(false);
//         }
//     };

//     const handleOptionClick = (option: Patient) => {
//         setInputValue(`${option.first_name} ${option.last_name} (ID: ${option.id})`);
//         setIsDropdownVisible(false);
//     };

//     return (
//         <div className="container mt-3">
//             <div className="form-group">
//                 <label htmlFor='input'>{Word}</label>
//                 <div className="input-group">
//                     <input
//                         type='text'
//                         id='input'
//                         className='form-control custom-border'
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Search for a patient..."
//                     />
//                 </div>
//             </div>
//             {isDropdownVisible && (
//                 <div className='dropdown-menu show'>
//                     {filteredOptions.map((option) => (
//                         <button
//                             key={option.id}
//                             className='dropdown-item'
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.id} {option.first_name} {option.last_name} (DOB: {option.date_of_birth})
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PatientModal;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PatientModal.css'; // Import custom CSS

// interface Patient {
//     id: number;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;
// }

// interface SearchWord {
//     Word: string;
//     value: string;
//     onChange: (value: string) => void;
// }

// const PatientModal: React.FC<SearchWord> = ({ Word }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [patients, setPatients] = useState<Patient[]>([]);
//     const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null); // Store the selected patient ID

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const response = await fetch("http://localhost:8000/patients", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setPatients(data);
//             } else {
//                 console.error("Failed to fetch patient data.");
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (value) {
//             const filtered = patients.filter(patient =>
//                 `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setIsDropdownVisible(true);
//         } else {
//             setIsDropdownVisible(false);
//         }
//     };

//     const handleOptionClick = (option: Patient) => {
//         setInputValue(`${option.first_name} ${option.last_name} (ID: ${option.id})`);
//         setSelectedPatientId(option.id); // Store the selected patient ID as a number
//         setIsDropdownVisible(false);
//     };

//     return (
//         <div className="container mt-3">
//             <div className="form-group">
//                 <label htmlFor='input'>{Word}</label>
//                 <div className="input-group">
//                     <input
//                         type='text'
//                         id='input'
//                         className='form-control custom-border'
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Search for a patient..."
//                     />
//                 </div>
//             </div>
//             {isDropdownVisible && (
//                 <div className='dropdown-menu show'>
//                     {filteredOptions.map((option) => (
//                         <button
//                             key={option.id}
//                             className='dropdown-item'
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.id} {option.first_name} {option.last_name} (DOB: {option.date_of_birth})
//                         </button>
//                     ))}
//                 </div>
//             )}
//             {/* Display the selected patient ID */}
//             {selectedPatientId !== null && (
//                 <p>Selected Patient ID: {selectedPatientId}</p>
//             )}
//         </div>
//     );
// };

// export default PatientModal;


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PatientModal.css'; // Import custom CSS

interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
}

interface SearchWord {
    Word: string;
    value: string;
    onChange: (value: string) => void;
}

const PatientModal: React.FC<SearchWord> = ({ Word }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null); // Store the selected patient ID

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch("http://localhost:8000/patients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                console.error("Failed to fetch patient data.");
            }
        };

        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filtered = patients.filter(patient =>
                `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    };

    const handleOptionClick = (option: Patient) => {
        setInputValue(`${option.first_name} ${option.last_name} (ID: ${option.id})`);
        setSelectedPatientId(option.id); // Store the selected patient ID as a number
        setIsDropdownVisible(false);
    };

    return (
        <div className="container mt-3">
            <div className="form-group">
                <label htmlFor='input'>{Word}</label>
                <div className="input-group">
                    <input
                        type='text'
                        id='input'
                        className='form-control custom-border'
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search for a patient..."
                    />
                </div>
            </div>
            {isDropdownVisible && (
                <div className='dropdown-menu show'>
                    {filteredOptions.map((option) => (
                        <button
                            key={option.id}
                            className='dropdown-item'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.id} {option.first_name} {option.last_name} (DOB: {option.date_of_birth})
                        </button>
                    ))}
                </div>
            )}
            {/* Display the selected patient ID */}
            {selectedPatientId !== null && (
                <p>Selected Patient ID: {selectedPatientId}</p>
            )}
        </div>
    );
};

export default PatientModal;

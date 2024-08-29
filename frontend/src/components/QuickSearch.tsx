import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
}

interface SearchWord {
    Word: string;
}

const PatientModal: React.FC<SearchWord> = ({ Word }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Patient[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);

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
        setInputValue(`${option.first_name} ${option.last_name}_id ${option.id}`);
        setIsDropdownVisible(false);
    };

    return (
        <div className='PatientSearch'>
            <label id="PatSar" htmlFor='input'>{Word}</label>
            <input
                type='text'
                id='input'
                className='quickinput'
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className='enter'>Search</button>

            {isDropdownVisible && (
                <div className='dropdown'>
                    {filteredOptions.map((option) => (
                        <div
                            key={option.id}
                            className='dropdown-option'
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.id} {option.first_name}  {option.last_name}DOB: {option.date_of_birth}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientModal;

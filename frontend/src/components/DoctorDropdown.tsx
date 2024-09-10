import React from 'react';

interface Doctor {
    id: number;
    first_name: string;
    last_name: string;
}

interface DoctorDropdownProps {
    doctors: Doctor[];
    selectedDoctorId: number;
    handleDoctorSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DoctorDropdown: React.FC<DoctorDropdownProps> = ({ doctors, selectedDoctorId, handleDoctorSelect }) => {
    return (
        <div className="mb-3">
            <label htmlFor="doctorDropdown" className="form-label">Doctor Name</label>
            <select
                id="doctorDropdown"
                value={selectedDoctorId}
                onChange={handleDoctorSelect}
                className="form-select"
            >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.id} value={`${doctor.id}`}>
                        {doctor.first_name} {doctor.last_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DoctorDropdown;

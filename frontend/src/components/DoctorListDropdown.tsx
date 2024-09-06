import React, { useState, useEffect } from "react";

interface Doctor {
    id: number;
    first_name: string;
    last_name: string;
}

interface DoctorListDropdownProps {
    onDoctorSelect: (doctor: Doctor) => void;
}

const DoctorListDropdown: React.FC<DoctorListDropdownProps> = ({ onDoctorSelect }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://localhost:8000/prescribers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDoctors(data);
            } else {
                console.error("Failed to fetch doctors.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleDoctorSearchChange = (value: string) => {
        setSearchTerm(value);

        if (value.trim() === "") {
            setFilteredDoctors([]);
            setShowDropdown(false);
        } else {
            const filtered = doctors.filter(doctor =>
                `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setShowDropdown(true);
        }
    };

    const handleDoctorSelect = (doctor: Doctor) => {
        onDoctorSelect(doctor);
        setShowDropdown(false);
    };

    return (
        <div className="doctor-list-dropdown">
            <input
                type="text"
                placeholder="Search for doctor..."
                value={searchTerm}
                onChange={(e) => handleDoctorSearchChange(e.target.value)}
            />
            {showDropdown && (
                <div className="dropdown-list">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map(doctor => (
                            <div
                                key={doctor.id}
                                className="dropdown-item"
                                onClick={() => handleDoctorSelect(doctor)}
                            >
                                {doctor.first_name} {doctor.last_name}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No doctors found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorListDropdown;

// import React, { useEffect, useState } from 'react';

// interface Patient {
//     id: number;
//     name: string;
// }

// interface Prescription {
//     id: number;
//     rx_number: string;
//     patient_id: number;
//     directions: string;
//     // Add other fields as needed
// }

// const FetchPrescriptions: React.FC = () => {
//     const [patients, setPatients] = useState<Patient[]>([]);
//     const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//     const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
//     const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);

//     // Fetch patients from the backend using fetch
//     useEffect(() => {
//         const fetchPatients = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/patients'); // Adjust URL
//                 const data = await response.json();
//                 console.log('Patients data:', data); // Log to check data
//                 setPatients(data);
//             } catch (error) {
//                 console.error('Error fetching patients:', error);
//             }
//         };

//         fetchPatients();
//     }, []);

//     // Fetch prescriptions from the backend using fetch
//     useEffect(() => {
//         const fetchPrescriptions = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/prescriptions'); // Adjust URL
//                 const data = await response.json();
//                 console.log('Prescriptions data:', data); // Log to check data
//                 setPrescriptions(data);
//             } catch (error) {
//                 console.error('Error fetching prescriptions:', error);
//             }
//         };

//         fetchPrescriptions();
//     }, []);

//     // Filter prescriptions based on selected patient
//     useEffect(() => {
//         if (selectedPatient !== null) {
//             const patientPrescriptions = prescriptions.filter(p => p.patient_id === selectedPatient);
//             setFilteredPrescriptions(patientPrescriptions);
//         } else {
//             setFilteredPrescriptions(prescriptions); // Show all prescriptions if no patient is selected
//         }
//     }, [selectedPatient, prescriptions]);

//     return (
//         <div>
//             <h5>Select Patient</h5>
//             {patients.length === 0 ? (
//                 <p>No patients available</p>
//             ) : (
//                 <select onChange={(e) => setSelectedPatient(Number(e.target.value))}>
//                     <option value="">All Patients</option>
//                     {patients.map((patient) => (
//                         <option key={patient.id} value={patient.id}>
//                             {patient.name}
//                         </option>
//                     ))}
//                 </select>
//             )}

//             <ul>
//                 {filteredPrescriptions.length === 0 ? (
//                     <p>No prescriptions available</p>
//                 ) : (
//                     filteredPrescriptions.map((prescription) => (
//                         <li key={prescription.id}>
//                             {prescription.rx_number} - {prescription.directions}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default FetchPrescriptions;



// import React, { useEffect, useState } from 'react';

// interface Patient {
//     id: number;
//     name: string;
// }

// interface Prescription {
//     id: number;
//     rx_number: string;
//     patient_id: number;
//     directions: string;
//     // Add other fields as needed
// }

// const FetchPrescriptions: React.FC = () => {
//     const [patients, setPatients] = useState<Patient[]>([]);
//     const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//     const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
//     const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);

//     // Fetch patients from the backend using fetch
//     useEffect(() => {
//         const fetchPatients = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/patients'); // Adjust URL
//                 const data = await response.json();
//                 console.log('Patients data:', data); // Log to check data
//                 setPatients(data);
//             } catch (error) {
//                 console.error('Error fetching patients:', error);
//             }
//         };

//         fetchPatients();
//     }, []);

//     // Fetch prescriptions from the backend using fetch
//     useEffect(() => {
//         const fetchPrescriptions = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/prescriptions'); // Adjust URL
//                 const data = await response.json();
//                 console.log('Prescriptions data:', data); // Log to check data
//                 setPrescriptions(data);
//             } catch (error) {
//                 console.error('Error fetching prescriptions:', error);
//             }
//         };

//         fetchPrescriptions();
//     }, []);

//     // Filter prescriptions based on selected patient
//     useEffect(() => {
//         if (selectedPatient !== null) {
//             const patientPrescriptions = prescriptions.filter(p => p.patient_id === selectedPatient);
//             setFilteredPrescriptions(patientPrescriptions);
//         } else {
//             setFilteredPrescriptions(prescriptions); // Show all prescriptions if no patient is selected
//         }
//     }, [selectedPatient, prescriptions]);

//     return (
//         <div>
//             <h5>Select Patient</h5>
//             {patients.length === 0 ? (
//                 <p>No patients available</p>
//             ) : (
//                 <select onChange={(e) => setSelectedPatient(Number(e.target.value))}>
//                     <option value="">All Patients</option>
//                     {patients.map((patient) => (
//                         <option key={patient.id} value={patient.id}>
//                             {patient.name}
//                         </option>
//                     ))}
//                 </select>
//             )}

//             <h5>Filtered Prescriptions</h5>
//             <ul>
//                 {filteredPrescriptions.length === 0 ? (
//                     <p>No prescriptions available</p>
//                 ) : (
//                     filteredPrescriptions.map((prescription) => (
//                         <li key={prescription.id}>
//                             {prescription.rx_number} - {prescription.directions}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default FetchPrescriptions;

import React, { useEffect, useState } from 'react';

interface Patient {
    id: number;
    name: string;
}

interface Prescription {
    id: number;
    rx_number: string;
    patient_id: number;
    directions: string;
    // Add other fields as needed
}

const FetchPrescriptions: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);

    // Fetch patients from the backend using fetch
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(`http://localhost:8000/patients/${patients}`); // Adjust URL
                const data = await response.json();
                console.log('Patients data:', data); // Log to check data
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    // Fetch prescriptions from the backend using fetch
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('http://localhost:8000/prescriptions'); // Adjust URL
                const data = await response.json();
                console.log('Prescriptions data:', data); // Log to check data
                setPrescriptions(data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    // Filter prescriptions based on selected patient
    useEffect(() => {
        if (selectedPatient !== null) {
            const patientPrescriptions = prescriptions.filter(p => p.patient_id === selectedPatient);
            setFilteredPrescriptions(patientPrescriptions);
        } else {
            setFilteredPrescriptions(prescriptions); // Show all prescriptions if no patient is selected
        }
    }, [selectedPatient, prescriptions]);

    return (
        <div>
            <h5>Select Patient</h5>
            {patients.length === 0 ? (
                <p>No patients available</p>
            ) : (
                <select onChange={(e) => setSelectedPatient(Number(e.target.value))}>
                    <option value="">All Patients</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}> {/* Add key to option */}
                            {patient.name}
                        </option>
                    ))}
                </select>
            )}

            <h5>Filtered Prescriptions</h5>
            <ul>
                {filteredPrescriptions.length === 0 ? (
                    <p>No prescriptions available</p>
                ) : (
                    filteredPrescriptions.map((prescription) => (
                        <li key={prescription.id}> {/* Add key to li */}
                            {prescription.rx_number} - {prescription.directions}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default FetchPrescriptions;

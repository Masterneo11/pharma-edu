import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo';
import StateDropdown from '../components/StatedDropdown';
import '../PatientPage.css';

interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone_number: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    allergies: string;
    insurance_name: string;
    insurance_member_id: string;
    group_number: string;
    insurance_rx_bin: string;
    insurance_rx_pcn: string;
    insurance_person_code: string;
    prescriptions: string[];
}

const NewPatient: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [editingPatientId, setEditingPatientId] = useState<number | null>(null);
    const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);

    // State for form fields
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [allergies, setAllergies] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipCode] = useState<string>("");
    const [insuranceName, setInsuranceName] = useState<string>("");
    const [idNumber, setIdNumber] = useState<string>("");
    const [insuranceGroupNumber, setInsuranceGroupNumber] = useState<string>("");
    const [bin, setBin] = useState<string>("");
    const [pcn, setPCN] = useState<string>("");
    const [personCode, setPersonCode] = useState<string>("");
    const [prescriptions, setPrescriptions] = useState<string>("");

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:8000/patients");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Failed to fetch patients", error);
        }
    };

    const handleSave = async () => {
        const patientData = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
            phone_number: phoneNumber,
            street,
            city,
            state,
            zipcode,
            allergies,
            insurance_name: insuranceName,
            insurance_member_id: idNumber,
            insurance_group_number: insuranceGroupNumber,
            insurance_rx_bin: bin,
            insurance_rx_pcn: pcn,
            insurance_person_code: personCode,
        };

        try {
            if (editingPatientId) {
                await fetch(`http://localhost:8000/patients/${editingPatientId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(patientData),
                });
            } else {
                await fetch("http://localhost:8000/patients", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(patientData),
                });
            }

            fetchPatients();
            resetForm();
        } catch (error) {
            console.error("Error saving patient", error);
        }
    };

    const handleEdit = async (patient: Patient) => {
        const response = await fetch(`http://localhost:8000/patients/${patient.id}`);
        const data = await response.json();

        setEditingPatientId(data.id || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setDob(data.date_of_birth || "");
        setPhoneNumber(data.phone_number || "");
        setStreet(data.street || "");
        setCity(data.city || "");
        setState(data.state || "");
        setZipCode(data.zipcode || "");
        setAllergies(data.allergies || "");
        setInsuranceName(data.insurance_name || "");
        setIdNumber(data.insurance_member_id || "");
        setInsuranceGroupNumber(data.group_number || "");
        setBin(data.insurance_rx_bin || "");
        setPCN(data.insurance_rx_pcn || "");
        setPersonCode(data.insurance_person_code || "");
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:8000/patients/${id}`, {
                method: "DELETE",
            });
            fetchPatients();
        } catch (error) {
            console.error("Error deleting patient", error);
        }
    };

    const handleFetchPrescriptions = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/prescriptions/${id}`);
            const data = await response.json();
            setSelectedPrescriptions(data);
        } catch (error) {
            console.error("Failed to fetch prescriptions", error);
        }
    };

    const resetForm = () => {
        setEditingPatientId(null);
        setFirstName("");
        setLastName("");
        setDob("");
        setPhoneNumber("");
        setStreet("");
        setCity("");
        setState("");
        setZipCode("");
        setAllergies("");
        setInsuranceName("");
        setIdNumber("");
        setInsuranceGroupNumber("");
        setBin("");
        setPCN("");
        setPersonCode("");
        setPrescriptions("");
    };

    return (
        <div className='homeformat'>
            <div className='EnterNewRxInfo'>
                <div className='patient-profile-fields-rr'>
                    <NameField Name='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
                    <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" />
                    <NameField Name='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} className="Rad" />
                    <NameField Name='Phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
                    <NameField Name='Allergies' value={allergies} onChange={(e) => setAllergies(e.target.value)} className="Rad" />
                    <NameField Name='Street' value={street} onChange={(e) => setStreet(e.target.value)} className="Rad" />
                    <NameField Name='City' value={city} onChange={(e) => setCity(e.target.value)} className="Rad" />
                    <StateDropdown selectedState={state} onChange={(e) => setState(e.target.value)} />
                    <NameField Name='Zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="Rad" />
                </div>
                <div className='bottomfields-rr'>
                    <Save Save={editingPatientId ? 'Update' : 'Save'} onClick={handleSave} />
                </div>
            </div>
            <div className="patient-profile-right-side">
                <div className='patient-profile-fields'>
                    <NameField Name='Insurance Member ID' value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="Rad" />
                    <NameField Name='Insurance Name' value={insuranceName} onChange={(e) => setInsuranceName(e.target.value)} className="Rad" />
                    <NameField Name='Insurance Group #' value={insuranceGroupNumber} onChange={(e) => setInsuranceGroupNumber(e.target.value)} className="Rad" />
                    <NameField Name='BIN' value={bin} onChange={(e) => setBin(e.target.value)} className="Rad" />
                    <NameField Name='PCN' value={pcn} onChange={(e) => setPCN(e.target.value)} className="Rad" />
                    <NameField Name='Person Code' value={personCode} onChange={(e) => setPersonCode(e.target.value)} className="Rad" />
                    <NameField Name='Prescriptions' value={prescriptions} onChange={(e) => setPrescriptions(e.target.value)} className="Rad" />
                </div>
            </div>
            <div className="patient-profile-right-side">
                <div className="container mt-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Patient List</h5>
                        </div>
                        <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {patients.map(patient => (
                                <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={patient.id}>
                                    <dl className="row">
                                        <dt className="col-sm-3">ID:</dt>
                                        <dd className="col-sm-9">{patient.id}</dd>

                                        <dt className="col-sm-3">Full name:</dt>
                                        <dd className="col-sm-9">{patient.first_name} {patient.last_name}</dd>

                                        <dt className="col-sm-3">Phone:</dt>
                                        <dd className="col-sm-9">{patient.phone_number}</dd>

                                        <dt className="col-sm-3">Date of Birth:</dt>
                                        <dd className="col-sm-9">{patient.date_of_birth}</dd>
                                    </dl>
                                    <button className="btn btn-primary" onClick={() => handleEdit(patient)}>Edit</button>
                                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(patient.id)}>Delete</button>
                                    <button className="btn btn-info" onClick={() => handleFetchPrescriptions(patient.id)}>Show Prescriptions</button>

                                    {selectedPrescriptions.length > 0 && (
                                        <div className="prescription-list mt-3">
                                            <h6>Prescriptions:</h6>
                                            <ul>
                                                {selectedPrescriptions.map((prescription, index) => (
                                                    <li key={index}>{prescription}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPatient;

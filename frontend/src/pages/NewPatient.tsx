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
                // Update existing patient
                await fetch(`http://localhost:8000/patients/${editingPatientId}`, {
                    method: "PATCH", // or PATCH based on API
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(patientData),
                });
            } else {
                // Create new patient
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


        //     // Using reduce() to concatenate prescriptions into a single string
        //     const prescriptionsString = data.prescriptions.reduce((acc: string, prescription: string, index: number) => {
        //         return index === 0 ? prescription : `${acc}, ${prescription}`;
        //     }, "");

        //     setPrescriptions(prescriptionsString);
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
                <div className='patient-profile-fields'>
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
                <div className='bottomfields'>
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
                <div className="outerscroll-rx">
                    <div className="rx-item-list-header"><p>Patient list</p></div>
                    <div className="scrollable-rx-list">
                        {patients.map(patient => (
                            <dl className="rx-items-individual" key={patient.id}>
                                <dt className="rx-list-name">Id: {patient.id}</dt>
                                <dt className="rx-list-name">Name: {patient.first_name} {patient.last_name}</dt>
                                <dt className="rx-list-dob">DOB: {patient.date_of_birth}</dt>
                                <button onClick={() => handleEdit(patient)}>Edit</button>
                                <button onClick={() => handleDelete(patient.id)}>Delete</button>
                            </dl>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewPatient;

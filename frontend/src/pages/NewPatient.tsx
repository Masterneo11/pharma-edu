import React, { useState } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo'
import '../PatientPage.css';

const NewPatient: React.FC = () => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [allergies, setAllergies] = useState<string>("");
    const [Bin, setBin] = useState<string>("");
    const [PCN, setPCN] = useState<string>("");
    const [IdNumber, setIdNumber] = useState<string>("");
    const [GroupNumber, setGroupNumber] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipCode] = useState<string>("");
    const [insuranceName, setinsuranceName] = useState<string>("");
    const [prescriptions, setPresriptions] = useState<string>("");
    const [batch, setpatientinfo] = useState<string>("");

    // Utility functions to handle type conversions
    const handleStringChange = (setStateFunction: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setStateFunction(event.target.value);
        };

    const handleNumberChange = (setStateFunction: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (/^\d*$/.test(value)) { // Ensure the input is numeric
                setStateFunction(value);
            }
        };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();
        const response = await fetch("http://localhost:8000/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dob,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode,
                allergies: allergies || "", // Defaults to an empty string if no allergies are provided
                prescriptions: [], // Prescriptions field, currently empty
                insurance_name: insuranceName || null,
                insurance_member_id: IdNumber || null,
                insurance_group_number: GroupNumber || null,
                insurance_rx_bin: Bin || null,
                insurance_rx_pcn: PCN || null,
            }),
        });
        if (response.ok) {
            console.log("Patient information saved successfully.");
        } else {
            console.error("Failed to save patient information.");
        }
    };
    return (<> <div><div className='homeformat'><div className='EnterNewRxInfo'><div className='patient-profile-fields'>
        <NameField Name='Last name' value={lastName} onChange={handleStringChange(setLastName)} className="Rad" />
        <NameField Name='First name' value={firstName} onChange={handleStringChange(setFirstName)} className="Rad" />
        <NameField Name='Date of birth' value={dob} onChange={handleStringChange(setDob)} className="Rad" />
        <NameField Name='Allergies' value={allergies} onChange={handleStringChange(setAllergies)} className="Rad" />
        <NameField Name='Street' value={street} onChange={handleStringChange(setStreet)} className="Rad" />
        <NameField Name='City' value={city} onChange={handleStringChange(setCity)} className="Rad" />
        <NameField Name='State' value={state} onChange={handleStringChange(setState)} className="Rad" />
        <NameField Name='Zipcode' value={zipcode} onChange={handleStringChange(setZipCode)} className="Rad" />
    </div>
        <div className='bottomfields'> <Save Save='Save' onClick={handleClick} />  <Save Save='enter' /></div>
    </div>
        <div className="patient-profile-right-side">
            <div className="patientlist">
                <div className='patient-profile-fields'>
                    <NameField Name='Insurance Member ID' value={IdNumber} onChange={handleNumberChange(setIdNumber)} className="Rad" />
                    <NameField Name='Insurance Name' value={insuranceName} onChange={handleStringChange(setinsuranceName)} className="Rad" />
                    <NameField Name='Insurance Group #' value={GroupNumber} onChange={handleNumberChange(setGroupNumber)} className="Rad" />
                    <NameField Name='BIN' value={Bin} onChange={handleNumberChange(setBin)} className="Rad" />
                    <NameField Name='PCN' value={PCN} onChange={handleStringChange(setPCN)} className="Rad" />
                    <NameField Name='Prescriptions' value={prescriptions} onChange={handleStringChange(setPresriptions)} className="Rad" />
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
    );
};
export default NewPatient;

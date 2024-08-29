// import React, { useState } from "react";
// import NameField from '../components/NameField';
// import DoctorModal from '../modals/DoctorModal';
// import Save from '../SaveInfo'
// import '../PatientPage.css'

// const Doctors: React.FC = () => {

//   const [lastName, setLastName] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [drType, setDrType] = useState('');
//   const [dea, setDea] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [npi, setNpiNumber] = useState('');
//   const [street, setStreet] = useState<string>("");
//   const [city, setCity] = useState<string>("");
//   const [state, setState] = useState<string>("");
//   const [zipcode, setZipCode] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
//     event.preventDefault();
//     const response = await fetch("http://localhost:8000/prescribers", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         first_name: firstName,
//         last_name: lastName,
//         prescriber_type: drType,
//         street: street,
//         city: city,
//         state: state,
//         zipcode: zipcode,
//         contact_number: phoneNumber,
//         dea: dea,
//         npi: npi
//       }),
//     });
//     if (response.ok) {
//       console.log("Prescriber information saved successfully.");
//     } else {
//       console.error("Failed to save patient information.");
//     }
//   };
//   return <> <div>
//     <div className='homeformat'>
//       <div className='EnterNewRxInfo'>
//         <div className='patient-profile-fields'>
//           <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" />
//           <NameField Name=' Dr Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
//           <NameField Name='prescriber type' value={drType} onChange={(e) => setDrType(e.target.value)} className="Rad" />
//           <NameField Name='Dea' value={dea} onChange={(e) => setDea(e.target.value)} className="Rad" />
//           <NameField Name='Npi' value={npi} onChange={(e) => setNpiNumber(e.target.value)} className="Rad" />
//         </div>
//         <div className='bottomfields'>  <Save Save='Save' onClick={handleClick} /> <div className="outer-dr-button">
//           <label> Dr search</label><button className='modal-search-button' onClick={openModal}>🔍</button><DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
//         </div>
//           <DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
//           <Save Save='enter' /></div>
//       </div>
//       <div className="patient-profile-right-side">
//         <NameField Name='Phone #' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
//         <NameField Name='Street' value={street} onChange={(e) => setStreet(e.target.value)} className="Rad" />
//         <NameField Name='City' value={city} onChange={(e) => setCity(e.target.value)} className="Rad" />
//         <NameField Name='State' value={state} onChange={(e) => setState(e.target.value)} className="Rad" />
//         <NameField Name='Zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="Rad" />
//         <div className="patientlist">
//           <div className='patient-profile-fields'>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div></>;;
// };

// export default Doctors;

import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import DoctorModal from '../modals/DoctorModal';
import Save from '../SaveInfo';
import '../PatientPage.css';

interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  prescriber_type: string;
  dea: string;
  npi: string;
  contact_number: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

const Doctors: React.FC = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [drType, setDrType] = useState('');
  const [dea, setDea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [npi, setNpiNumber] = useState('');
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/prescribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        prescriber_type: drType,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        contact_number: phoneNumber,
        dea: dea,
        npi: npi
      }),
    });
    if (response.ok) {
      console.log("Prescriber information saved successfully.");
      fetchDoctors(); // Refresh the list after adding a new doctor
    } else {
      console.error("Failed to save prescriber information.");
    }
  };

  const fetchDoctors = async () => {
    const response = await fetch("http://localhost:8000/prescribers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (response.ok) {
      const data = await response.json();
      setDoctors(data);
    } else {
      console.error("Failed to fetch doctors.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className='homeformat'>
      <div className='EnterNewRxInfo'>
        <div className='patient-profile-fields'>
          <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" />
          <NameField Name='Dr Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
          <NameField Name='Prescriber type' value={drType} onChange={(e) => setDrType(e.target.value)} className="Rad" />
          <NameField Name='Dea' value={dea} onChange={(e) => setDea(e.target.value)} className="Rad" />
          <NameField Name='Npi' value={npi} onChange={(e) => setNpiNumber(e.target.value)} className="Rad" />
        </div>
        <div className='bottomfields'>
          <Save Save='Save' onClick={handleClick} />
          <div className="outer-dr-button">
            <label>Dr search</label>
            <button className='modal-search-button' onClick={openModal}>🔍</button>
            <DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
        </div>
      </div>
      <div className="patient-profile-right-side">
        <NameField Name='Phone #' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
        <NameField Name='Street' value={street} onChange={(e) => setStreet(e.target.value)} className="Rad" />
        <NameField Name='City' value={city} onChange={(e) => setCity(e.target.value)} className="Rad" />
        <NameField Name='State' value={state} onChange={(e) => setState(e.target.value)} className="Rad" />
        <NameField Name='Zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="Rad" />
        <div className="doctor-list-container">
          <h3>Doctors List</h3>
          <div className="doctor-list">
            {doctors.map(doctor => (
              <dl className="doctor-item" key={doctor.id}>
                <dt>Name: {doctor.first_name} {doctor.last_name}</dt>
                <dt>Type: {doctor.prescriber_type}</dt>
                <dt>DEA: {doctor.dea}</dt>
                <dt>NPI: {doctor.npi}</dt>
                <dt>Phone: {doctor.contact_number}</dt>
              </dl>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;




import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import DoctorModal from '../modals/DoctorModal';
import Save from '../SaveInfo';
import StateDropdown from '../components/StatedDropdown';
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
  const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();

    const doctorData = {
      first_name: firstName,
      last_name: lastName,
      prescriber_type: drType,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      contact_number: phoneNumber,
      dea: dea,
      npi: npi,
    };

    const url = editingDoctorId
      ? `http://localhost:8000/prescribers/${editingDoctorId}`
      : "http://localhost:8000/prescribers";
    const method = editingDoctorId ? "PATCH" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctorData),
    });

    if (response.ok) {
      console.log(`Prescriber information ${editingDoctorId ? 'updated' : 'saved'} successfully.`);
      fetchDoctors(); // Refresh the list after adding/updating a doctor
      if (editingDoctorId) {
        setEditingDoctorId(null); // Reset after update
        resetForm(); // Reset form fields after editing
      }
    } else {
      console.error(`Failed to ${editingDoctorId ? 'update' : 'save'} prescriber information.`);
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

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:8000/prescribers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.ok) {
      console.log("Doctor deleted successfully.");
      fetchDoctors(); // Refresh the list after deleting a doctor
    } else {
      console.error("Failed to delete doctor.");
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctorId(doctor.id);
    setFirstName(doctor.first_name);
    setLastName(doctor.last_name);
    setDrType(doctor.prescriber_type);
    setDea(doctor.dea);
    setPhoneNumber(doctor.contact_number);
    setNpiNumber(doctor.npi);
    setStreet(doctor.street);
    setCity(doctor.city);
    setState(doctor.state);
    setZipCode(doctor.zipcode);
    window.scrollTo(0, 0); // Scroll to the top for editing
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDrType('');
    setDea('');
    setPhoneNumber('');
    setNpiNumber('');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
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
          <NameField Name='Phone #' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
          <NameField Name='Street' value={street} onChange={(e) => setStreet(e.target.value)} className="Rad" />
          <NameField Name='City' value={city} onChange={(e) => setCity(e.target.value)} className="Rad" />
          <StateDropdown selectedState={state} onChange={(e) => setState(e.target.value)} />
          <NameField Name='Zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="Rad" />
        </div>
        <div className='bottomfields'>
          <Save Save={editingDoctorId ? 'Update' : 'Save'} onClick={handleClick} />
          <div className="outer-dr-button">
            <label>Dr search</label>
            <button className='modal-search-button' onClick={openModal}>🔍</button>
            <DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
        </div>
      </div>
      <div className="patient-profile-right-side">
        <div className="doctor-list-container">
          <h3>Doctors List</h3>
          <div className="scrollable-rx-list">
            {doctors.map(doctor => (
              <dl className="rx-items-individual" key={doctor.id}>
                <dt>Name: {doctor.first_name} {doctor.last_name}</dt>
                <dt>Type: {doctor.prescriber_type}</dt>
                <dt>DEA: {doctor.dea}</dt>
                <dt>NPI: {doctor.npi}</dt>
                <dt>Phone: {doctor.contact_number}</dt>
                <div className="innderbuttons">
                  <button onClick={() => handleEdit(doctor)}>Edit</button>
                  <button className="deletebutton" onClick={() => handleDelete(doctor.id)}>Delete</button>
                </div>
              </dl>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;

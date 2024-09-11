// import React, { useState, useEffect } from "react";
// import NameField from '../components/NameField';
// import DoctorModal from '../modals/DoctorModal';
// import Save from '../SaveInfo';
// import StateDropdown from "../components/StatedDropdown";
// import DrType from '../components/DrTypeDropdown';
// import '../PatientPage.css';

// interface Doctor {
//   id: number;
//   first_name: string;
//   last_name: string;
//   prescriber_type: string;
//   dea: string;
//   npi: string;
//   contact_number: string;
//   street: string;
//   city: string;
//   state: string;
//   zipcode: string;
// }

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
//   const [dr, setdr] = useState<string>("");
//   const [zipcode, setZipCode] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [editingDoctorId, setEditingDoctorId] = useState<number | null>(null);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
//     event.preventDefault();

//     const doctorData = {
//       first_name: firstName,
//       last_name: lastName,
//       prescriber_type: drType,
//       street: street,
//       city: city,
//       dr: dr,
//       state: state,
//       zipcode: zipcode,
//       contact_number: phoneNumber,
//       dea: dea,
//       npi: npi,
//     };

//     const url = editingDoctorId
//       ? `http://localhost:8000/prescribers/${editingDoctorId}`
//       : "http://localhost:8000/prescribers";
//     const method = editingDoctorId ? "PATCH" : "POST";

//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(doctorData),
//     });

//     if (response.ok) {
//       console.log(`Prescriber information ${editingDoctorId ? 'updated' : 'saved'} successfully.`);
//       fetchDoctors(); // Refresh the list after adding/updating a doctor
//       if (editingDoctorId) {
//         setEditingDoctorId(null); // Reset after update
//         resetForm(); // Reset form fields after editing
//       }
//     } else {
//       console.error(`Failed to ${editingDoctorId ? 'update' : 'save'} prescriber information.`);
//     }
//   };

//   const fetchDoctors = async () => {
//     const response = await fetch("http://localhost:8000/prescribers", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setDoctors(data);
//     } else {
//       console.error("Failed to fetch doctors.");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const response = await fetch(`http://localhost:8000/prescribers/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       },
//     });
//     if (response.ok) {
//       console.log("Doctor deleted successfully.");
//       fetchDoctors(); // Refresh the list after deleting a doctor
//     } else {
//       console.error("Failed to delete doctor.");
//     }
//   };

//   const handleEdit = (doctor: Doctor) => {
//     setEditingDoctorId(doctor.id);
//     setFirstName(doctor.first_name);
//     setLastName(doctor.last_name);
//     setDrType(doctor.prescriber_type);
//     setDea(doctor.dea);
//     setPhoneNumber(doctor.contact_number);
//     setNpiNumber(doctor.npi);
//     setStreet(doctor.street);
//     setCity(doctor.city);
//     setdr(doctor.state);
//     setZipCode(doctor.zipcode);
//     window.scrollTo(0, 0); // Scroll to the top for editing
//   };

//   const resetForm = () => {
//     setFirstName('');
//     setLastName('');
//     setDrType('');
//     setDea('');
//     setPhoneNumber('');
//     setNpiNumber('');
//     setStreet('');
//     setCity('');
//     setdr('');
//     setZipCode('');
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   return (
//     <div className='homeformat'>
//       <div className='EnterNewRxInfo'>
//         <div className='patient-profile-fields'>
//           <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" />
//           <NameField Name='Dr Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
//           <DrType selectedDrType={dr} onChange={(e) => setdr(e.target.value)} />
//           <NameField Name='Dea' value={dea} onChange={(e) => setDea(e.target.value)} className="Rad" />
//           <NameField Name='Npi' value={npi} onChange={(e) => setNpiNumber(e.target.value)} className="Rad" />
//           <NameField Name='Phone #' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
//           <NameField Name='Street' value={street} onChange={(e) => setStreet(e.target.value)} className="Rad" />
//           <NameField Name='City' value={city} onChange={(e) => setCity(e.target.value)} className="Rad" />
//           <StateDropdown selectedState={state} onChange={(e) => setState(e.target.value)} />
//           <NameField Name='Zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="Rad" />
//         </div>
//         <div className='bottomfields'>
//           <Save Save={editingDoctorId ? 'Update' : 'Save'} onClick={handleClick} />
//           {/* <div className="outer-dr-button">
//             <label>Dr search</label>
//             <button className='modal-search-button' onClick={openModal}>🔍</button>
//             <DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
//           </div> */}
//         </div>
//       </div>
//       <div className="patient-profile-right-side">
//         {/* <div className="doctor-list-container">
//           <div className="outerscroll-rx"> */}
//         <div className="container mt-4">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">Doctor List</h5>
//             </div>
//             <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//               {doctors.map(doctor => (
//                 <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={doctor.id}>
//                   <dl className="row">
//                     <dt className="col-sm-3">Name:</dt>
//                     <dd className="col-sm-9">{doctor.first_name} {doctor.last_name}</dd>
//                     <dt className="col-sm-3">Type:</dt>
//                     <dd className="col-sm-9">{doctor.prescriber_type}</dd>
//                     <dt className="col-sm-3">DEA:</dt>
//                     <dd className="col-sm-9">{doctor.dea}</dd>
//                     <dt className="col-sm-3">NPI:</dt>
//                     <dd className="col-sm-9">{doctor.npi}</dd>
//                     <dt className="col-sm-3">Phone:</dt>
//                     <dd className="col-sm-9">{doctor.contact_number}</dd>
//                     <dt className="col-sm-3">id:</dt>
//                     <dd className="col-sm-9">{doctor.id}</dd>
//                   </dl>
//                   <div className="d-flex justify-content-end">
//                     <button onClick={() => handleEdit(doctor)} className="btn btn-primary me-2">
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(doctor.id)} className="btn btn-danger">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import DoctorModal from '../modals/DoctorModal';
import Save from '../SaveInfo';
import StateDropdown from "../components/StatedDropdown";
import DrType from '../components/DrTypeDropdown';
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
      state: state,  // Corrected: use 'state' here
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
    setDrType(doctor.prescriber_type); // Corrected: use 'drType'
    setDea(doctor.dea);
    setPhoneNumber(doctor.contact_number);
    setNpiNumber(doctor.npi);
    setStreet(doctor.street);
    setCity(doctor.city);
    setState(doctor.state); // Corrected: use 'state'
    setZipCode(doctor.zipcode);
    window.scrollTo(0, 0); // Scroll to the top for editing
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDrType(''); // Corrected: reset 'drType'
    setDea('');
    setPhoneNumber('');
    setNpiNumber('');
    setStreet('');
    setCity('');
    setState(''); // Corrected: reset 'state'
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
          <DrType selectedDrType={drType} onChange={(e) => setDrType(e.target.value)} /> {/* Corrected: link 'drType' */}
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
        </div>
      </div>
      <div className="patient-profile-right-side">
        <div className="container mt-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Doctor List</h5>
            </div>
            <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {doctors.map(doctor => (
                <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={doctor.id}>
                  <dl className="row">
                    <dt className="col-sm-3">Name:</dt>
                    <dd className="col-sm-9">{doctor.first_name} {doctor.last_name}</dd>
                    <dt className="col-sm-3">Type:</dt>
                    <dd className="col-sm-9">{doctor.prescriber_type}</dd>
                    <dt className="col-sm-3">DEA:</dt>
                    <dd className="col-sm-9">{doctor.dea}</dd>
                    <dt className="col-sm-3">NPI:</dt>
                    <dd className="col-sm-9">{doctor.npi}</dd>
                    <dt className="col-sm-3">Phone:</dt>
                    <dd className="col-sm-9">{doctor.contact_number}</dd>
                    <dt className="col-sm-3">id:</dt>
                    <dd className="col-sm-9">{doctor.id}</dd>
                  </dl>
                  <div className="d-flex justify-content-end">
                    <button onClick={() => handleEdit(doctor)} className="btn btn-primary me-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(doctor.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;

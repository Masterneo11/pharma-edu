// import React, { useState } from "react";
// import NameField from '../components/NameField';
// import QuickSearch from '../components/QuickSearch';
// import Save from '../SaveInfo'
// import Directions from "../components/Directions";
// import '../PatientPage.css'
// import PatientModal from "../modals/PatientModal";



// const NewRx: React.FC = () => {

//   const [rxQuantity, setRxQuantity] = useState<string>("");
//   const [rxRefills, setRxRefills] = useState<string>("");
//   const [dateOfRx, setDateOfRx] = useState<string>("");
//   const [doctorName, setDoctorName] = useState<string>("");
//   const [medicationSearch, setMedicationSearch] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const fetchRxItems = async () => {
//     const response = await fetch("http://localhost:8000/rx-items", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//     });

//     if (response.ok) {
//         const data = await response.json();
//         setRxItems(data);
//     } else {
//         console.error("Failed to fetch prescription items.");
//     }
//   };

//   useEffect(() => {
//       fetchRxItems();
//   }, []);

//   return (<> <div> <div className='homeformat'><div className='EnterNewRxInfo'><div className='Patient-Search'>
//     <QuickSearch Word='Patient Name' /> <button className='modal-search-button' onClick={openModal}>🔍</button><PatientModal isOpen={isModalOpen} onRequestClose={closeModal} /></div>
//     <div className="Patient-Search">
//       <QuickSearch Word='Patient D O B' /> <button className="modal-search-button" onClick={openModal}>🔍</button><PatientModal isOpen={isModalOpen} onRequestClose={closeModal} /></div>
//     <div className='fields'>
//       <NameField Name='Rx Quantity' value={rxQuantity} onChange={(e) => setRxQuantity(e.target.value)} className="Rad" />
//       <NameField Name='Rx Refills' value={rxRefills} onChange={(e) => setRxRefills(e.target.value)} className="Rad" />
//       <NameField Name='Date of Rx' value={dateOfRx} onChange={(e) => setDateOfRx(e.target.value)} className="Rad" />
//       <NameField Name='Doctor Name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="Rad" />
//       <NameField Name='Medication Search' value={medicationSearch} onChange={(e) => setMedicationSearch(e.target.value)} className="Rad" />
//     </div>
//     <div> <Directions Instruct="Directions" /></div>
//     <div className='bottomfields'><Save Save='Save' /><textarea placeholder="Tech initials" className="TechIns"></textarea>
//       <Save Save='enter' /></div>
//   </div><div className="homepagerightside">
//       <div className='scanImage'> Scan Image here.......... </div>
//       <div className="patientlist">

//         <div className="patientlisthomepage">

//         <div className="scrollable-rx-list">
//                         {rxItems.map(item => (
//                             <dl className="rx-items-individual" key={item.id}>
//                                 <dt className="rx-list-name">Name: {item.name}</dt>
//                                 <dt className="rx-list-strength">Strength: {item.strength},</dt>
//                                 <dt className="rx-list-ndc">NDC: {item.ndc}</dt>
//                             </dl>
//                         ))}
//                     </div>
//           <div className="patientlistsearchbar"><div className="patientlistdob">Patient Name</div><div className="patientlistname">DOB</div></div>
//           <div className="patientlistsearchbar"><div className="patientlistdob">Bob Smith</div><div className="patientlistname">05-08-2008</div></div>
//           <div className="patientlistsearchbar"><div className="patientlistdob">Jack williams</div><div className="patientlistname">10-9-1950</div></div>
//           <div className="patientlistsearchbar"><div className="patientlistdob">Sally Higgins</div><div className="patientlistname">06-04-2001</div></div>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>  </>
//   )
// };

// export default NewRx;

import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import QuickSearch from '../components/QuickSearch';
import Save from '../SaveInfo';
import Directions from "../components/Directions";
import '../PatientPage.css';
import PatientModal from "../modals/PatientModal";

const NewRx: React.FC = () => {
  const [rxQuantity, setRxQuantity] = useState<string>("");
  const [rxRefills, setRxRefills] = useState<string>("");
  const [dateOfRx, setDateOfRx] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [medicationSearch, setMedicationSearch] = useState<string>("");
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <div>
        <div className='homeformat'>
          <div className='EnterNewRxInfo'>
            <div className='Patient-Search'>
              <QuickSearch Word='Patient Name' />
              <button className='modal-search-button' onClick={openModal}>🔍</button>
              <PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>
            <div className="Patient-Search">
              <QuickSearch Word='Patient D O B' />
              <button className="modal-search-button" onClick={openModal}>🔍</button>
              <PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>
            <div className='fields'>
              <NameField Name='Rx Quantity' value={rxQuantity} onChange={(e) => setRxQuantity(e.target.value)} className="Rad" />
              <NameField Name='Rx Refills' value={rxRefills} onChange={(e) => setRxRefills(e.target.value)} className="Rad" />
              <NameField Name='Date of Rx' value={dateOfRx} onChange={(e) => setDateOfRx(e.target.value)} className="Rad" />
              <NameField Name='Doctor Name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="Rad" />
              <NameField Name='Medication Search' value={medicationSearch} onChange={(e) => setMedicationSearch(e.target.value)} className="Rad" />
            </div>
            <div>
              <Directions Instruct="Directions" />
            </div>
            <div className='bottomfields'>
              <Save Save='Save' />
              <textarea placeholder="Tech initials" className="TechIns"></textarea>
              <Save Save='enter' />
            </div>
          </div>
          <div className="homepagerightside">
            <div className='scanImage'> Scan Image here.......... </div>
            <div className="patientlist">
              <div className="patientlisthomepage">
                <div className="scrollable-patient-list">
                </div>
                <div className="patientlistsearchbar">

                  <div className="patientlistdob">Id</div>
                  <div className="patientlistdob">Patient Name</div>
                  <div className="patientlistname">DOB</div>
                </div>
                {/* Replace hardcoded data with dynamic rendering */}
                {patients.map(patient => (
                  <div className="patientlistsearchbar" key={patient.id}>
                    <div className="patientlistdob">{patient.id}</div>
                    <div className="patientlistdob">{patient.first_name} {patient.last_name}</div>
                    <div className="patientlistname">{patient.date_of_birth}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRx;

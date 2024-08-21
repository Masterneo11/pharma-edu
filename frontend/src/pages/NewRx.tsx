import React, { useState } from "react";
import NameField from '../components/NameField';
import QuickSearch from '../components/QuickSearch';
import Save from '../SaveInfo'
import Directions from "../components/Directions";
import '../PatientPage.css'
import PatientModal from "../modals/PatientModal";



const NewRx: React.FC = () => {

  const [rxQuantity, setRxQuantity] = useState<string>("");
  const [rxRefills, setRxRefills] = useState<string>("");
  const [dateOfRx, setDateOfRx] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [medicationSearch, setMedicationSearch] = useState<string>("");
  const [sigCode, setSigCode] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [modalIsOpen, setIsOpen] = useState(false);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  //   event.preventDefault();
  // }
  return (
    <> <div>
      <div className='homeformat'>
        <div className='BeginningHomePage'></div>
        <div className='EnterNewRxInfo'>
          <div className='Patient-Search'>
            <QuickSearch Word='Patient Name' /> <button className='modal-search-button' onClick={openModal}>🔍</button><PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
          <div className="Patient-Search">
            <QuickSearch Word='Patient D O B' /> <button className="modal-search-button" onClick={openModal}>🔍</button><PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
          <div className='fields'>
            <NameField Name='Rx Quantity' value={rxQuantity} onChange={(e) => setRxQuantity(e.target.value)} className="Rad" />
            <NameField Name='Rx Refills' value={rxRefills} onChange={(e) => setRxRefills(e.target.value)} className="Rad" />
            <NameField Name='Date of Rx' value={dateOfRx} onChange={(e) => setDateOfRx(e.target.value)} className="Rad" />
            <NameField Name='Doctor Name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="Rad" />
            <NameField Name='Medication Search' value={medicationSearch} onChange={(e) => setMedicationSearch(e.target.value)} className="Rad" />
            <NameField Name='Sig Code' value={sigCode} onChange={(e) => setSigCode(e.target.value)} className="Rad" />
            {/* the old way of the component below */}
            {/* <NameField Name='Rx Quantity' />  <NameField Name='Rx Refills' / <NameField Name='Date of Rx' />
              <NameField Name='Doctor Name' />  <NameField Name='Medication Search' />  <NameField Name='Sig Code' /> */}
          </div>
          <div>
            <Directions Instruct="Directions" />
          </div>
          <div className='bottomfields'>
            <Save Save='Save' />

            <textarea placeholder="Tech initials" className="TechIns"></textarea>
            <Save Save='enter' /></div>
        </div>
        <div className="homepagerightside">
          <div className='scanImage'> Scan Image here.......... </div>
          <div className="patientlist">
            <div className="patientlisthomepage">
              <div className="patientlistsearchbar"><div className="patientlistdob">Patient Name</div><div className="patientlistname">DOB</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Bob Smith</div><div className="patientlistname">05-08-2008</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Jack williams</div><div className="patientlistname">10-9-1950</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Sally Higgins</div><div className="patientlistname">06-04-2001</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>  </>
  )
};

export default NewRx;

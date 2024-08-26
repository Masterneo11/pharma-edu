import React, { useState } from "react";
import NameField from '../components/NameField';
import DoctorModal from '../modals/DoctorModal';
import Save from '../SaveInfo'
import '../PatientPage.css'

const Doctors: React.FC = () => {

  const [lastName, setLastName] = useState('');
  // const [firstName, setFirstName] = useState('');
  const [drType, setDrType] = useState('');
  const [address, setAddress] = useState('');
  const [dea, setDea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [npiNumber, setNpiNumber] = useState('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);




  return <>
    <div>
      <div className='homeformat'>
        {/* <div className='BeginningHomePage'></div> */}
        <div className='EnterNewRxInfo'>
          <div className='patient-profile-fields'>
            <NameField Name=' Dr Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
            {/* <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" /> */}
            <NameField Name='Dr. type' value={drType} onChange={(e) => setDrType(e.target.value)} className="Rad" />
            <NameField Name='Address' value={address} onChange={(e) => setAddress(e.target.value)} className="Rad" />
            <NameField Name='Dea' value={dea} onChange={(e) => setDea(e.target.value)} className="Rad" />
            <NameField Name='Phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="Rad" />
            <NameField Name='Npi number' value={npiNumber} onChange={(e) => setNpiNumber(e.target.value)} className="Rad" />
          </div>
          <div className='bottomfields'>  <Save Save='Save' />
            <div className="outer-dr-button">
              <label> Dr search</label>
              <button className='modal-search-button' onClick={openModal}>🔍</button><DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>
            <DoctorModal isOpen={isModalOpen} onRequestClose={closeModal} />
            <Save Save='enter' /></div>
        </div>
        <div className="patient-profile-right-side">
          <div className="patientlist">
            <div className='patient-profile-fields'>
            </div>
          </div>
        </div>
      </div>
    </div></>;;
};

export default Doctors;

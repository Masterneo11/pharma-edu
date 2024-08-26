import React, { useState } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo'
import '../PatientPage.css';


const PatientProfile: React.FC = () => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [primaryDr, setprimaryDR] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [editAllergies, seteditAllergies] = useState<string>("");
  const [Bin, setBin] = useState<string>("");
  const [PCN, setPCN] = useState<string>("");
  const [personCode, setPersonCode] = useState<string>("");
  const [IdNumber, setIdNumber] = useState<string>("");
  const [GroupNumber, setGroupNumber] = useState<string>("");

  return <>
    <div>
      <div className='homeformat'>
        {/* <div className='BeginningHomePage'></div> */}
        <div className='EnterNewRxInfo'>
          <div className='patient-profile-fields'>
            <NameField Name='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="Rad" />
            <NameField Name='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="Rad" />
            <NameField Name='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} className="Rad" />
            <NameField Name='Primary doctor' value={primaryDr} onChange={(e) => setprimaryDR(e.target.value)} className="Rad" />
            <NameField Name='Allergies' value={allergies} onChange={(e) => setAllergies(e.target.value)} className="Rad" />
            <NameField Name='Edit allergies ' value={editAllergies} onChange={(e) => seteditAllergies(e.target.value)} className="Rad" />
          </div>
          <div className='bottomfields'>
            <Save Save='Save' />

            <Save Save='enter' /></div>
        </div>
        <div className="patient-profile-right-side">

          <div className="patientlist">
            <div className='patient-profile-fields'>
              <NameField Name='Bin' value={Bin} onChange={(e) => setBin(e.target.value)} className="Rad" />
              <NameField Name='PCN' value={PCN} onChange={(e) => setPCN(e.target.value)} className="Rad" />
              <NameField Name='Person Code' value={personCode} onChange={(e) => setPersonCode(e.target.value)} className="Rad" />
              <NameField Name='# ID' value={IdNumber} onChange={(e) => setIdNumber(e.target.value)} className="Rad" />
              <NameField Name='Group #' value={GroupNumber} onChange={(e) => setGroupNumber(e.target.value)} className="Rad" />
            </div>
            <div className="patient-profile-list">
              <div className="patientlistsearchbar"><div className="patientlistdob">Patient Name</div><div className="patientlistname">DOB</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Bob Smith</div><div className="patientlistname">05-08-2008</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Jack williams</div><div className="patientlistname">10-9-1950</div></div>
              <div className="patientlistsearchbar"><div className="patientlistdob">Sally Higgins</div><div className="patientlistname">06-04-2001</div></div>
            </div>
          </div>

        </div>
      </div>
    </div></>;
};

export default PatientProfile;


import React, { useState } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo'
import '../PatientPage.css';



const MedicationProfile: React.FC = () => {

    const [rxName, setRxName] = useState<string>("");

    return <>
        <div>
            <div className='homeformat'>
                {/* <div className='BeginningHomePage'></div> */}
                <div className='EnterNewRxInfo'>
                    <div className='patient-profile-fields'>
                        <NameField Name='Rx  Name' className="Rad" value={rxName} onChange={(e) => setRxName(e.target.value)} />
                        <NameField Name='Rx Strength' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
                        <NameField Name='NDC' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
                        <NameField Name='Expiration' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
                        <NameField Name='Lot Number' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
                    </div>
                    <div className='bottomfields'> <Save Save='Save' />  <Save Save='enter' /></div>
                </div>
                <div className="patient-profile-right-side">
                    <div className="patientlist">
                    </div>
                </div>
            </div>
        </div></>;
};


export default MedicationProfile;

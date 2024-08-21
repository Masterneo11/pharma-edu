import React, { useState } from 'react';
import Modal from 'react-modal';

import Name from '../components/NameField';

Modal.setAppElement('#root');

const DoctorModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({ isOpen, onRequestClose }) => {
    // const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [DOB, setDOB] = useState<string>("");
    const [phoneNumber, setPhonenumber] = useState<string>("");
    const [Address, setAddress] = useState<string>("");
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Quick Search Modal"
            className="modal"
            overlayClassName="overlay">
            <div className='pat-entry'>Dr search entry system:</div>
            {/* Add your quick search form or content here */}
            {/* <button onClick={onRequestClose}>Close</button> */}
            <div className='modal-content'>
                <div className="inner-modal-left">
                    <div className='modal-entry-info-left'>
                        <div>
                            {/* <Name Name='Last Name: ' value={lastName} onChange={(e) => setLastName(e.target.value)} className='color' /> */}
                            <Name Name='Dr Name : ' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='color' />
                            <Name Name='Dr office : ' value={DOB} onChange={(e) => setDOB(e.target.value)} className='color' />
                            <Name Name='Phone Number: ' value={phoneNumber} onChange={(e) => setPhonenumber(e.target.value)} className='color' />
                            <Name Name='Address:' value={Address} onChange={(e) => setAddress(e.target.value)} className='color' />
                        </div>
                        <button className='Modal-save-button'> Add Patient </button>
                        <button className='close' onClick={onRequestClose} >Close</button>
                    </div>
                </div>
                <div className='inner-modal-right'></div>
            </div>
        </Modal>
    );
};
export default DoctorModal;
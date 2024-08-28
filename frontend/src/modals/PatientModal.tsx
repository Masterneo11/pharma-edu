import React, { useState } from 'react';
import Modal from 'react-modal';
import Name from '../components/NameField';

Modal.setAppElement('#root');

const PatientModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({ isOpen, onRequestClose }) => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [DOB, setDOB] = useState<string>("");
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Quick Search Modal"
            className="modal"
            overlayClassName="overlay">
            <div className='pat-entry'>Patient Info entry system:</div>
            <div className='modal-content'>
                <div className="inner-modal-left">
                    <div className='modal-entry-info-left'>
                        <div>
                            <Name Name='Last Name: ' value={lastName} onChange={(e) => setLastName(e.target.value)} className='color' />
                            <Name Name='First Name: ' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='color' />
                            <Name Name='DOB: ' value={DOB} onChange={(e) => setDOB(e.target.value)} className='color' />
                        </div>
                        <button className='Modal-save-button'> Add Patient </button>
                        <button className='close' onClick={onRequestClose} >Close</button>
                    </div>
                </div>
                <div className='inner-modal-right'>h</div>
            </div>
        </Modal>
    );
};
export default PatientModal;
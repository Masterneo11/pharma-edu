import React, { useState } from 'react';
import Modal from 'react-modal';
import Name from '../components/NameField';

Modal.setAppElement('#root');

const RxSearchModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({ isOpen, onRequestClose }) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientNumber, setPatientNumber] = useState<string>("");
    const [rxNumber, setrxNumber] = useState<string>("");
    const [prescribingOffice, setprescribingOffice] = useState<string>("");
    const [prescribingDr, setprescribingDr] = useState<string>("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Quick Search Modal"
            className="modal"
            overlayClassName="overlay">
            <div className='pat-entry'>Rx Search entry system:</div>
            <div className='modal-content'>
                <div className="inner-modal-left">
                    <div className='modal-entry-info-left'>
                        <div>
                            <Name Name='Patient Name : ' value={patientName} onChange={(e) => setPatientName(e.target.value)} className='color' />
                            <Name Name='Patient phone' value={patientNumber} onChange={(e) => setPatientNumber(e.target.value)} className='color' />
                            <Name Name='Rx # : ' value={rxNumber} onChange={(e) => setrxNumber(e.target.value)} className='color' />
                            <Name Name='Prescribing office :' value={prescribingOffice} onChange={(e) => setprescribingOffice(e.target.value)} className='color' />
                            <Name Name='Prescribing Dr :' value={prescribingDr} onChange={(e) => setprescribingDr(e.target.value)} className='color' />
                        </div>
                        <button className='Modal-save-button'> Add Rx item </button>
                        <button className='close' onClick={onRequestClose} >Close</button>
                    </div>
                </div>
                <div className='inner-modal-right'>h</div>
            </div>
        </Modal>

    );
};
export default RxSearchModal;
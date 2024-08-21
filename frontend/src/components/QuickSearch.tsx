import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
interface SearchWord {
    Word: string
}
const PatientModal: React.FC<SearchWord> = ({ Word }) => {





    return (
        <div className='PatientSearch'>
            <label id="PatSar" htmlFor='input'> {Word}</label>
            <input
                type='string'
                id='input'
                className='quickinput'></input>
            <button className='enter'>Search</button>
        </div>
    );
}
export default PatientModal;
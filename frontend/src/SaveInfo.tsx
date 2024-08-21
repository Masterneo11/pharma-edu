import React from 'react';

interface interfaceSaveInfo {
    Save: string
}
const SaveInfo: React.FC<interfaceSaveInfo> = ({ Save }) => {
    return (
        <div className='Savediv'>
            <button className='Save'>{Save}</button>
        </div>
    );
}
export default SaveInfo;
import React from 'react';

type interfaceSaveInfo = {
    Save: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

}
const SaveInfo: React.FC<interfaceSaveInfo> = ({ Save, onClick }) => {
    return (
        <button onClick={onClick} className="save-button">
            {Save}
        </button>
    );
}
export default SaveInfo;




import React from 'react';

interface InterfaceName {
    Name: string;
    className?: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const NameField: React.FC<InterfaceName> = ({ Name, className, onChange, value }) => {

    return (
        <>
            <div className='NameField'>
                <label htmlFor='Name'>{Name}</label>
                <input
                    id='Name'
                    className={className}
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}
export default NameField;
import React from 'react';

interface InterfaceName {
    Name: string;
    className?: string;
    value: string | undefined | number;
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


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './NameField.css';


// interface InterfaceName {
//     Name: string;
//     className?: string;
//     value: string | undefined | number;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const NameField: React.FC<InterfaceName> = ({ Name, className, onChange, value }) => {
//     return (
//         <div className='mb-3'> {/* Bootstrap margin bottom utility */}
//             <label htmlFor='Name' className='form-label'>{Name}</label> {/* Bootstrap form label */}
//             <input
//                 id='Name'
//                 className={`form-control ${className}`} // Bootstrap form control with custom class
//                 type="text"
//                 value={value}
//                 onChange={onChange}
//             />
//         </div>
//     );
// }

// export default NameField;

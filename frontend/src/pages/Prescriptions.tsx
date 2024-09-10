
// import React, { useState, useEffect } from 'react';

// // Prescription Interface matching the backend response
// interface PrescriptionBasicInfo {
//     rx_number: string;
//     first_name: string;
//     last_name: string;
//     date_of_birth: string;
// }

// const PrescriptionManagement: React.FC = () => {
//     const [prescriptions, setPrescriptions] = useState<PrescriptionBasicInfo[]>([]);
//     const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionBasicInfo | null>(null);
//     const [formState, setFormState] = useState({
//         rx_number: '',
//         first_name: '',
//         last_name: '',
//         date_of_birth: '',
//     });

//     useEffect(() => {
//         fetchPrescriptions();
//     }, []);

//     const fetchPrescriptions = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/prescriptions');
//             const data = await response.json();
//             console.log(data); // Debugging: check what data is returned
//             setPrescriptions(Array.from(data)); // Ensure data is converted from a map to an array
//         } catch (error) {
//             console.error('Error fetching prescriptions', error);
//         }
//     };

//     const handleEdit = (prescription: PrescriptionBasicInfo) => {
//         setSelectedPrescription(prescription);
//         setFormState({
//             rx_number: prescription.rx_number,
//             first_name: prescription.first_name,
//             last_name: prescription.last_name,
//             date_of_birth: prescription.date_of_birth,
//         });
//     };

//     const handleDelete = async (rx_number: string) => {
//         try {
//             await fetch(`http://localhost:8000/prescriptions/${rx_number}`, {
//                 method: 'DELETE',
//             });
//             fetchPrescriptions(); // Refetch the prescriptions after deletion
//         } catch (error) {
//             console.error('Error deleting prescription', error);
//         }
//     };

//     const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormState((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleEditSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!selectedPrescription) return;

//         try {
//             await fetch(`http://localhost:8000/prescriptions/${selectedPrescription.rx_number}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formState),
//             });
//             fetchPrescriptions(); // Refetch after updating
//             setSelectedPrescription(null); // Clear form after submitting
//         } catch (error) {
//             console.error('Error updating prescription', error);
//         }
//     };

//     return (
//         <div className='homeformat'>
//             <div className='EnterNewRxInfo'>
//                 <div>
//                     <h2>Prescription Management</h2>

//                     {/* Check if there are prescriptions */}
//                     <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                         {prescriptions.length === 0 ? (
//                             <p>No prescriptions found</p>
//                         ) : (
//                             prescriptions.map((prescription) => (
//                                 <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={prescription.rx_number}>
//                                     <dl className="row">
//                                         <dt className="col-sm-3">Rx Number:</dt>
//                                         <dd className="col-sm-9">{prescription.rx_number}</dd>

//                                         <dt className="col-sm-3">First Name:</dt>
//                                         <dd className="col-sm-9">{prescription.first_name}</dd>

//                                         <dt className="col-sm-3">Last Name:</dt>
//                                         <dd className="col-sm-9">{prescription.last_name}</dd>

//                                         <dt className="col-sm-3">Date of Birth:</dt>
//                                         <dd className="col-sm-9">{prescription.date_of_birth}</dd>
//                                     </dl>
//                                     <div className="d-flex justify-content-end">
//                                         <button onClick={() => handleEdit(prescription)} className="btn btn-primary me-2">
//                                             Edit
//                                         </button>
//                                         <button onClick={() => handleDelete(prescription.rx_number)} className="btn btn-danger">
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* Edit form logic */}
//                     {selectedPrescription && (
//                         <form onSubmit={handleEditSubmit}>
//                             <h3>Edit Prescription</h3>

//                             <div className="form-group">
//                                 <label>Rx Number</label>
//                                 <input
//                                     type="text"
//                                     name="rx_number"
//                                     value={formState.rx_number}
//                                     onChange={handleFormChange}
//                                     className="form-control"
//                                     readOnly // We assume that the Rx Number is not editable
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>First Name</label>
//                                 <input
//                                     type="text"
//                                     name="first_name"
//                                     value={formState.first_name}
//                                     onChange={handleFormChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Last Name</label>
//                                 <input
//                                     type="text"
//                                     name="last_name"
//                                     value={formState.last_name}
//                                     onChange={handleFormChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Date of Birth</label>
//                                 <input
//                                     type="text"
//                                     name="date_of_birth"
//                                     value={formState.date_of_birth}
//                                     onChange={handleFormChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-success mt-2">
//                                 Save Changes
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PrescriptionManagement;

import React, { useState, useEffect } from 'react';
import NameField from '../components/NameField';

interface PrescriptionBasicInfo {
    rx_number: string;
    patient_id: number;
    prescriber_id: number;
    prescribed_date: string;
    rx_item_id: number;
    directions: string;
    quantity: number;
    quantity_dispensed: number;
    refills: number;
    status: string;
    tech_initials: string;
}

const PrescriptionManagement: React.FC = () => {
    const [prescriptions, setPrescriptions] = useState<PrescriptionBasicInfo[]>([]);
    const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionBasicInfo | null>(null);
    const [formState, setFormState] = useState({
        patient_id: 0,
        prescriber_id: 0,
        prescribed_date: '',
        rx_item_id: 0,
        directions: '',
        quantity: 0,
        quantity_dispensed: 0,
        refills: 0,
        status: 'pending',
        tech_initials: '',
    });

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const response = await fetch('http://localhost:8000/prescriptions');
            const data = await response.json();
            setPrescriptions(Array.from(data)); // Convert map to array if needed
        } catch (error) {
            console.error('Error fetching prescriptions', error);
        }
    };

    const handleEdit = (prescription: PrescriptionBasicInfo) => {
        setSelectedPrescription(prescription);
        setFormState({
            patient_id: prescription.patient_id,
            prescriber_id: prescription.prescriber_id,
            prescribed_date: prescription.prescribed_date,
            rx_item_id: prescription.rx_item_id,
            directions: prescription.directions,
            quantity: prescription.quantity,
            quantity_dispensed: prescription.quantity_dispensed,
            refills: prescription.refills,
            status: prescription.status,
            tech_initials: prescription.tech_initials,
        });
    };

    const handleDelete = async (rx_number: string) => {
        try {
            await fetch(`http://localhost:8000/prescriptions/${rx_number}`, {
                method: 'DELETE',
            });
            fetchPrescriptions(); // Refetch after deletion
        } catch (error) {
            console.error('Error deleting prescription', error);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPrescription) return;

        try {
            await fetch(`http://localhost:8000/prescriptions/${selectedPrescription.rx_number}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });
            fetchPrescriptions(); // Refetch after updating
            setSelectedPrescription(null); // Clear form after submitting
        } catch (error) {
            console.error('Error updating prescription', error);
        }
    };

    return (
        <div className='homeformat'>
            <div className='EnterNewRxInfo'>
                <div>
                    <h2>Prescription Management</h2>

                    {/* Check if there are prescriptions */}
                    <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {prescriptions.length === 0 ? (
                            <p>No prescriptions found</p>
                        ) : (
                            prescriptions.map((prescription) => (
                                <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={prescription.rx_number}>
                                    <dl className="row">
                                        <dt className="col-sm-3">Rx Number:</dt>
                                        <dd className="col-sm-9">{prescription.rx_number}</dd>

                                        <dt className="col-sm-3">Patient ID:</dt>
                                        <dd className="col-sm-9">{prescription.patient_id}</dd>

                                        <dt className="col-sm-3">Prescriber ID:</dt>
                                        <dd className="col-sm-9">{prescription.prescriber_id}</dd>

                                        <dt className="col-sm-3">Prescribed Date:</dt>
                                        <dd className="col-sm-9">{prescription.prescribed_date}</dd>

                                        <dt className="col-sm-3">Directions:</dt>
                                        <dd className="col-sm-9">{prescription.directions}</dd>

                                        <dt className="col-sm-3">Quantity:</dt>
                                        <dd className="col-sm-9">{prescription.quantity}</dd>

                                        <dt className="col-sm-3">Quantity Dispensed:</dt>
                                        <dd className="col-sm-9">{prescription.quantity_dispensed}</dd>

                                        <dt className="col-sm-3">Refills:</dt>
                                        <dd className="col-sm-9">{prescription.refills}</dd>

                                        <dt className="col-sm-3">Status:</dt>
                                        <dd className="col-sm-9">{prescription.status}</dd>

                                        <dt className="col-sm-3">Technician Initials:</dt>
                                        <dd className="col-sm-9">{prescription.tech_initials}</dd>
                                    </dl>
                                    <div className="d-flex justify-content-end">
                                        <button onClick={() => handleEdit(prescription)} className="btn btn-primary me-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(prescription.rx_number)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Edit form logic */}
                    {selectedPrescription && (
                        <form onSubmit={handleEditSubmit}>
                            <h3>Edit Prescription</h3>

                            <div className="form-group">
                                <label>Patient ID</label>
                                <input
                                    type="number"
                                    name="patient_id"
                                    value={formState.patient_id}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Prescriber ID</label>
                                <input
                                    type="number"
                                    name="prescriber_id"
                                    value={formState.prescriber_id}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>





                            <div className="form-group">

                                <input
                                    type="string"
                                    name="prescribed_date"
                                    value={formState.prescribed_date}
                                    onChange={handleFormChange}
                                    className="Rad"
                                />

                            </div>
                            <div className="form-group">
                                <label>Rx Item ID</label>
                                <input
                                    type="number"
                                    name="rx_item_id"
                                    value={formState.rx_item_id}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Directions</label>
                                <input
                                    type="text"
                                    name="directions"
                                    value={formState.directions}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formState.quantity}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantity Dispensed</label>
                                <input
                                    type="number"
                                    name="quantity_dispensed"
                                    value={formState.quantity_dispensed}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Refills</label>
                                <input
                                    type="number"
                                    name="refills"
                                    value={formState.refills}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={formState.status}
                                    onChange={handleFormChange}
                                    className="form-control"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="filled">Filled</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Technician Initials</label>
                                <input
                                    type="text"
                                    name="tech_initials"
                                    value={formState.tech_initials}
                                    onChange={handleFormChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrescriptionManagement;



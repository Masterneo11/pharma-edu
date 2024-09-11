
import React, { useState, useEffect } from 'react';
import NameField from '../components/NameField';

interface Prescription {
    rx_number: number;
    directions: string;
    quantity: number;
    refills: number;
    tech_initials: string;
    patient_id: number;
    prescriber_id: number;
    prescribed_date: string;
    rxitem: number;
    quantity_dispensed: number;
    status: string;
}

const PrescriptionManagement: React.FC = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [rxNumber, setRxNumber] = useState<number>(8);
    const [directions, setDirections] = useState<string>("Take as prescribed");
    const [quantity, setQuantity] = useState<number>(0);
    const [refills, setRefills] = useState<number>(0);
    const [techInitials, setTechInitials] = useState<string>("");
    const [patientId, setPatientId] = useState<number>(26);
    const [prescriberId, setPrescriberId] = useState<number>(13);
    const [prescribedDate, setPrescribedDate] = useState<string>("2005-05-05");
    const [rxItemId, setRxItemId] = useState<number>(22);
    const [quantityDispensed, setQuantityDispensed] = useState<number>(0);
    const [status, setStatus] = useState<string>("pending");
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [fetchId, setFetchId] = useState<number | null>(null);
    const [prescriptionArrayInfo, setPresctiptionarrayInfo] = useState<Prescription[]>([])


    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();

        const prescriptionData = {
            rx_number: rxNumber,
            directions: directions,
            quantity: quantity,
            refills: refills,
            tech_initials: techInitials,
            patient_id: patientId,
            prescriber_id: prescriberId,
            prescribed_date: prescribedDate,
            rxitem: rxItemId,
            quantity_dispensed: quantityDispensed,
            status: status,
        };

        const url = `http://localhost:8000/prescriptions/${rxNumber}`;
        const method = "PATCH";
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prescriptionData),
        });


        if (response.ok) {
            fetchPrescriptions();
        }
    };
    const handleClickIdInfo = async (prescriptionId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/prescriptions/${prescriptionId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prescription details.");
            }

            const data = await response.json();
            console.log("Prescription data:", data);
            // Update state with fetched data, e.g., setPrescription(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const response = await fetch(`http://localhost:8000/prescriptions`);
            // const response = await fetch(`http://localhost:8000/prescription/${prescription.rxitem}`);

            const data = await response.json();
            console.log(data); // Debugging: check what data is returned
            setPrescriptions(Array.isArray(data) ? data : []); // Ensure data is converted from a map to an array
            // const arrayss = [];
            // for (let i = 0; i < data.length ; i ++) {
            //     const specificPresInfo = await fetch(`http://localhost:8000/prescriptions/${data[i].rx_number}`);
            //     const pareseinfo =await specificPresInfo.json();
            //     arrayss.push(pareseinfo);

            // }
            // setPresctiptionarrayInfo(arrayss)


        } catch (error) {
            console.error('Error fetching prescriptions', error);
        }


    };
    const handleEdit = async (prescription: Prescription) => {
        const response = await fetch(`http://localhost:8000/prescriptions/${prescription.rx_number}`);
        const data = await response.json();

        setSelectedPrescription(data);
        setRxNumber(data.rx_number);
        setDirections(data.directions);
        setQuantity(data.quantity);
        setRefills(data.refills);
        setTechInitials(data.tech_initials);
        setPatientId(data.patient_id);
        setPrescriberId(data.prescriber_id);
        setPrescribedDate(data.prescribed_date);
        setRxItemId(data.rx_item_id);
        setQuantityDispensed(data.quantity_dispensed);
        setStatus(data.status);
    };

    const handleDelete = async (rxNumber: number) => {
        try {
            await fetch(`http://localhost:8000/prescriptions/${rxNumber}`, {
                method: 'DELETE',
            });
            fetchPrescriptions(); // Refetch the prescriptions after deletion
        } catch (error) {
            console.error('Error deleting prescription', error);
        }
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
                body: JSON.stringify({
                    patientId: patientId,
                    prescriber_id: prescriberId,
                    prescribed_date: prescribedDate,
                    rxitem: rxItemId,
                    directions: directions,
                    quantity: quantity,
                    quantity_dispensed: quantityDispensed,
                    refills: refills,
                    status: status,
                    tech_initials: techInitials,

                }),
            });
            fetchPrescriptions(); // Refetch after updating
            setSelectedPrescription(null); // Clear form after submitting
        } catch (error) {
            console.error('Error updating prescription', error);
        }
    };

    // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     switch (name) {
    //         case 'rx_number':
    //             setRxNumber(Number(value));
    //             break;
    //         case 'directions':
    //             setDirections(value);
    //             break;
    //         case 'quantity':
    //             setQuantity(Number(value));
    //             break;
    //         case 'refills':
    //             setRefills(Number(value));
    //             break;
    //         case 'tech_initials':
    //             setTechInitials(value);
    //             break;
    //         case 'patient_id':
    //             setPatientId(Number(value));
    //             break;
    //         case 'prescriber_id':
    //             setPrescriberId(Number(value));
    //             break;
    //         case 'prescribed_date':
    //             setPrescribedDate(value);
    //             break;
    //         case 'rx_item_id':
    //             setRxItemId(Number(value));
    //             break;
    //         case 'quantity_dispensed':
    //             setQuantityDispensed(Number(value));
    //             break;
    //         case 'status':
    //             setStatus(value);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    return (
        <>
            <div className='homeformat'>
                <div>
                    <h2>Prescription Management</h2>

                    <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxWidth: '800px', maxHeight: '400px', overflowY: 'auto' }}>
                        {prescriptions.length === 0 ? (
                            <p>No prescriptions found</p>
                        ) : (
                            prescriptions.map((prescription) => (
                                <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={prescription.rx_number}>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="fw-bold">Rx Number:</p>
                                            <p>{prescription.rx_number}</p>
                                        </div>
                                        <div className="col-sm-3">
                                            <p className="fw-bold">First Name:</p>
                                            <p>{prescription.first_name}</p>
                                        </div>
                                        <div className="col-sm-3">
                                            <p className="fw-bold">Last Name:</p>
                                            <p>{prescription.last_name}</p>
                                        </div>
                                        <div className="col-sm-3">
                                            <p className="fw-bold">Date of Birth:</p>
                                            <p>{prescription.date_of_birth}</p>
                                        </div>


                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button onClick={() => handleEdit(prescription)} className="btn btn-primary me-2">Edit</button>
                                        <button onClick={() => handleDelete(prescription.rx_number)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {selectedPrescription && (
                        <form onSubmit={handleEditSubmit} className="mt-4">
                            <div className="row mt-2"><div className="col-md-4">
                            </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                            <div className="row mt-2"><div className="col-md-6">
                                <NameField Name="Patient ID" value={patientId} onChange={(e) => setPatientId(Number(e.target.value))} className="Rad" />
                                <NameField Name="doctor id" value={prescriberId} onChange={(e) => setPrescriberId(Number(e.target.value))} className="Rad" />

                            </div></div>
                            <NameField Name="Prescribed Date" value={prescribedDate} onChange={(e) => setPrescribedDate(e.target.value)} className="Rad" />
                            <NameField Name="Rx Item ID" value={rxItemId} onChange={(e) => setRxItemId(Number(e.target.value))} className="Rad" />
                            <NameField Name="directions" value={directions} onChange={(e) => setDirections(e.target.value)} className="Rad" />
                            <NameField Name="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="Rad" />
                            <NameField Name="Quantity Dispensed" value={quantityDispensed} onChange={(e) => setQuantityDispensed(Number(e.target.value))} className="Rad" />

                            <NameField Name="Refills" value={refills} onChange={(e) => setRefills(Number(e.target.value))} className="Rad" />
                            <NameField Name="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="Rad" />
                            <NameField Name="Tech Initials" value={techInitials} onChange={(e) => setTechInitials(e.target.value)} className="Rad" />
                            <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default PrescriptionManagement;



















// import React, { useState, useEffect } from 'react';

// interface Prescription {
//     rx_number: number;
//     directions: string;
//     quantity: number;
//     refills: number;
//     tech_initials: string;
//     patient_id: number;
//     prescriber_id: number;
//     prescribed_date: string;
//     rx_item_id: number;
//     quantity_dispensed: number;
//     status: string;
// }

// const PrescriptionManagement: React.FC = () => {
//     const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//     const [rxNumber, setRxNumber] = useState<number>(8);
//     const [directions, setDirections] = useState<string>("Take as prescribed");
//     const [quantity, setQuantity] = useState<number>(0);
//     const [refills, setRefills] = useState<number>(0);
//     const [techInitials, setTechInitials] = useState<string>("");
//     const [patientId, setPatientId] = useState<number>(26);
//     const [prescriberId, setPrescriberId] = useState<number>(13);
//     const [prescribedDate, setPrescribedDate] = useState<string>("2005-05-05");
//     const [rxItemId, setRxItemId] = useState<number>(22);
//     const [quantityDispensed, setQuantityDispensed] = useState<number>(0);
//     const [status, setStatus] = useState<string>("pending");
//     const [editID, seteditID] = useState<number>(0);

//     const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
//         event.preventDefault();


//         const prescriptionData = {
//             rxNumber: rxNumber,
//             directions: directions,
//             quantity: quantity,
//             refills: refills,
//             techInitials: techInitials,
//             patientId: patientId,
//             prescriberId: prescriberId,
//             prescribedDate: prescribedDate,
//             rxItemId: rxItemId,
//             quantityDispensed: quantityDispensed,
//             status: status,
//         };

//         const url = editID
//             `http:localhost:8000/prescriprtions/${editID}`
//         const method = editID "PATCH";
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-Type:" "application/json"
//             },
//             body: JSON.stringify(prescriptionData)
//         });



//         useEffect(() => {
//             fetchPrescriptions();
//         }, []);

//         const fetchPrescriptions = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/prescriptions');
//                 const data = await response.json();
//                 console.log(data); // Debugging: check what data is returned
//                 setPrescriptions(Array.isArray(data) ? data : []); // Ensure data is converted from a map to an array
//             } catch (error) {
//                 console.error('Error fetching prescriptions', error);
//             }
//         };

//         const handleEdit = (prescription: Prescription) => {
//             setSelectedPrescription(prescription);
//             setRxNumber(prescription.rx_number);
//             setDirections(prescription.directions);
//             setQuantity(prescription.quantity);
//             setRefills(prescription.refills);
//             setTechInitials(prescription.tech_initials);
//             setPatientId(prescription.patient_id);
//             setPrescriberId(prescription.prescriber_id);
//             setPrescribedDate(prescription.prescribed_date);
//             setRxItemId(prescription.rx_item_id);
//             setQuantityDispensed(prescription.quantity_dispensed);
//             setStatus(prescription.status);
//         };

//         const handleDelete = async (rxNumber: number) => {
//             try {
//                 await fetch(`http://localhost:8000/prescriptions/${rxNumber}`, {
//                     method: 'DELETE',
//                 });
//                 fetchPrescriptions(); // Refetch the prescriptions after deletion
//             } catch (error) {
//                 console.error('Error deleting prescription', error);
//             }
//         };


//         const handleEditSubmit = async (e: React.FormEvent) => {
//             e.preventDefault();
//             if (!selectedPrescription) return;

//             try {
//                 await fetch(`http://localhost:8000/prescriptions/${selectedPrescription.rx_number}`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         rx_number: rxNumber,
//                         directions,
//                         quantity,
//                         refills,
//                         tech_initials: techInitials,
//                         patient_id: patientId,
//                         prescriber_id: prescriberId,
//                         prescribed_date: prescribedDate,
//                         rx_item_id: rxItemId,
//                         quantity_dispensed: quantityDispensed,
//                         status
//                     }),
//                 });
//                 fetchPrescriptions(); // Refetch after updating
//                 setSelectedPrescription(null); // Clear form after submitting
//             } catch (error) {
//                 console.error('Error updating prescription', error);
//             }
//         };

//         return (
//             <>
//                 <div className='homeformat'>
//                     <div>
//                         <h2>Prescription Management</h2>

//                         <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxWidth: '800px', maxHeight: '400px', overflowY: 'auto' }}>
//                             {prescriptions.length === 0 ? (
//                                 <p>No prescriptions found</p>
//                             ) : (
//                                 prescriptions.map((prescription) => (
//                                     <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={prescription.rx_number}>
//                                         <div className="row">
//                                             <div className="col-sm-3">
//                                                 <p className="fw-bold">Rx Number:</p>
//                                                 <p>{prescription.rx_number}</p>
//                                             </div>
//                                             <div className="col-sm-3">
//                                                 <p className="fw-bold">First Name:</p>
//                                                 <p>{prescription.first_name}</p>
//                                             </div>
//                                             <div className="col-sm-3">
//                                                 <p className="fw-bold">Last Name:</p>
//                                                 <p>{prescription.last_name}</p>
//                                             </div>
//                                             <div className="col-sm-3">
//                                                 <p className="fw-bold">Date of Birth:</p>
//                                                 <p>{prescription.date_of_birth}</p>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex justify-content-end">
//                                             <button onClick={() => handleEdit(prescription)} className="btn btn-primary me-2">Edit</button>
//                                             <button onClick={() => handleDelete(prescription.rx_number)} className="btn btn-danger">Delete</button>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>

//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="form-group"><label>Rx Number</label><input type="text" name="rx_number" value={rxNumber} onChange={handleFormChange} className="Rad" readOnly /></div>
//                                         <div className="form-group"><label>Patient ID</label><input type="number" name="patient_id" value={patientId} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Prescriber ID</label><input type="number" name="prescriber_id" value={prescriberId} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Prescribed Date</label><input type="date" name="prescribed_date" value={prescribedDate} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Rx Item ID</label><input type="number" name="rx_item_id" value={rxItemId} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Directions</label><input type="text" name="directions" value={directions} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Quantity</label><input type="number" name="quantity" value={quantity} onChange={handleFormChange} className="Rad" /></div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group"><label>Quantity Dispensed</label><input type="number" name="quantity_dispensed" value={quantityDispensed} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Refills</label><input type="number" name="refills" value={refills} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Status</label><select name="status" value={status} onChange={handleFormChange} className="Rad"><option value="pending">Pending</option><option value="filled">Filled</option><option value="canceled">Canceled</option></select></div>
//                                         <div className="form-group"><label>Technician Initials</label><input type="text" name="tech_initials" value={techInitials} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>First Name</label><input type="text" name="first_name" value={formState.first_name} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Last Name</label><input type="text" name="last_name" value={formState.last_name} onChange={handleFormChange} className="Rad" /></div>
//                                         <div className="form-group"><label>Date of Birth</label><input type="date" name="date_of_birth" value={formState.date_of_birth} onChange={handleFormChange} className="Rad" /></div>
//                                     </div>
//                                 </div>
//                                 <button type="submit" className="btn btn-success mt-3">Save Changes</button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </>
//         );
//     };

//     export default PrescriptionManagement;

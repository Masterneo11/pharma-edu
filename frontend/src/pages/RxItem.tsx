import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo';
import '../PatientPage.css';

interface RxItem {
    id: number;
    name: string;
    strength: string;
    ndc: string;
    expiration: string;
    lot_number: string;
    dea_schedule: string;
    dosage_form: string;
}

const RxItemComponent: React.FC = () => {
    const [rxName, setRxName] = useState<string>("");
    const [rxStrength, setRxStrength] = useState<string>("");
    const [ndc, setNdc] = useState<string>("");
    const [expiration, setExpiration] = useState<string>("");
    const [lotNumber, setLotNumber] = useState<string>("");
    const [deaSchedule, setDeaSchedule] = useState<string | null>("");
    const [dosageForm, setDosageForm] = useState<string>("");
    const [rxItems, setRxItems] = useState<RxItem[]>([]);
    const [editingRxId, setEditingRxId] = useState<number | null>(null); // Track the RxItem being edited

    // Fetch all Rx items from the backend
    const fetchRxItems = async () => {
        const response = await fetch("http://localhost:8000/rx-items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            const data = await response.json();
            setRxItems(data);
        } else {
            console.error("Failed to fetch prescription items.");
        }
    };

    // Populate the fields when editing an RxItem
    const handleEditRxItem = (rxItem: RxItem) => {
        setEditingRxId(rxItem.id); // Set the ID of the RxItem being edited
        setRxName(rxItem.name);
        setRxStrength(rxItem.strength);
        setNdc(rxItem.ndc);
        setExpiration(rxItem.expiration);
        setLotNumber(rxItem.lot_number);
        setDeaSchedule(rxItem.dea_schedule);
        setDosageForm(rxItem.dosage_form);
    };

    // Handle saving the new RxItem or updating the existing one
    const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const method = editingRxId ? "PATCH" : "POST"; // Use PATCH for updates, POST for new items
        const url = editingRxId
            ? `http://localhost:8000/rx-items/${editingRxId}`
            : "http://localhost:8000/rx-items";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: rxName,
                strength: rxStrength,
                ndc: ndc,
                expiration: expiration ? new Date(expiration) : null,
                lot_number: lotNumber,
                dea_schedule: deaSchedule,
                dosage_form: dosageForm,
            }),
        });

        if (response.ok) {
            console.log("Prescription information saved/updated successfully.");
            fetchRxItems(); // Refresh the list after saving/updating an item
            resetForm(); // Reset form after saving/updating
        } else {
            console.error("Failed to save/update prescription information.");
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setEditingRxId(null);
        setRxName("");
        setRxStrength("");
        setNdc("");
        setExpiration("");
        setLotNumber("");
        setDeaSchedule("");
        setDosageForm("");
    };

    // Fetch Rx items when the component is mounted
    useEffect(() => {
        fetchRxItems();
    }, []);

    return (
        <div className='homeformat'>
            <div className='EnterNewRxInfo'>
                <div className='patient-profile-fields'>
                    <NameField Name='Rx Name' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
                    <NameField Name='Rx Strength' value={rxStrength} onChange={(e) => setRxStrength(e.target.value)} className="Rad" />
                    <NameField Name='NDC' value={ndc} onChange={(e) => setNdc(e.target.value)} className="Rad" />
                    <div className="exp-for">Expiration (YYYY-MM-DD)</div>
                    <NameField Name='Expiration' value={expiration} onChange={(e) => setExpiration(e.target.value)} className="Rad" />
                    <NameField Name='Lot Number' value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className="Rad" />
                    <NameField Name='DEA Schedule' value={deaSchedule ?? ""} onChange={(e) => setDeaSchedule(e.target.value || null)} className="Rad" />
                    <NameField Name='Dosage Form' value={dosageForm} onChange={(e) => setDosageForm(e.target.value)} className="Rad" />
                </div>
                <div className='bottomfields'>
                    <Save Save={editingRxId ? 'Update' : 'Save'} onClick={handleSave} />
                    <button onClick={resetForm}>Cancel Edit</button> {/* Optional: Reset the form */}
                </div>
            </div>
            <div className="patient-profile-right-side">
                <div className="outerscroll-rx">
                    <div className="rx-item-list-header"><p>Rx Items List</p></div>
                    <div className="scrollable-rx-list">
                        {rxItems.map(item => (
                            <dl className="rx-items-individual" key={item.id}>
                                <dt className="rx-list-name">Name: {item.name}</dt>
                                <dt className="rx-list-strength">Strength: {item.strength}</dt>
                                <dt className="rx-list-ndc">NDC: {item.ndc}</dt>
                                <dt className="rx-list-dosage">Dosage Form: {item.dosage_form}</dt>
                                <button className="updaterxitembut" onClick={() => handleEditRxItem(item)}>Edit</button>
                            </dl>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RxItemComponent;


// import React, { useState, useEffect } from "react";
// import NameField from '../components/NameField';
// import Save from '../SaveInfo';
// import '../PatientPage.css';

// interface RxItem {
//     id: number;
//     name: string;
//     strength: string;
//     ndc: string;
//     expiration: string;
//     lot_number: string;
//     dea_schedule: string;
//     dosage_form: string;
// }

// const RxItemComponent: React.FC = () => {
//     const [rxName, setRxName] = useState<string>("");
//     const [rxStrength, setRxStrength] = useState<string>("");
//     const [ndc, setNdc] = useState<string>("");
//     const [expiration, setExpiration] = useState<string>("");
//     const [lotNumber, setLotNumber] = useState<string>("");
//     const [deaSchedule, setDeaSchedule] = useState<string | null>("");
//     const [dosageForm, setDosageForm] = useState<string>("");
//     const [rxItems, setRxItems] = useState<RxItem[]>([]);
//     const [editingRxId, setEditingRxId] = useState<number | null>(null); // Track the RxItem being edited

//     // Fetch all Rx items from the backend
//     const fetchRxItems = async () => {
//         const response = await fetch("http://localhost:8000/rx-items", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             setRxItems(data);
//         } else {
//             console.error("Failed to fetch prescription items.");
//         }
//     };

//     // Populate the fields when editing an RxItem
//     const handleEditRxItem = (rxItem: RxItem) => {
//         setEditingRxId(rxItem.id); // Set the ID of the RxItem being edited
//         setRxName(rxItem.name);
//         setRxStrength(rxItem.strength);
//         setNdc(rxItem.ndc);
//         setExpiration(rxItem.expiration);
//         setLotNumber(rxItem.lot_number);
//         setDeaSchedule(rxItem.dea_schedule);
//         setDosageForm(rxItem.dosage_form);
//     };

//     // Handle saving the new RxItem or updating the existing one
//     const handleSave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         const method = editingRxId ? "PATCH" : "POST"; // Use PATCH for updates, POST for new items
//         const url = editingRxId
//             ? `http://localhost:8000/rx-items/${editingRxId}`
//             : "http://localhost:8000/rx-items";

//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name: rxName,
//                 strength: rxStrength,
//                 ndc: ndc,
//                 expiration: expiration ? new Date(expiration) : null,
//                 lot_number: lotNumber,
//                 dea_schedule: deaSchedule,
//                 dosage_form: dosageForm,
//             }),
//         });

//         if (response.ok) {
//             console.log("Prescription information saved/updated successfully.");
//             fetchRxItems(); // Refresh the list after saving/updating an item
//             resetForm(); // Reset form after saving/updating
//         } else {
//             console.error("Failed to save/update prescription information.");
//         }
//     };

//     // Reset the form fields
//     const resetForm = () => {
//         setEditingRxId(null);
//         setRxName("");
//         setRxStrength("");
//         setNdc("");
//         setExpiration("");
//         setLotNumber("");
//         setDeaSchedule("");
//         setDosageForm("");
//     };

//     // Handle deleting an RxItem
//     const handleDeleteRxItem = async (id: number) => {
//         const response = await fetch(`http://localhost:8000/rx-items/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         });

//         if (response.ok) {
//             console.log(`Prescription item with ID ${id} deleted successfully.`);
//             fetchRxItems(); // Refresh the list after deleting an item
//         } else {
//             console.error(`Failed to delete prescription item with ID ${id}.`);
//         }
//     };

//     // Fetch Rx items when the component is mounted
//     useEffect(() => {
//         fetchRxItems();
//     }, []);

//     return (
//         <div className='homeformat'>
//             <div className='EnterNewRxInfo'>
//                 <div className='patient-profile-fields'>
//                     <NameField Name='Rx Name' value={rxName} onChange={(e) => setRxName(e.target.value)} className="Rad" />
//                     <NameField Name='Rx Strength' value={rxStrength} onChange={(e) => setRxStrength(e.target.value)} className="Rad" />
//                     <NameField Name='NDC' value={ndc} onChange={(e) => setNdc(e.target.value)} className="Rad" />
//                     <div className="exp-for">Expiration (YYYY-MM-DD)</div>
//                     <NameField Name='Expiration' value={expiration} onChange={(e) => setExpiration(e.target.value)} className="Rad" />
//                     <NameField Name='Lot Number' value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className="Rad" />
//                     <NameField Name='DEA Schedule' value={deaSchedule ?? ""} onChange={(e) => setDeaSchedule(e.target.value || null)} className="Rad" />
//                     <NameField Name='Dosage Form' value={dosageForm} onChange={(e) => setDosageForm(e.target.value)} className="Rad" />
//                 </div>
//                 <div className='bottomfields'>
//                     <Save Save={editingRxId ? 'Update' : 'Save'} onClick={handleSave} />
//                     <button onClick={resetForm}>Cancel Edit</button> {/* Optional: Reset the form */}
//                 </div>
//             </div>
//             <div className="patient-profile-right-side">
//                 <div className="outerscroll-rx">
//                     <div className="rx-item-list-header"><p>Rx Items List</p></div>
//                     <div className="scrollable-rx-list">
//                         {rxItems.map(item => (
//                             <dl className="rx-items-individual" key={item.id}>
//                                 <dt className="rx-list-name">Name: {item.name}</dt>
//                                 <dt className="rx-list-strength">Strength: {item.strength}</dt>
//                                 <dt className="rx-list-ndc">NDC: {item.ndc}</dt>
//                                 <dt className="rx-list-dosage">Dosage Form: {item.dosage_form}</dt>
//                                 <button className="updaterxitembut" onClick={() => handleEditRxItem(item)}>Edit</button>
//                                 <button className="deleterxitembut" onClick={() => handleDeleteRxItem(item.id)}>Delete</button> {/* Delete button */}
//                             </dl>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RxItemComponent;

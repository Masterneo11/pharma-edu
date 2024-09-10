import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import Save from '../SaveInfo';
import '../PatientPage.css';
import DeaTypeDropdown from "../components/DeaDropdown";

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
    const [dea, setDeaSchedule] = useState<string>("");
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
                dea_schedule: dea,
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
                    {/* <NameField Name='DEA Schedule' value={deaSchedule ?? ""} onChange={(e) => setDeaSchedule(e.target.value || null)} className="Rad" /> */}
                    <DeaTypeDropdown selectedDeaType={dea} onChange={(e) => setDeaSchedule(e.target.value)} />

                    <NameField Name='Dosage Form' value={dosageForm} onChange={(e) => setDosageForm(e.target.value)} className="Rad" />
                </div>
                <div className='bottomfields'>
                    <Save Save={editingRxId ? 'Update' : 'Save'} onClick={handleSave} />
                    <button className="btn btn-primary" onClick={resetForm}>Cancel Edit</button> {/* Optional: Reset the form */}
                </div>
            </div>
            <div className="patient-profile-right-side">
                <div className="container mt-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Rx Items List</h5>
                        </div>
                        <div className="card-body">
                            <div className="scrollable-rx-list bg-light border rounded p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {rxItems.map(item => (
                                    <div className="mb-3 p-3 bg-white border rounded shadow-sm" key={item.id}>
                                        <dl className="row">
                                            <dt className="col-sm-3">Name:</dt>
                                            <dd className="col-sm-9">{item.name}</dd>

                                            <dt className="col-sm-3">Strength:</dt>
                                            <dd className="col-sm-9">{item.strength}</dd>

                                            <dt className="col-sm-3">NDC:</dt>
                                            <dd className="col-sm-9">{item.ndc}</dd>

                                            <dt className="col-sm-3">Dosage Form:</dt>
                                            <dd className="col-sm-9">{item.dosage_form}</dd>
                                        </dl>
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => handleEditRxItem(item)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RxItemComponent;

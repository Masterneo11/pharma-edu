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
    dea_schedule: string | null;
    drug_class: string | null;
}

const RxItemComponent: React.FC = () => {
    const [rxName, setRxName] = useState<string>("");
    const [rxStrength, setRxStrength] = useState<string>("");
    const [ndc, setNdc] = useState<string>("");
    const [expiration, setExpiration] = useState<string>("");
    const [lotNumber, setLotNumber] = useState<string>("");
    const [deaSchedule, setDeaSchedule] = useState<string | null>(null);
    const [rxItems, setRxItems] = useState<RxItem[]>([]);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();
        const response = await fetch("http://localhost:8000/rx-items", {
            method: "POST",
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

            }),
        });
        if (response.ok) {
            console.log("Prescription information saved successfully.");
            fetchRxItems(); // Refresh the list after adding a new item
        } else {
            console.error("Failed to save prescription information.");
        }
    };

    const handleUpdateRxItem = async (id: number) => {
        const response = await fetch(`http://localhost:8000/rx-items/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: rxName,
                strength: rxStrength,
                ndc: ndc,
                expiration: expiration ? new Date(expiration) : null,
                lot_number: lotNumber,
                dea_schedule: deaSchedule,
            }),
        });

        if (response.ok) {
            console.log("Prescription information updated successfully.");
            fetchRxItems(); // Refresh the list after updating an item
        } else {
            console.error("Failed to update prescription information.");
        }
    };

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
                    <div className="exp-for">expiration____ year/month/day</div>
                    <NameField Name='Expiration' value={expiration} onChange={(e) => setExpiration(e.target.value)} className="Rad" />
                    <NameField Name='Lot Number' value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className="Rad" />
                    <NameField Name='DEA Schedule' value={deaSchedule ?? ""} onChange={(e) => setDeaSchedule(e.target.value || null)} className="Rad" />
                </div>
                <div className='bottomfields'>
                    <Save Save='Save' onClick={handleClick} />
                    <Save Save='Retrieve rx-items' onClick={fetchRxItems} />
                </div>
            </div>
            <div className="patient-profile-right-side">
                <div className="outerscroll-rx">
                    <div className="rx-item-list-header"><p>Rx items list</p></div>
                    <div className="scrollable-rx-list">
                        {rxItems.map(item => (
                            <dl className="rx-items-individual" key={item.id}>
                                <dt className="rx-list-name">Name: {item.name}</dt>
                                <dt className="rx-list-strength">Strength: {item.strength},</dt>
                                <dt className="rx-list-ndc">NDC: {item.ndc}</dt>
                                <dt className="rx-list-ndc" > ID {item.id}</dt>
                                <button className="updaterxitembut" onClick={() => handleUpdateRxItem(item.id)}>Update</button>
                            </dl>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RxItemComponent;



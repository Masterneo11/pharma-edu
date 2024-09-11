import React, { useState } from 'react';

// Define the Prescription interface
interface Prescription {
    rx_number: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
}

const PrescriptionForm: React.FC = () => {
    // State to handle user input for the prescription ID
    const [prescriptionId, setPrescriptionId] = useState<number | null>(null);

    // State to store the prescription details fetched from the backend
    const [prescription, setPrescription] = useState<Prescription | null>(null);

    // Handle input change when the user types in the Prescription ID input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrescriptionId(Number(event.target.value));
    };

    // Function to fetch prescription details using the prescription ID
    const handleClickIdInfo = async (prescriptionId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/prescriptions/${prescriptionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // If response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Failed to fetch prescription details.');
            }

            // Parse the response data as JSON
            const data = await response.json();
            console.log('Prescription data:', data);

            // Set the fetched prescription data in state
            setPrescription(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Prescription Information</h2>

            {/* Input field for entering prescription ID */}
            <div>
                <label>Prescription ID:</label>
                <input
                    type="number"
                    placeholder="Enter prescription ID"
                    value={prescriptionId ?? ''}
                    onChange={handleInputChange}
                />
                <button onClick={() => prescriptionId !== null && handleClickIdInfo(prescriptionId)}>
                    Fetch Prescription Info
                </button>
            </div>

            {/* Render the prescription details in a form if the prescription data is available */}
            {prescription && (
                <div>
                    <h3>Prescription Details</h3>
                    <form>
                        <div>
                            <label>Rx Number:</label>
                            <input type="text" value={prescription.rx_number} readOnly />
                        </div>
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={prescription.first_name} readOnly />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" value={prescription.last_name} readOnly />
                        </div>
                        <div>
                            <label>Date of Birth:</label>
                            <input type="text" value={prescription.date_of_birth} readOnly />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PrescriptionForm;

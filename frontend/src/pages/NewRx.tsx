import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import QuickSearch from '../components/QuickSearch';
import Save from '../SaveInfo';
import Directions from "../components/Directions";
import '../PatientPage.css';
import PatientModal from "../modals/PatientModal";
import DoctorDropdown from "../components/DoctorDropdown";
import RxItemDropdown from "../components/RxItemDropdown";

interface RxItem {
  id: number;
  name: string;
}

const NewRx: React.FC = () => {
  const [rxItems, setRxItems] = useState<RxItem[]>([]);
  const [patientId, setPatientId] = useState<number>(0);
  const [selectedRxItemId, setSelectedRxItemId] = useState<number>(0);
  const [rxQuantity, setRxQuantity] = useState<number>(0);
  const [rxQuantityDispensed, setRxQuantityDispensed] = useState<number>(0);
  const [rxRefills, setRxRefills] = useState<number>(0);
  const [dateOfRx, setDateOfRx] = useState<string>("");
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number>(0); // New State for Selected Patient ID
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [techInitials, setTechInitials] = useState<string>("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number>(0);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchRxItems();
  }, []);

  const fetchPatients = async () => {
    const response = await fetch("http://localhost:8000/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.ok) {
      const data = await response.json();
      setPatients(data);
    } else {
      console.error("Failed to fetch patient data.");
    }
  };

  const fetchDoctors = async () => {
    const response = await fetch("http://localhost:8000/prescribers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.ok) {
      const data = await response.json();
      setDoctors(data);
    } else {
      console.error("Failed to fetch doctor data.");
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
      console.error("Failed to fetch Rx items.");
    }
  };

  const handlePatientSearchChange = (value: string) => {
    setPatientName(value);
    if (value.trim() === "") {
      setFilteredPatients([]);
      setShowDropdown(false);
    } else {
      const filtered = patients.filter(patient =>
        `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPatients(filtered);
      setShowDropdown(true);
    }
  };

  const handlePatientSelect = () => {
    // setPatientName(`${patient.first_name} ${patient.last_name}`);
    setSelectedPatientId(26); // Set the patient ID correctly
    setShowDropdown(false);
  };

  const handleDoctorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(Number(event.target.value));
  };

  const handleRxItemSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRxItemId(Number(event.target.value));
  };

  const handleSave = async () => {
    console.log("Selected Patient ID:", patientId);
    console.log("Selected Doctor ID:", selectedDoctor);
    console.log("Selected Rx Item ID:", selectedRxItemId);

    if (!patientId || !selectedDoctor || !selectedRxItemId) {
      return;
    }

    const newRxData = {
      patient_id: patientId,
      prescriber_id: selectedDoctor,
      prescribed_date: dateOfRx,
      rx_item_id: selectedRxItemId,
      directions: "Take as prescribed",
      quantity: rxQuantity,
      quantity_dispensed: rxQuantityDispensed,
      refills: rxRefills,
      tech_initials: techInitials,
    };

    try {
      const response = await fetch("http://localhost:8000/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRxData),
      });

      if (response.ok) {
        console.log("Saved prescription successfully.");
      } else {
        const errorMessage = await response.json();
        console.error("Failed to save prescription:", errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while saving the prescription.");
    }
  };

  return (
    <div>
      <div className='homeformat'>
        <div className='EnterNewRxInfo'>
          <div className="Patient-Search">
            <QuickSearch Word='Patient Name' value={patientName} onChange={handlePatientSearchChange} />
            {showDropdown && (
              <div className="patient-dropdown">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map(patient => (
                    <div key={patient.id} className="patient-dropdown-item" onClick={() => handlePatientSelect}>
                      {patient.first_name} {patient.last_name}
                    </div>
                  ))
                ) : (
                  <div className="no-patients">No patients found</div>
                )}
              </div>
            )}
            <PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
          <div className='EnterNewRxInfo'>
            <div className='fields'>
              <DoctorDropdown doctors={doctors} selectedDoctorId={selectedDoctor} handleDoctorSelect={handleDoctorSelect} />
              <RxItemDropdown rxItems={rxItems} selectedRxItemId={selectedRxItemId} handleRxItemSelect={handleRxItemSelect} />
            </div></div>
          <div className="fields">
            <NameField Name='patient id' value={patientId} onChange={(e) => setPatientId(Number(e.target.value))} className="Rad" />

            <NameField Name='Quantity' value={rxQuantity} onChange={(e) => setRxQuantity(Number(e.target.value))} className="Rad" />
            <NameField Name='Quantity dispensed' value={rxQuantityDispensed} onChange={(e) => setRxQuantityDispensed(Number(e.target.value))} className="Rad" />
            <NameField Name='Refills' value={rxRefills} onChange={(e) => setRxRefills(Number(e.target.value))} className="Rad" />
            <NameField Name='Date of Rx' value={dateOfRx} onChange={(e) => setDateOfRx(e.target.value)} className="Rad" />
          </div>
          <div>
            <Directions Instruct="Directions" />
          </div>
          <div className='bottomfields'>
            <Save Save='Save' onClick={handleSave} />
            <textarea placeholder="Tech initials" className="TechIns" value={techInitials} onChange={(e) => setTechInitials(e.target.value)} />
            <Save Save='Enter' />
          </div>
        </div>
        <div className="rxrightside">
          <div className='scanImage'> Scan Image here.......... </div>
          <div className="patientlist">
            <div className="patientlistheader">
              <div className="patientlistheaderid">Id</div>
              <div className="patientlistheadername">Patient Name</div>
              <div className="patientlistheaderdob">DOB</div>
            </div>
            <div className="patientlisthomepage">
              <div className="scrollable-patient-list">
                {patients.map(patient => (
                  <div className="patientlistsearchbar" key={patient.id}>
                    <div className="patientlistdob">{patient.id}</div>
                    <div className="patientlistname">{patient.first_name} {patient.last_name}</div>
                    <div className="patientlistdob">{patient.date_of_birth}</div>
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

export default NewRx;
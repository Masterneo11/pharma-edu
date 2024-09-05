import React, { useState, useEffect } from "react";
import NameField from '../components/NameField';
import QuickSearch from '../components/QuickSearch';
import Save from '../SaveInfo';
import Directions from "../components/Directions";
import '../PatientPage.css';
import PatientModal from "../modals/PatientModal";

const NewRx: React.FC = () => {
  const [rxQuantity, setRxQuantity] = useState<string>("");
  const [rxRefills, setRxRefills] = useState<string>("");
  const [dateOfRx, setDateOfRx] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [medicationSearch, setMedicationSearch] = useState<string>("");
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [techInitials, setTechInitials] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  useEffect(() => {
    fetchPatients();
  }, []);

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

  const handlePatientSelect = (patient: any) => {
    setPatientName(`${patient.first_name} ${patient.last_name}`);
    setShowDropdown(false);
  };

  const handleSave = async () => {
    const newRxData = {
      patientName,
      rxQuantity,
      rxRefills,
      dateOfRx,
      doctorName,
      medicationSearch,
      techInitials,
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
        console.error("saved prescriptions succesfully ")
      } else {
        console.error("Failed to save prescription.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while saving the prescription.");
    }
  };

  return (<><div><div className='homeformat'>
    <div className='EnterNewRxInfo'>
      <div className="Patient-Search">
        <QuickSearch
          Word='Patient Name'
          value={patientName}
          onChange={handlePatientSearchChange}
        />
        {showDropdown && (
          <div className="patient-dropdown-container">
            <div className="patient-dropdown">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="patient-dropdown-item"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    {patient.first_name} {patient.last_name}
                  </div>
                ))
              ) : (
                <div className="no-patients">No patients found</div>
              )}
            </div>
          </div>
        )}
        <PatientModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
      <div className='fields'>
        <NameField Name='Rx Quantity' value={rxQuantity} onChange={(e) => setRxQuantity(e.target.value)} className="Rad" />
        <NameField Name='Rx Refills' value={rxRefills} onChange={(e) => setRxRefills(e.target.value)} className="Rad" />
        <NameField Name='Date of Rx' value={dateOfRx} onChange={(e) => setDateOfRx(e.target.value)} className="Rad" />
        <NameField Name='Doctor Name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="Rad" />
        <NameField Name='Medication Search' value={medicationSearch} onChange={(e) => setMedicationSearch(e.target.value)} className="Rad" />
      </div>

      <div><Directions Instruct="Directions" /></div>
      <div className='bottomfields'><Save Save='Save' onClick={handleSave} />
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
  </div >
  </>
  );
};

export default NewRx;


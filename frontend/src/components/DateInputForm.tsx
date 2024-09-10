import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DateInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const DateInputForm: React.FC<DateInputProps> = ({ value, onChange, label }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder="year/month/day"
                pattern="\d{4}/\d{2}/\d{2}" // Optional: pattern for validation
                title="Date format: year/month/day" // Optional: title for validation
            />
        </div>
    );
};

export default DateInputForm;

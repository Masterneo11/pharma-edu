import React from "react";
import "./SignupModal.css"

interface SignUpModalProps {
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Sign Up</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <p>It's quick and easy.</p>
                <form className="signup-form">
                    <div className="input-row">
                        <input type="text" className="form-control" placeholder="First name" />
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                    <input type="text" className="form-control" placeholder="Mobile number or email" />
                    <input type="password" className="form-control" placeholder="New password" />

                    <div className="input-row">
                        <div className="birthday-section">
                            <label>Birthday</label>
                            <div className="birthday-inputs d-flex align-items-center">
                                <select className="form-select me-2 simo">
                                    <option value="Sep">Sep</option>
                                </select>
                                <select className="form-select me-2 simo">
                                    <option value="19">19</option>
                                </select>
                                <select className="form-select simo">
                                    <option value="2024">2024</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <label className="gender-label">Gender</label>
                    <div className="gender-options">
                        <label className="gender-box">
                            <input type="radio" name="gender" value="female" /> Female
                        </label>
                        <label className="gender-box">
                            <input type="radio" name="gender" value="male" /> Male
                        </label>
                    </div>

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h2>Sign Up</h2>
//                     <button className="close-btn" onClick={onClose}>
//                         &times;
//                     </button>
//                 </div>
//                 <p>It's quick and easy.</p>
//                 <form className="signup-form">
//                     <div className="input-row">
//                         <input type="text" className="form-control" placeholder="First name" />
//                         <input type="text" className="form-control" placeholder="Last name" />

//                         {/* <input type="text" placeholder="First name" />
//                         <input type="text" placeholder="Last name" /> */}
//                     </div>
//                     <input type="text" placeholder="Mobile number or email" />
//                     <input type="password" placeholder="New password" />
//                     <div className="input-row">
//                         <div className="birthday-section">
//                             <label>Birthday</label>
//                             <div className="birthday-inputs d-flex align-items-center">
//                                 <select className="form-select me-2 simo">
//                                     <option value="Sep">Sep</option>
//                                 </select>
//                                 <select className="form-select me-2 simo">
//                                     <option value="19">19</option>
//                                 </select>
//                                 <select className="form-select simo">
//                                     <option value="2024">2024</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="gender-section-box"> */}
//                     <label className="gender-label">Gender</label>
//                     <div className="gender-options">
//                         <label className="gender-box">
//                             <input type="radio" name="gender" value="female" /> Female
//                         </label>
//                         <label className="gender-box">
//                             <input type="radio" name="gender" value="male" /> Male
//                         </label>

//                     </div>

//                     <button type="submit" className="signup-btn">
//                         Sign Up
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpModal;

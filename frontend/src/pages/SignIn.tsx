

import React, { useState } from "react";
import SignUpModal from "../components/SignUpModal"

const SignIn: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="hme">
                <div className="Signbackground"></div>
                <div className="campuspic">
                    <div className="fading-div"></div>
                    <div className="signoverlay">
                        <input
                            type="text"
                            className="form-control custom-login"
                            placeholder="Username or phone number"
                        />
                        <input
                            type="password"
                            className="form-control custom-input"
                            placeholder="Password"
                        />
                        <button className="btn btn-primary LogIn">Log In</button>
                        <button className="forgotusername"> Forgot password?</button>
                        <button className="btn btn-success cr" onClick={handleOpenModal}>
                            Create new account
                        </button>
                    </div>
                </div>
                <div className="hm"></div>
            </div>

            {/* Render the SignUpModal and pass the close handler */}
            {isModalOpen && <SignUpModal onClose={handleCloseModal} />}
        </>
    );
};

export default SignIn;

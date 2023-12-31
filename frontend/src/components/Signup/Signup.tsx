"use client";
import { FC, useRef, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

interface SignUpProps {
    isSignupFormOpen: boolean,
    toggleForm: () => void;
}


const Signup: FC<SignUpProps> = (props) => {
    const { isSignupFormOpen, toggleForm } = props;
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const signupHandler = async () => {
        if (!emailRef.current || !passwordRef.current)
            return;
        setIsFormSubmitting(true);
        try {
            const response = await axios.post("/api/sign-up", {
                email: emailRef.current.value,
                password: passwordRef.current.value
            });

            setIsFormSubmitting(false);
            
            if (response.data) {
                toast.success(`${response.statusText}. Please sign-in`);
            }
        }
        catch (error) {
            console.log("Registration failed", error);
            toast.error('Registration failed');
            setIsFormSubmitting(false);
        }
        toggleForm();

    }

    return (
        isSignupFormOpen ? (
            <div className={signupCssClassNames.container}>
                <div className={signupCssClassNames.card}>
                    <h2 className={signupCssClassNames.heading}>
                        Sign up
                    </h2>
                    <form>
                        <div className={signupCssClassNames.formControl}>
                            <label htmlFor="email" className={signupCssClassNames.label}>
                                Email
                            </label>
                            <input id="email"
                                type="email"
                                className={signupCssClassNames.input}
                                placeholder="Enter your email"
                                ref={emailRef} />
                        </div>
                        <div className={signupCssClassNames.formControl}>
                            <label htmlFor="password" className={signupCssClassNames.label}>
                                Password
                            </label>
                            <input id="password"
                                type="password"
                                className={signupCssClassNames.input}
                                placeholder="Enter your password"
                                ref={passwordRef} />
                        </div>
                        <div className={signupCssClassNames.btnContainer}>
                            <span className={signupCssClassNames.cancel} onClick={toggleForm}>Cancel</span>
                            <button
                                className={signupCssClassNames.confirm}
                                type="button"
                                onClick={signupHandler}
                                disabled={isFormSubmitting}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>) : <></>
    )
}

export default Signup


const signupCssClassNames = {
    container:
        'fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-40',
    card: 'bg-white rounded-lg p-8 shadow-lg transform translate-y-0 scale-100 transition-all duration-300',
    heading: 'text-2xl mb-4',
    formControl: 'mb-4',
    label: 'block text-gray-700 text-sm font-bold mb-2',
    input:
        'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    btnContainer: 'flex justify-between items-center',
    cancel: 'text-xs text-red-600 cursor-pointer',
    confirm:
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
};
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { message } from 'antd';

const UserSignup = () => {
    const {login} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        if (values.password !== values.passwordconfirm) {
            return setError("Passwords are not the same");
        }

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 4000) {
                setError(data.message);
            } else {
                message.error("An error occurred");
                console.log(res.status);
            }
        } catch (error) {
            console.error(error); // Log the error
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default UserSignup;
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { message } from 'antd';

const UseLogin = () => {
    const {login} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (values) => {
       try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
                console.log(data.user)
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error("An error occurred");
                console.log(res.status);
            }
        } catch (error) {
            console.error(error);
             // Log the error
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default UseLogin;
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const token = params.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/reset-password', { token, newPassword: password });
            setMessage('Password reset successful. You can now login.');
            setTimeout(() => navigate('/login'), 2000);   // redirect to login after 2 sec
        } catch (err) {
            setMessage('Reset failed or link expired.');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            {message && <p className="mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2">
                    Reset Password
                </button>
            </form>
        </div>
    );
}

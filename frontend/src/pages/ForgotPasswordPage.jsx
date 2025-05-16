import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/forgot-password', { email });
            setMessage('If the account exists, a reset link has been sent to your email.');
            setMessageType('success'); // Success message
        } catch (err) {
            setMessage('Something went wrong. Please try again.');
            setMessageType('error'); // Error message
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>

                {message && (
                    <div
                        className={`p-3 rounded-md mb-4 text-center ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-all"
                    >
                        Send Reset Link
                    </button>
                </form>

                <Link to="/login" className="text-blue-600 hover:underline block text-center mt-4">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

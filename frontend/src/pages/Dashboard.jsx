import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import Button from '../components/button.jsx';
import { Briefcase, PhoneCall, BadgeCheck } from 'lucide-react';
import { motion } from "framer-motion";

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, interviews: 0, offers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to load dashboard stats', err);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            title: 'Applications',
            value: stats.total,
            gradient: 'from-gray-500 via-gray-400 to-gray-800',
            icon: <Briefcase size={32} className="text-white" />
        },
        {
            title: 'Interviews',
            value: stats.interviews,
            gradient: 'from-blue-500 via-blue-400 to-blue-800',
            icon: <PhoneCall size={32} className="text-white" />
        },
        {
            title: 'Offers',
            value: stats.offers,
            gradient: 'from-green-500 via-green-400 to-green-800',
            icon: <BadgeCheck size={32} className="text-white" />
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
                <div className="backdrop-blur-md bg-white/60 min-h-screen">
                    <div className="p-8 max-w-6xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 drop-shadow-sm">Welcome</h1>
                            <Button onClick={fetchStats}>Refresh</Button>
                        </div>

                        {loading ? (
                            <p className="text-center text-lg text-gray-600">Loading data...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {cards.map((item) => (
                                    <div
                                        key={item.title}
                                        className={`bg-gradient-to-br ${item.gradient} text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-2xl font-bold tracking-wide">{item.title}</h2>
                                            {item.icon}
                                        </div>
                                        <p className="text-6xl font-extrabold mt-6 drop-shadow-sm">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

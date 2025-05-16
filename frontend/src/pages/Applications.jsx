import { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from "framer-motion";
import { Edit, Trash2 } from 'lucide-react';

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newApp, setNewApp] = useState({ company: '', role: '', stage: '', location: '', dateApplied: '' });
    const [editingId, setEditingId] = useState(null);
    const [editingApp, setEditingApp] = useState({ company: '', role: '', stage: '', location: '', dateApplied: '' });
    const [filter, setFilter] = useState('All');

    const stages = ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];


    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/applications');
            setApplications(res.data);
        } catch (err) {
            console.error('Failed to fetch applications', err);
        }
        setLoading(false);
    };

    const createApplication = async () => {
        try {
            await api.post('/applications', newApp);
            setNewApp({ company: '', role: '', stage: '', location: '', link: '', dateApplied: '' });
            fetchApplications();
        } catch (err) {
            console.error('Failed to create application', err);
        }
    };

    const deleteApplication = async (id) => {
        try {
            await api.delete(`/applications/${id}`);
            fetchApplications();
        } catch (err) {
            console.error('Failed to delete application', err);
        }
    };

    const startEdit = (app) => {
        setEditingId(app.id);
        setEditingApp({ company: app.company, role: app.role, stage: app.stage, location: app.location, link: app.link, dateApplied: app.dateApplied });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingApp({ company: '', role: '', stage: '', location: '', link: '', dateApplied: '' });
    };

    const saveEdit = async () => {
        try {
            await api.put(`/applications/${editingId}`, editingApp);
            cancelEdit();
            fetchApplications();
        } catch (err) {
            console.error('Failed to update application', err);
        }
    };

    const filteredApplications = filter === 'All'
        ? applications
        : applications.filter(app => app.stage === filter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-gray-50 min-h-screen">
                <div className="p-8 max-w-6xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Your Job Applications</h1>

                    <div className="mb-6">
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="border p-2 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                        >
                            <option>All</option>
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div className="mb-8 space-y-3">
                        <input type="text" placeholder="Company" value={newApp.company} onChange={e => setNewApp({ ...newApp, company: e.target.value })} className="border p-3 mr-4 w-5/12 rounded-lg shadow-sm focus:ring focus:ring-blue-200" />
                        <input type="text" placeholder="Role" value={newApp.role} onChange={e => setNewApp({ ...newApp, role: e.target.value })} className="border p-3 w-5/12 rounded-lg mr-4 shadow-sm focus:ring focus:ring-blue-200" />
                        <input type="text" placeholder="Location" value={newApp.location} onChange={e => setNewApp({ ...newApp, location: e.target.value })} className="border p-3 w-5/12 mr-4 rounded-lg shadow-sm focus:ring focus:ring-blue-200" />
                        <input type="text" placeholder="Link" value={newApp.link} onChange={e => setNewApp({ ...newApp, link: e.target.value })} className="border p-3 w-5/12 mr-8 rounded-lg shadow-sm focus:ring focus:ring-blue-200" />
                        <select
                            value={newApp.stage}
                            onChange={e => setNewApp({ ...newApp, stage: e.target.value })}
                            className="border p-3.5 mr-4 active:scale-95 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Stage</option>
                            {stages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                        <input type="date" value={newApp.dateApplied} onChange={e => setNewApp({ ...newApp, dateApplied: e.target.value })} className="border p-3 mr-4 active:scale-95 rounded-lg shadow-sm focus:ring focus:ring-blue-200" />
                        <button onClick={createApplication} className="bg-blue-950 text-white px-5 py-2 rounded-full shadow-md hover:text-indigo-400 active:scale-95 transition-all">Add Application</button>

                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : applications.length === 0 ? (
                        <p>No applications yet.</p>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-300 text-gray-700">
                                        <th className="p-4 text-left">Company</th>
                                        <th className="p-4 text-left">Role</th>
                                        <th className="p-4 text-left">Stage</th>
                                        <th className="p-4 text-left">Location</th>
                                        <th className="p-4 text-left">Link</th>
                                        <th className="p-4 text-left">Date Applied</th>
                                        <th className="p-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.map(app => (
                                        <tr key={app.id} className="even:bg-gray-50">
                                            {editingId === app.id ? (
                                                <>
                                                    <td><input type="text" value={editingApp.company} onChange={e => setEditingApp({ ...editingApp, company: e.target.value })} className="border p-2 w-full rounded" /></td>
                                                    <td><input type="text" value={editingApp.role} onChange={e => setEditingApp({ ...editingApp, role: e.target.value })} className="border p-2 w-full rounded" /></td>
                                                    <select
                                                        value={editingApp.stage}
                                                        onChange={e => setEditingApp({ ...editingApp, stage: e.target.value })}
                                                        className="border p-2 mt-6 w-full rounded"
                                                    >
                                                        {stages.map(stage => (
                                                            <option key={stage} value={stage}>{stage}</option>
                                                        ))}
                                                    </select>
                                                    <td><input type="text" value={editingApp.location} onChange={e => setEditingApp({ ...editingApp, location: e.target.value })} className="border p-2 w-full rounded" /></td>
                                                    <td><input type="text" value={editingApp.link} onChange={e => setEditingApp({ ...editingApp, link: e.target.value })} className="border p-2 w-full rounded" /></td>
                                                    <td><input type="date" value={editingApp.dateApplied} onChange={e => setEditingApp({ ...editingApp, dateApplied: e.target.value })} className="border p-2 w-full rounded" /></td>
                                                    <td>
                                                        <button onClick={saveEdit} className="bg-blue-500 text-white px-3 py-1 ml-10 mt-2 mb-2 rounded-full shadow-md hover:shadow-lg active:scale-95 mr-2">Save</button>
                                                        <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 ml-9 mb-2 rounded-full shadow-md hover:shadow-lg active:scale-95">Cancel</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="p-4">{app.company}</td>
                                                    <td className="p-4">{app.role}</td>
                                                    <td className="p-4">{app.stage}</td>
                                                    <td className="p-4">{app.location}</td>
                                                    <td className="p-4">
                                                        <a
                                                            href={app.link} 
                                                            target="_blank"
                                                            rel="noopener noreferrer" 
                                                            className="text-blue-500 underline hover:text-blue-700"
                                                        >
                                                            Visit Website
                                                        </a>
                                                    </td>
                                                    <td className="p-4">
                                                        {app.dateApplied ?
                                                            new Date(new Date(app.dateApplied).toLocaleString('en-US', { timeZone: 'UTC' }))
                                                                .toLocaleDateString('en-US', {
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {/* Action Buttons */}
                                                        <button
                                                            onClick={() => startEdit(app)}
                                                            className="bg-blue-500 text-white px-3 py-1 mr-10 rounded-full shadow-md hover:shadow-lg active:scale-95 mr-2"
                                                        >
                                                            <Edit size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteApplication(app.id)}
                                                            className="bg-red-500 text-white px-3 py-1 mt-2 rounded-full shadow-md hover:shadow-lg active:scale-95"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from "framer-motion";

export default function Documents() {
  const { appId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await api.get(`/documents/application/${appId}`);
      setDocuments(res.data);
    } catch (err) {
      console.error('Failed to load documents', err);
    }
  };

  const uploadDocument = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/documents/application/${appId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFile(null);
      loadDocuments();
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await api.delete(`/documents/${id}`);
      loadDocuments();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Documents for Application</h1>


        <div className="mb-4">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button
            onClick={uploadDocument}
            className="ml-2 bg-green-500 text-white px-4 py-2 "
          >
            Upload
          </button>
        </div>


        {documents.length === 0 ? (
          <p>No documents uploaded</p>
        ) : (
          <ul className="space-y-2">
            {documents.map(doc => (
              <li key={doc.id} className="flex items-center justify-between border p-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {doc.originalName || 'View File'}
                </a>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

"use client";
import { useState, useEffect } from "react";
import UploadForm from '@/components/uploadingForm';
import './index.css';

// Admin-only project list and delete UI
function ProjectListAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
        else setError('Failed to load projects');
      } catch (err) {
        setError('Error loading projects');
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (index) => {
    if (!window.confirm('Delete this project?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      });
      if (!res.ok) throw new Error('Failed to delete');
      const updated = await fetch('/api/projects').then(r => r.json());
      setProjects(updated);
    } catch (err) {
      setError('Error deleting project');
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">All Projects</h3>
      {error && <div className="text-red-200 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}
      <ul className="space-y-2">
        {projects.map((p, i) => (
          <li key={i} className="bg-white text-black rounded p-2 flex justify-between items-center">
            <span>{p.tool} - <a href={p.link} target="_blank" rel="noopener noreferrer" className="underline">{p.link}</a></span>
            <button onClick={() => handleDelete(i)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Admin() {
  const password = 'pcTanveer@7';
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isCorrect, setIsCorrect] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === password && formData.password === formData.confirmPassword) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div id="admin">
      {/* Form should always be present */}
      {!isCorrect && (
        <div className="password p-[20px] bg-[#000]">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl shadow-lg max-w-lg mx-auto space-y-6 border border-gray-200">
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            {isCorrect === false && <p className="py-[10px] text-red-600">Passwords do not match or incorrect!</p>}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Show new section when login is correct */}
      {isCorrect === true && (
        <div className="password bg-red-500 p-4 text-white">
          <UploadForm />
          <ProjectListAdmin />
        </div>
      )}
    </div>
  );
}
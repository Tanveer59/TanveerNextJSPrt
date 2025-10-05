"use client";

import { useState, useRef } from "react";
import { Montserrat } from "next/font/google";
// Removed Redux imports
import { motion } from "framer-motion";

const montserratFont = Montserrat({
    subsets: ['latin'],
    weight: '400'
})

const montserratFont700 = Montserrat({
    subsets: ['latin'],
    weight: '700'
})

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function UploadForm () {
  const [formData, setFormData] = useState({
    tool: "",
    link: "",
    image: null,
    status: "in_progress",
  });
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null);

  const validateForm = () => {
    console.log("Validating form data:", formData);
    const errors = [];
    
    if (!formData.tool.trim()) {
      errors.push("Technology is required");
    }
    
    if (!formData.link.trim()) {
      errors.push("Website URL is required");
    } else if (!/^https?:\/\/.+\..+/.test(formData.link)) {
      errors.push("Please enter a valid website URL");
    }
    
    if (!formData.image) {
      errors.push("Please select an image");
    }
    
    if (!formData.status) {
      errors.push("Please select a project status");
    }
    
    console.log("Form validation errors:", errors);
    return errors;
  };

  const handleChange = (e) => {
    try {
      const { name, value, type, files } = e.target;
      console.log("Form field changed:", { name, value, type });
      
      if (type === "file" && files && files[0]) {
        const file = files[0];
        console.log("File selected:", { name: file.name, type: file.type, size: file.size });
        
        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setError('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
          return;
        }
        
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          setError('File size too large. Maximum size is 5MB.');
          return;
        }
        
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
      setError(""); // Clear error when user makes changes
    } catch (err) {
      console.error("Error in handleChange:", err);
      setError("An error occurred while processing your input");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    setError("");
    setIsUploading(true);
    setSuccessMessage("");
    
    try {
      const errors = validateForm();
      if (errors.length > 0) {
        console.log("Form validation failed:", errors);
        setError(errors.join(", "));
        setIsUploading(false);
        return;
      }
      
      console.log("Creating FormData for upload");
      // Create a FormData object to handle the file upload
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.image);
      
      console.log("Uploading image to API");
      // Upload the image first
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Upload API response:", result);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to upload image');
      }
      
      // Create the project object with the correct format
      const newProject = {
        src: result.url,
        tool: formData.tool,
        link: formData.link,
        state: formData.status === "completed" ? "Completed" : "In Progress",
        color: formData.status === "completed" ? "bg-green-500" : "bg-yellow-500",
        alt: `${formData.tool} Project`,
        width: 800,
        height: 600
      };
      console.log("Adding new project via API:", newProject);
      // Add project to file storage via API
      const addRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (!addRes.ok) throw new Error('Failed to add project to file storage');
      // Reset the form
      resetForm();
      setSuccessMessage("Project added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || "An error occurred while submitting the form");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    console.log("Resetting form");
    setFormData({
      tool: "",
      link: "",
      image: null,
      status: "in_progress",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="p-6 rounded-2xl shadow-lg max-w-lg mx-auto space-y-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`${montserratFont700.className} text-2xl font-semibold text-center text-gray-700`}>
        Add Project
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <input 
            type="text" 
            name="tool" 
            placeholder="Technology" 
            value={formData.tool || ""}
            onChange={handleChange} 
            required 
            className={`w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${montserratFont.className}`}
          />
        </div>
        
        <div>
          <input 
            type="url" 
            name="link" 
            placeholder="Website URL" 
            value={formData.link || ""}
            onChange={handleChange} 
            required 
            className={`${montserratFont.className} w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`} 
          />
        </div>
        
        <div>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleChange} 
            required 
            className={`${montserratFont.className} w-full px-4 py-2 text-black border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
          />
          {previewUrl && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-40 rounded-lg object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={`${montserratFont.className} flex items-center gap-2 text-black`}>
            <input 
              type="radio" 
              name="status" 
              value="in_progress" 
              checked={formData.status === "in_progress"} 
              onChange={handleChange} 
              required 
              className="accent-blue-500" 
            /> 
            In Progress
          </label>
          <label className={`${montserratFont.className} flex items-center gap-2 text-black`}>
            <input 
              type="radio" 
              name="status" 
              value="completed" 
              checked={formData.status === "completed"} 
              onChange={handleChange} 
              required 
              className="accent-blue-500" 
            /> 
            Completed
          </label>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          type="submit" 
          disabled={isUploading}
          className={`${montserratFont700.className} flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Submit'}
        </button>
        <button 
          type="button" 
          onClick={resetForm}
          disabled={isUploading}
          className={`${montserratFont700.className} flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Reset
        </button>
      </div>
    </motion.form>
  );
}

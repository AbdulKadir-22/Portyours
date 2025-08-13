import React, { useState, useEffect } from "react";
import { FaCamera, FaPlus } from "react-icons/fa";
import axios from "axios"; // Make sure to have axios installed: npm install axios

// --- Reusable UI Components (No changes needed) ---
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ''} // Use empty string as a fallback to prevent controlled/uncontrolled input errors
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  </div>
);
const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <textarea
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline h-24"
    />
  </div>
);
const ImageUpload = ({ label }) => (
  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer">
    <FaCamera size={40} />
    <span className="mt-2 text-sm font-semibold">{label}</span>
  </div>
);

// --- Main Form Component ---
const Form = () => {
  const [formData, setFormData] = useState({
    home: { name: "", title: "", description: "" },
    about: { course: "", aboutYourself: "" },
    skills: { aboutSkills: "" },
    projects: [],
    contact: { name: "", email: "", github: "", twitter: "", linkedin: "", facebook: "", instagram: "" },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- 1. SETUP API HELPER ---
  // Create an Axios instance to automatically handle the base URL and auth token.
  const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend URL
  });

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, Promise.reject);

  // --- 2. FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/portfolio');
        if (response.data) {
          // If data exists, populate the form state.
          // Ensure projects is an array to prevent errors.
          setFormData({ ...response.data, projects: response.data.projects || [] });
        }
      } catch (err) {
        // A 404 error is okay; it just means the user is new.
        if (err.response && err.response.status !== 404) {
          setError("Couldn't load your data. Please refresh the page.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolioData();
  }, []); // Empty array ensures this runs only once when the component mounts.

  // --- FORM STATE HANDLERS (No changes needed) ---
  const handleNestedChange = (section, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [name]: value } : project
    );
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { title: "", description: "", imageUrl: "" }],
    }));
  };

  // --- 3. SUBMIT DATA TO BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await api.post("/portfolio", formData);
      setFormData({ ...response.data, projects: response.data.projects || [] }); // Update state with saved data
      setSuccess("Portfolio saved successfully!");
    } catch (err) {
      setError("Failed to save portfolio. Please try again.");
      console.error("Submission Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.home.name) {
    return <div className="flex justify-center items-center h-screen">Loading your data...</div>;
  }

  return (
    <div className="bg-yellow-50 min-h-screen p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-yellow-600 mb-8 text-center">
          Create & Update Your Portfolio
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-12">
          {/* User Feedback Messages */}
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">{success}</div>}

          {/* Home Page Section */}
          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Home Page</h2>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <InputField label="Your Name" name="name" value={formData.home.name} onChange={(e) => handleNestedChange("home", e)} placeholder="e.g., John Doe" />
                <InputField label="Title" name="title" value={formData.home.title} onChange={(e) => handleNestedChange("home", e)} placeholder="e.g., Web Designer" />
                <TextareaField label="Description" name="description" value={formData.home.description} onChange={(e) => handleNestedChange("home", e)} placeholder="A short bio about yourself" />
              </div>
              <ImageUpload label="Profile Photo" />
            </div>
          </div>

          {/* About Page Section */}
          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Page</h2>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <InputField label="Your Course / Field" name="course" value={formData.about.course} onChange={(e) => handleNestedChange("about", e)} placeholder="e.g., Computer Science" />
                <TextareaField label="About Yourself" name="aboutYourself" value={formData.about.aboutYourself} onChange={(e) => handleNestedChange("about", e)} placeholder="Tell us more about your journey" />
              </div>
              <ImageUpload label="About Image" />
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills Section</h2>
            <TextareaField label="About Skills" name="aboutSkills" value={formData.skills.aboutSkills} onChange={(e) => handleNestedChange("skills", e)} placeholder="Describe your technical skills" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
              <ImageUpload label="Skill 1" /><ImageUpload label="Skill 2" /><ImageUpload label="Skill 3" />
              <ImageUpload label="Skill 4" /><ImageUpload label="Skill 5" /><ImageUpload label="Skill 6" />
            </div>
          </div>

          {/* Projects Section */}
          <div className="p-6 border rounded-xl space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
            {(formData.projects || []).map((project, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Project {index + 1}</h3>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <InputField label="Project Title" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} placeholder="Name of your project" />
                    <TextareaField label="Project Description" name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} placeholder="What the project is about" />
                  </div>
                  <ImageUpload label="Project Image" />
                </div>
              </div>
            ))}
            <button type="button" onClick={addProject} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">
              <FaPlus /> Add Another Project
            </button>
          </div>

          {/* Contact Page Section */}
          <div className="p-6 border rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact & Socials</h2>
            <div className="grid md:grid-cols-2 gap-x-8">
              <InputField label="Contact Name" name="name" value={formData.contact.name} onChange={(e) => handleNestedChange("contact", e)} placeholder="Your full name" />
              <InputField label="Email" name="email" value={formData.contact.email} onChange={(e) => handleNestedChange("contact", e)} placeholder="your.email@example.com" type="email" />
              <InputField label="LinkedIn" name="linkedin" value={formData.contact.linkedin} onChange={(e) => handleNestedChange("contact", e)} placeholder="linkedin.com/in/yourprofile" />
              <InputField label="GitHub" name="github" value={formData.contact.github} onChange={(e) => handleNestedChange("contact", e)} placeholder="github.com/yourusername" />
              <InputField label="Twitter" name="twitter" value={formData.contact.twitter} onChange={(e) => handleNestedChange("contact", e)} placeholder="twitter.com/yourhandle" />
              <InputField label="Facebook" name="facebook" value={formData.contact.facebook} onChange={(e) => handleNestedChange("contact", e)} placeholder="facebook.com/yourprofile" />
              <InputField label="Instagram" name="instagram" value={formData.contact.instagram} onChange={(e) => handleNestedChange("contact", e)} placeholder="instagram.com/yourusername" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" disabled={isLoading} className="w-full max-w-xs px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:shadow-outline disabled:bg-gray-400">
              {isLoading ? "Saving..." : "Submit Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

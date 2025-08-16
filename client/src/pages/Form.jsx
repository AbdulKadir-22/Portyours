import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import axios from "axios";
import { IKContext, IKUpload } from 'imagekitio-react';

// --- Environment Variable Check ---
// We read the variables here to check them before rendering.
const imageKitPublicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const imageKitUrlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

// --- Reusable UI Components ---
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline" />
  </div>
);
const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <textarea name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline h-24" />
  </div>
);

// --- Custom Clickable Image Uploader ---
const CustomImageUpload = ({ onUploadSuccess, onUploadError, fileName, existingImageUrl }) => {
    const ikUploadRef = useRef(null);
    return (
        <div className="flex flex-col items-center">
            <div 
                className="flex flex-col items-center justify-center w-40 h-40 p-6 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100 hover:border-yellow-500 cursor-pointer transition-colors"
                onClick={() => ikUploadRef.current && ikUploadRef.current.click()}
            >
                <FaCamera size={40} />
                <span className="mt-2 text-sm font-semibold text-center">Upload Image</span>
            </div>
            <div style={{ display: 'none' }}>
                <IKUpload
                    ref={ikUploadRef}
                    fileName={fileName}
                    onSuccess={onUploadSuccess}
                    onError={onUploadError}
                />
            </div>
            {existingImageUrl && (
                <div className="mt-4">
                    <img src={existingImageUrl} alt="Preview" className="w-32 h-32 rounded-lg object-cover shadow-md" />
                </div>
            )}
        </div>
    );
};

// --- Main Form Component ---
const Form = () => {
    const [formData, setFormData] = useState({
        home: { name: "", title: "", description: "", profilePhoto: "" },
        about: { course: "", aboutYourself: "", aboutImage: "" },
        skills: { aboutSkills: "", skillIcons: [] },
        projects: [],
        contact: { name: "", email: "", github: "", twitter: "", linkedin: "", facebook: "", instagram: "" },
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // --- API and ImageKit Config ---
    const api = axios.create({ baseURL: 'http://localhost:5000/api' });
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('authToken');
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, Promise.reject);

    const authenticator = async () => {
        try {
            const response = await api.get('/user/imagekit-auth');
            return response.data;
        } catch (error) {
            console.error("ImageKit Auth Error:", error);
            setError("Could not authenticate for image uploads.");
            return Promise.reject("ImageKit auth failed");
        }
    };

    // --- Data Fetching ---
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await api.get('/portfolio');
                if (response.data) {
                    setFormData({ ...response.data, projects: response.data.projects || [], skills: { ...response.data.skills, skillIcons: response.data.skills?.skillIcons || [] } });
                }
            } catch (err) {
                if (err.response?.status !== 404) setError("Couldn't load your data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPortfolioData();
    }, []);

    // --- Handlers ---
    const handleNestedChange = (section, e) => setFormData(p => ({ ...p, [section]: { ...p[section], [e.target.name]: e.target.value } }));
    const handleProjectChange = (index, e) => setFormData(p => ({ ...p, projects: p.projects.map((proj, i) => i === index ? { ...proj, [e.target.name]: e.target.value } : proj) }));
    const addProject = () => setFormData(p => ({ ...p, projects: [...(p.projects || []), { title: "", description: "", imageUrl: "" }] }));
    const onUploadSuccess = (section, field, res) => setFormData(p => ({ ...p, [section]: { ...p[section], [field]: res.url } }));
    const onProjectImageUploadSuccess = (index, res) => setFormData(p => ({ ...p, projects: p.projects.map((proj, i) => i === index ? { ...proj, imageUrl: res.url } : proj) }));
    const addSkill = () => setFormData(p => ({ ...p, skills: { ...p.skills, skillIcons: [...(p.skills.skillIcons || []), { name: "", iconUrl: "" }] } }));
    const removeSkill = (index) => setFormData(p => ({ ...p, skills: { ...p.skills, skillIcons: p.skills.skillIcons.filter((_, i) => i !== index) } }));
    const onSkillIconUploadSuccess = (index, res) => setFormData(p => ({ ...p, skills: { ...p.skills, skillIcons: p.skills.skillIcons.map((s, i) => i === index ? { ...s, iconUrl: res.url } : s) } }));
    const handleSkillNameChange = (index, e) => setFormData(p => ({ ...p, skills: { ...p.skills, skillIcons: p.skills.skillIcons.map((s, i) => i === index ? { ...s, name: e.target.value } : s) } }));
    const onUploadError = (err) => { console.error("Upload Error:", err); setError("Image upload failed. Please try again."); };

    // --- Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess(""); setIsLoading(true);
        try {
            const response = await api.post("/portfolio", formData);
            setFormData({ ...response.data, projects: response.data.projects || [], skills: { ...response.data.skills, skillIcons: response.data.skills?.skillIcons || [] } });
            setSuccess("Portfolio saved successfully!");
        } catch (err) {
            setError("Failed to save portfolio. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- BUILT-IN CHECK ---
    // This will render an error message instead of the form if the keys are missing.
    if (!imageKitPublicKey || !imageKitUrlEndpoint) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-8" role="alert">
                <p className="font-bold">Configuration Error</p>
                <p>ImageKit keys are missing. Please check your frontend <strong>.env</strong> file and ensure the following variables are set correctly:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>VITE_IMAGEKIT_PUBLIC_KEY</li>
                    <li>VITE_IMAGEKIT_URL_ENDPOINT</li>
                </ul>
                <p className="mt-2">Remember to <strong>restart your development server</strong> after making changes.</p>
            </div>
        );
    }

    if (isLoading && !formData.home.name) {
        return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin mr-2" /> Loading your data...</div>;
    }

    return (
        <IKContext publicKey={imageKitPublicKey} urlEndpoint={imageKitUrlEndpoint} authenticator={authenticator}>
            <div className="bg-yellow-50 min-h-screen p-4 sm:p-8 flex justify-center">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-yellow-600 mb-8 text-center">Create & Update Your Portfolio</h1>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-12">
                        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}
                        {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">{success}</div>}
                        
                        {/* --- FORM SECTIONS --- */}
                        <div className="p-6 border rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Home Page</h2>
                            <div className="grid md:grid-cols-3 gap-8 items-start">
                                <div className="md:col-span-2">
                                    <InputField label="Your Name" name="name" value={formData.home.name} onChange={e => handleNestedChange("home", e)} />
                                    <InputField label="Title" name="title" value={formData.home.title} onChange={e => handleNestedChange("home", e)} />
                                    <TextareaField label="Description" name="description" value={formData.home.description} onChange={e => handleNestedChange("home", e)} />
                                </div>
                                <CustomImageUpload fileName="profile-photo.jpg" onUploadSuccess={res => onUploadSuccess('home', 'profilePhoto', res)} onUploadError={onUploadError} existingImageUrl={formData.home.profilePhoto} />
                            </div>
                        </div>

                        <div className="p-6 border rounded-xl">
                             <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Page</h2>
                             <div className="grid md:grid-cols-3 gap-8 items-start">
                                 <div className="md:col-span-2">
                                     <InputField label="Your Course / Field" name="course" value={formData.about.course} onChange={e => handleNestedChange("about", e)} />
                                     <TextareaField label="About Yourself" name="aboutYourself" value={formData.about.aboutYourself} onChange={e => handleNestedChange("about", e)} />
                                 </div>
                                 <CustomImageUpload fileName="about-image.jpg" onUploadSuccess={res => onUploadSuccess('about', 'aboutImage', res)} onUploadError={onUploadError} existingImageUrl={formData.about.aboutImage} />
                             </div>
                         </div>

                        <div className="p-6 border rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills Section</h2>
                            <TextareaField label="About Skills" name="aboutSkills" value={formData.skills.aboutSkills} onChange={e => handleNestedChange("skills", e)} />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
                                {(formData.skills.skillIcons || []).map((skill, index) => (
                                    <div key={index} className="relative p-2 border rounded-lg">
                                        <InputField label={`Skill ${index + 1} Name`} name="name" value={skill.name} onChange={e => handleSkillNameChange(index, e)} placeholder="e.g., React" />
                                        <CustomImageUpload fileName={`skill-${index}.png`} onUploadSuccess={res => onSkillIconUploadSuccess(index, res)} onUploadError={onUploadError} existingImageUrl={skill.iconUrl} />
                                        <button type="button" onClick={() => removeSkill(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600"><FaTrash /></button>
                                    </div>
                                ))}
                            </div>
                             <button type="button" onClick={addSkill} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FaPlus /> Add Skill</button>
                        </div>
                        
                        <div className="p-6 border rounded-xl space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                            {(formData.projects || []).map((project, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Project {index + 1}</h3>
                                    <div className="grid md:grid-cols-3 gap-8 items-start">
                                        <div className="md:col-span-2">
                                            <InputField label="Project Title" name="title" value={project.title} onChange={e => handleProjectChange(index, e)} />
                                            <TextareaField label="Project Description" name="description" value={project.description} onChange={e => handleProjectChange(index, e)} />
                                        </div>
                                        <CustomImageUpload fileName={`project-${index}.jpg`} onUploadSuccess={res => onProjectImageUploadSuccess(index, res)} onUploadError={onUploadError} existingImageUrl={project.imageUrl} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addProject} className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"><FaPlus /> Add Another Project</button>
                        </div>

                        <div className="p-6 border rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact & Socials</h2>
                            <div className="grid md:grid-cols-2 gap-x-8">
                                <InputField label="Contact Name" name="name" value={formData.contact.name} onChange={e => handleNestedChange("contact", e)} />
                                <InputField label="Email" name="email" value={formData.contact.email} onChange={e => handleNestedChange("contact", e)} type="email" />
                                <InputField label="LinkedIn" name="linkedin" value={formData.contact.linkedin} onChange={e => handleNestedChange("contact", e)} />
                                <InputField label="GitHub" name="github" value={formData.contact.github} onChange={e => handleNestedChange("contact", e)} />
                                <InputField label="Twitter" name="twitter" value={formData.contact.twitter} onChange={e => handleNestedChange("contact", e)} />
                                <InputField label="Facebook" name="facebook" value={formData.contact.facebook} onChange={e => handleNestedChange("contact", e)} />
                                <InputField label="Instagram" name="instagram" value={formData.contact.instagram} onChange={e => handleNestedChange("contact", e)} />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" disabled={isLoading} className="w-full max-w-xs px-6 py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:shadow-outline disabled:bg-gray-400">
                                {isLoading ? "Saving..." : "Submit Portfolio"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </IKContext>
    );
};

export default Form;
    
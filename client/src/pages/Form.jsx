import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { IKContext, IKUpload } from 'imagekitio-react';
import { usePortfolioForm } from '../hooks/usePortfolioForm';
import axiosInstance from "../api/axios";

// --- Environment Variable Check ---
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
    const navigate = useNavigate(); // For navigation after success

    // All logic is now imported from our custom hook
    const {
        formData,
        isLoading,
        error,
        success,
        handleNestedChange,
        handleProjectChange,
        addProject,
        onUploadSuccess,
        onProjectImageUploadSuccess,
        addSkill,
        removeSkill,
        onSkillIconUploadSuccess,
        handleSkillNameChange,
        onUploadError,
        handleSubmit,
    } = usePortfolioForm();

    // New handler to trigger navigation on success
    const handleFormSubmit = async (e) => {
        const isSuccess = await handleSubmit(e);
        if (isSuccess) {
            setTimeout(() => {
                navigate('/portfolio');
            }, 2000);
        }
    };

    const authenticator = async () => {
        try {
            const response = await axiosInstance.get('/user/imagekit-auth');
            return response.data;
        } catch (error) {
            console.error("ImageKit Auth Error:", error);
            return Promise.reject("ImageKit auth failed");
        }
    };

    // --- BUILT-IN CHECKS ---
    if (!imageKitPublicKey || !imageKitUrlEndpoint) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-8" role="alert">
                <p className="font-bold">Configuration Error: ImageKit keys are missing in .env</p>
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
                    <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-12">
                        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>}
                        {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">{success}</div>}

                        {/* --- Home Page Section --- */}
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

                        {/* --- About Page Section --- */}
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

                        {/* --- Skills Section --- */}
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
                        
                        {/* --- Projects Section --- */}
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

                        {/* --- Contact & Socials Section --- */}
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
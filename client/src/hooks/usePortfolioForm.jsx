import { useState, useEffect } from "react";
import axiosInstance from "../api/axios"; // Use the central axios instance

export const usePortfolioForm = () => {
    // ✨ All state management is now inside the hook
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

    // ✨ Data fetching logic is here
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axiosInstance.get('/portfolio');
                if (response.data) {
                    // Ensure nested arrays are initialized properly
                    const data = response.data;
                    setFormData({
                        ...data,
                        projects: data.projects || [],
                        skills: { ...data.skills, skillIcons: data.skills?.skillIcons || [] }
                    });
                }
            } catch (err) {
                if (err.response?.status !== 404) {
                    setError("Couldn't load your existing data. Please check your connection.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPortfolioData();
    }, []); // Empty dependency array means this runs once on mount

    // ✨ All event handlers are defined inside the hook
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

    // ✨ Form submission logic is here

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/portfolio", formData);
            setFormData({ /* ... (no changes here) */ });
            setSuccess("Portfolio saved successfully! Redirecting..."); // ✨ Updated message
            window.scrollTo(0, 0);
            return true; // ✨ ADD THIS LINE
        } catch (err) {
            setError("Failed to save portfolio. Please try again.");
            return false; // ✨ ADD THIS LINE
        } finally {
            setIsLoading(false);
        }
    };

    // ✨ The hook returns everything the component needs to render the UI
    return {
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
    };
};
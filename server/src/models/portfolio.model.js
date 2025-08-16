const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  // Link to the user who owns this portfolio
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'USER', // This must match the model name you used for users, e.g., mongoose.model("USER", userSchema)
    required: true,
    unique: true, // Ensures one user has only one portfolio
  },

  // --- Home Page Section ---
  home: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    profilePhoto: { type: String, default: '' }, // URL to the uploaded image
  },

  // --- About Page Section ---
  about: {
    course: { type: String, default: '' },
    aboutYourself: { type:String, default: '' },
    aboutImage: { type: String, default: '' }, // URL to the uploaded image
  },

  // --- Skills Section ---
  skills: {
    aboutSkills: { type: String, default: '' },
    // An array to hold multiple skill icons/names
    skillIcons: [
        { 
            name: { type: String },
            iconUrl: { type: String } // URL for each skill icon
        }
    ]
  },

  // --- Projects Section ---
  projects: [ // An array to hold multiple project entries
    {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      imageUrl: { type: String, default: '' }, // URL to the project image
    }
  ],

  // --- Contact Page / Footer Section ---
  contact: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
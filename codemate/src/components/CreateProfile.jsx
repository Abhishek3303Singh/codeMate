import React, { useState, useEffect } from "react";
import { createProfile, clearErr, resetCreated } from "../store/userProfileSlice";
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { STATUSES } from '../store/signupSlice'

const CreateProfile = () => {
  const { user, status, resErr, isCreated } = useSelector((state) => state.profileData)
  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    about: "",
    gender: "",
    photos: [],
    skills: [],
    experienceLevel: "New Developer",
    github: "",
    projects: [],
  });
  const [previewImage, setImagePreview] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (resErr && user?.status === "failed") {

      toast.error(user.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        toastClassName: "Toastify__toast--error",
        progressStyle: {
          background: "red",
        },
      })
      dispatch(clearErr())
      dispatch(resetCreated)

    }

    if(isCreated && user.status==="success"){
      navigate("/feed")

    }
  }, [resErr,isCreated, user?.status])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillAdd = () => {
    if (formData.skills.length < 15) {
      setFormData({ ...formData, skills: [...formData.skills, ""] });
    }
  };

  const handleProjectAdd = () => {
    setFormData({ ...formData, projects: [...formData.projects, ""] });
  };

  const handlePhotoUpload = (e) => {


    const files = Array.from(e.target.files)
    // console.log(files, 'Files')
    // setImage([])
    setImagePreview([])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result])
          // setImage((old) => [...old, reader.result])
          setFormData({ ...formData, photos: [...formData.photos, reader.result] });
        }
      }
      reader.readAsDataURL(file)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Profile Submitted:", formData);
    dispatch(createProfile(formData))
  };
if(status===STATUSES.LOADING){
  return(
    <Loader/>
  )
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8 mb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Create Your Profile</h2>
          <p className="mt-2 text-sm">Let the world know about your skills and experience!</p>
        </div>
        <div className="p-6 space-y-6">
          
          <div>
            <label className="block text-sm font-medium mb-2">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              maxLength="100"
              required
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium mb-2">Contact</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-2">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Say something about yourself"
              maxLength="200"
            ></textarea>
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

        
          <div>
            <label className="block text-sm font-medium mb-2">Upload Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex space-x-2">
              {formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Uploaded ${index}`}
                  className="h-16 w-16 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                value={formData.skills[index]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: formData.skills.map((s, i) =>
                      i === index ? e.target.value : s
                    ),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mt-2"
                placeholder={`Skill ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleSkillAdd}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Add Skill
            </button>
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-2">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="New Developer">New Developer</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-2">GitHub</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="GitHub Profile URL"
              maxLength="300"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-2">Projects</label>
            {formData.projects.map((project, index) => (
              <input
                key={index}
                type="text"
                value={formData.projects[index]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projects: formData.projects.map((p, i) =>
                      i === index ? e.target.value : p
                    ),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mt-2"
                placeholder={`Project ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleProjectAdd}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Add Project
            </button>
          </div>

          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;

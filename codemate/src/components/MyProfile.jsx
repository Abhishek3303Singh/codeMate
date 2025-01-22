import React, { useState } from "react";
import { useSelector } from "react-redux";
import profilePlaceholder from "../images/profile.png"; // Placeholder image for users without a profile picture
import { useNavigate } from "react-router-dom";
const MyProfilePage = () => {
  const { user } = useSelector((state) => state.signupUser);
  const { user: userData } = useSelector((state) => state.profileData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate()
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-pink-900 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-gray-700">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-5xl font-bold text-white drop-shadow-md">
            {user?.data?.firstName} {user?.data?.lastName || "User"}
          </h1>
          <p className="text-2xl font-bold text-pink-400 mt-2">
            {userData?.data?.userName || "Username"}
          </p>
          <p className="text-sm text-purple-300 mt-1">
            {userData?.data?.contact || "Contact Info"}
          </p>
        </div>

        {/* Photos Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-pink-400 mb-4">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userData?.data?.photos?.length > 0 ? (
              userData.data.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url || profilePlaceholder}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-40 object-fill rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => openModal(photo.url)}
                />
              ))
            ) : (
              <p className="text-gray-400">No photos added yet.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="bg-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-pink-400 mb-4">About Me</h2>
            <p className="text-gray-300 text-justify leading-relaxed">
              {userData?.data?.about || "This user has not added an about section yet."}
            </p>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-pink-400 mb-4">Skills</h2>
            <ul className="list-disc list-inside text-gray-300">
              {userData?.data?.skills?.length > 0
                ? userData?.data?.skills.map((skill, index) => (
                    <li key={index} className="hover:text-indigo-400 transition-all">
                      {skill}
                    </li>
                  ))
                : "No skills added yet."}
            </ul>
          </div>

          {/* Experience Section */}
          <div className="bg-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-pink-400 mb-4">Experience Level</h2>
            <p className="text-gray-300">
              {userData?.data?.experienceLevel || "Experience level not specified."}
            </p>
          </div>

          {/* Projects Section */}
          <div className="bg-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-pink-400 mb-4">Projects</h2>
            <ul className="list-disc list-inside text-gray-300">
              {userData?.data?.projects?.length > 0
                ? userData?.data?.projects.map((project, index) => (
                    <li key={index} className="hover:text-indigo-400 transition-all">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        {project}
                      </a>
                    </li>
                  ))
                : "No projects added yet."}
            </ul>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-12 text-center">
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-600 transition-transform transform hover:scale-110"
            onClick={() => navigate("/update/profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl mx-auto">
            <img
              src={modalImage}
              alt="Full Profile"
              className="rounded-lg shadow-2xl max-h-[80vh] w-auto cursor-pointer"
            />
            <button
              className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600 shadow-md hover:shadow-lg"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;

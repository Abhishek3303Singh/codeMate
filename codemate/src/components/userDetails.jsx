import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const user = location?.state?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <p className="text-xl text-gray-300">User details not available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-5xl mx-auto bg-opacity-60 bg-clip-padding backdrop-filter backdrop-blur-xl border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-600 to-red-500 text-white p-8">
            <img
            onClick={() => openModal(user?.photos[0]?.url )}
              src={
                user?.photos[0]?.url || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-44 h-44 rounded-full shadow-xl border-4 border-white"
            />
            <h2 className="text-4xl font-bold mt-4 tracking-wide">
              {user?.userName || "Unknown User"}
            </h2>
            <p className="text-gray-200 text-center mt-2 italic">
              {user?.about || "No bio available."}
            </p>
          </div>

          {/* Details Section */}
          <div className="col-span-2 p-8 space-y-6 bg-gray-800 bg-opacity-90">
            <div>
              <h3 className="text-xl font-semibold text-pink-400">Contact</h3>
              <p className="text-gray-300 mt-2">{user?.contact || "Not provided"}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-400">Skills</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {user?.skills?.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-sm text-gray-300 px-4 py-2 rounded-full shadow-lg"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No skills listed.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-400">Experience Level</h3>
              <p className="text-gray-300 mt-2">{user?.experienceLevel || "Not specified"}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-400">GitHub</h3>
              <a
                href={user?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline block mt-2 transition duration-200"
              >
                {user?.github || "No GitHub link provided"}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-400">Projects</h3>
              <ul className="space-y-2 mt-2">
                {user?.projects?.length > 0 ? (
                  user.projects.map((project, index) => (
                    <li key={index}>
                      <a
                        href={project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline transition duration-200"
                      >
                        {project}
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400">No Projects yet.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl mx-auto">
            <img
              src={modalImage}
              alt="Full Profile"
              className="rounded-lg shadow-lg max-h-[80vh] w-auto cursor-pointer"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-800"
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

export default UserDetails;

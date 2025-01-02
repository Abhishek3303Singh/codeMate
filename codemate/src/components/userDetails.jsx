import React from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const user = location?.state?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <p className="text-xl text-gray-300">User details not available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-5xl mx-auto bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-purple-700 p-6">
            <img
              src={
                user?.senderProfileId?.photos[0]?.url ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-lg border-4 border-white"
            />
            <h2 className="text-4xl font-bold mt-4">
              {user?.senderProfileId?.userName || "Unknown User"}
            </h2>
            <p className="text-md text-gray-200 mt-2">
              {user?.senderProfileId?.about || "No bio available."}
            </p>
          </div>

          {/* Details Section */}
          <div className="col-span-2 p-6">
            <h3 className="text-lg font-semibold text-indigo-400">Contact</h3>
            <p className="text-gray-300 mt-2">
              {user?.senderProfileId?.contact || "Not provided"}
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-indigo-400">Skills</h3>
              <ul className="mt-2 space-y-2">
                {user?.senderProfileId?.skills?.length > 0 ? (
                  user?.senderProfileId?.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 rounded-lg px-3 py-1 inline-block text-sm mx-1"
                    >
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No skills listed.</li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-indigo-400">Experience Level</h3>
              <p className="text-gray-300 mt-2">
                {user?.senderProfileId?.experienceLevel || "Not specified"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-indigo-400">GitHub</h3>
              <a
                href={user?.senderProfileId.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 hover:underline mt-1 block"
              >
                {user?.senderProfileId?.github || "No GitHub link provided"}
              </a>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-indigo-400">Projects</h3>
              <ul className="mt-2 space-y-2">
                {user?.senderProfileId?.projects?.length > 0 ? (
                  user?.senderProfileId?.projects.map((project, index) => (
                    <li key={index}>
                      <a
                        href={project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-400 hover:underline"
                      >
                        {project}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No Projects yet.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

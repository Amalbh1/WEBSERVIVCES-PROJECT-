import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
export default function UserManagement() {
  const { token } = useAuth();
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // ID of the user being edited

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/manage-user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data; // User data
      } catch (error) {
        toast.error(error.response?.data.msg);
        return null;
      }
    };
    if (!id) {
      return;
    }
    fetchUserDetails().then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }, [id]);
  const updateUserDetails = async (userId, updatedData, token) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/manage-user/${userId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Success message
    } catch (error) {
      console.error("Error updating user:", error.response?.data);
      return null;
    }
  };
  const handleEdit = () => {
    setIsEditing(user.id);
    setUser(user);
  };

  const handleSave = () => {
    updateUserDetails(user.id, user, token);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-4 py-8 max-w-7xl ">
      <div className="flex flex-row justify-between gap-4 ">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setId(e.target.value)}
            value={id || ""}
            name="id"
            placeholder="Search users by ID"
            className="border border-gray-300 rounded-md px-3 pe-8 py-2 focus:outline-none focus:ring focus:ring-blue-500 ms-auto"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M492.5 917.7c-247 0-447.9-200.9-447.9-447.9s200.9-448 447.9-448 447.9 200.9 447.9 447.9-200.9 448-447.9 448z m0-810.6c-200 0-362.6 162.7-362.6 362.6s162.7 362.6 362.6 362.6 362.6-162.7 362.6-362.6-162.6-362.6-362.6-362.6z"
                fill="#3688FF"
              />
              <path
                d="M951.1 971c-10.9 0-21.8-4.2-30.2-12.5l-96-96c-16.7-16.7-16.7-43.7 0-60.3 16.6-16.7 43.7-16.7 60.3 0l96 96c16.7 16.7 16.7 43.7 0 60.3-8.2 8.4-19.2 12.5-30.1 12.5z"
                fill="#5F6379"
              />
            </g>
          </svg>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Password
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user && (
            <tr key={user.id}>
              {isEditing === user.id ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="phone_number"
                      value={user.phone_number}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleSave(user.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(null)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <svg
                          className="h-10 w-10 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              opacity="0.1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 16.3106 20.4627 18.6515 18.5549 19.8557L18.2395 18.878C17.9043 17.6699 17.2931 16.8681 16.262 16.3834C15.2532 15.9092 13.8644 15.75 12 15.75C10.134 15.75 8.74481 15.922 7.73554 16.4097C6.70593 16.9073 6.09582 17.7207 5.7608 18.927L5.45019 19.8589C3.53829 18.6556 3 16.3144 3 12ZM8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10Z"
                              fill="#323232"
                            />{" "}
                            <path
                              d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                              stroke="#323232"
                              strokeWidth={2}
                            />{" "}
                            <path
                              d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                              stroke="#323232"
                              strokeWidth={2}
                            />{" "}
                            <path
                              d="M6 19C6.63819 16.6928 8.27998 16 12 16C15.72 16 17.3618 16.6425 18 18.9497"
                              stroke="#323232"
                              strokeWidth={2}
                              strokeLinecap="round"
                            />{" "}
                          </g>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">*********</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit()}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button className="ml-2 text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

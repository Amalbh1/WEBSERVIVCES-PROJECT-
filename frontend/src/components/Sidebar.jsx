import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const { user, logOut } = useAuth();

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <img src="logo-tt.svg" className="h-10" alt="logo" />

        <ul className="mt-6 space-y-1 ">
          <Link to="/predictdatausage">
            <p className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Predict Data Usage
            </p>
          </Link>
          <Link to="/usagehistory">
            <p className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Usage History
            </p>
          </Link>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <Link to="/profile">
                  <p className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    Details
                  </p>
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/register">
                      <p className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        Creer un compte
                      </p>
                    </Link>
                    <Link to="/admin/mangeuser">
                      <p className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        Manage Users
                      </p>
                    </Link>
                  </>
                )}
                <Link to="/security">
                  <p className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    Security
                  </p>
                </Link>

                <li>
                  <form action="#">
                    <button
                      type="submit"
                      onClick={logOut}
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          to="/profile"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt=""
            src="/images/profileAvatar.svg"
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs">
              <strong className="block font-semibold text-gray-900 capitalize text-md">
                {user.username}
              </strong>

              <span className="text-xs text-gray-500 uppercase">
                {" "}
                {user.role}{" "}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

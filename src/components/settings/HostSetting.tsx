import { getHostAI, setHostAI } from "@/pages/settings/core/_requests";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HostSetting: React.FC = () => {

  const [host, setHost] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Save logic here, e.g., API call or local storage
    setIsLoading(true);
    setHostAI({
      'host': host
    }).then((data) => {
      toast.success("Host saved successfully!"); // Success toast
    })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to save host."); // Error toast
      })
      .finally(() => setIsLoading(false));
  };

  const getHost = () => {
    setIsLoading(true);
    getHostAI().then((data) => {
      var result = data.result
      if (result) {
        setHost(result)
      }
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getHost();
  }, []);

  return (
    <div className="bg-gray-700 text-white flex p-6 w-full min-h-screen ">
      <div className="w-1/3">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Host Settings</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Host
            </label>
            <p className="text-xs text-gray-400 mb-2">
              The host of server AI
            </p>
            <input
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              type="text"
              id="name"
              value={host}
              onChange={(e) => setHost(e.target.value)} // Update state on input change
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 ${host && !isLoading
              ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            disabled={!host || isLoading} // Disable if host is empty or loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                Loading...
              </div>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostSetting;

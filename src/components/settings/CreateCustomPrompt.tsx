// pages/create-project.tsx
import { CustomPrompt } from "@/pages/settings/core/_models";
import { createCustomPrompt, updateCustomPrompt } from "@/api/_requests_setting";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  setIsOpen: (value: boolean, submit: boolean) => void;
  data?: CustomPrompt
}

const CreateCustomPrompt: React.FC<ModalProps> = ({ setIsOpen, data }) => {

  const [promptName, setPromptName] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!promptName || !promptDescription) {
      alert("Please fill in all fields.");
      return;
    }

    var body = {
      'guid': data?.guid,
      'name': promptName,
      'custom_prompt': promptDescription,
    }

    setIsLoading(true);

    if (data) {

      updateCustomPrompt(body).then((data) => {
        toast.success("Custom prompt updated successfully!"); // Success toast
        // Close the form
        setIsOpen(false, true);
      })
        .catch((e) => {
          console.error(e);
          toast.error("Failed to save host."); // Error toast
        })
        .finally(() => setIsLoading(false));

      return

    }

    createCustomPrompt(body).then((data) => {
      toast.success("Custom prompt saved successfully!"); // Success toast
      // Close the form
      setIsOpen(false, true);
    })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to save host."); // Error toast
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (data) {
      setPromptName(data.name ?? '')
      setPromptDescription(data.custom_prompt ?? '')
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Create a new custom prompt</h2>
        <p className="text-gray-400 mb-4">
          Projects are shared environments where teams can collaborate and share API resources. You can set custom rate
          limits and manage access to resources.{" "}
          <a href="#" className="text-teal-400">
            Learn more.
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="project-name"
              placeholder="Prompt Name"
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              className="w-full px-3 py-2 border border-teal-400 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Custom Prompt
            </label>
            <textarea
              id="project-description"
              placeholder="Prompt"
              value={promptDescription}
              onChange={(e) => setPromptDescription(e.target.value)}
              className="w-full px-3 py-2 border border-teal-400 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              rows={15}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false, false)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 ${!isLoading
                ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              disabled={isLoading} // Disable if host is empty or loading
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomPrompt;

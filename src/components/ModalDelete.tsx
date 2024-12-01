import { CustomPrompt } from "@/pages/settings/core/_models";
import React, { useState } from "react";

interface ModalProps {
    setIsOpen: (value: boolean) => void;
    handleDelete: (guid: string) => void;
    guid: string;
    name: string;
    desc?: string;
}

const ModalDelete: React.FC<ModalProps> = ({ setIsOpen, handleDelete, guid, name, desc }) => {

    const [inputDelete, setInputDelete] = useState("");

    const onDelete = () => {
        handleDelete(guid ?? '')
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-3/4">
                <h2 className="text-xl font-semibold mb-4">Delete {name}</h2>
                <p className="text-sm mb-4">
                    {desc ?? "By archiving, you will be removing access to all members of this project including yourself. All requests using the project's API keys will be rejected. Archived projects cannot be restored."}
                </p>
                <p className="text-sm mb-4">
                    To confirm, type <span className="font-bold">&quot;{name}&quot;</span> in the input box
                </p>
                <input
                    type="text"
                    value={inputDelete}
                    placeholder="Confirm by name"
                    className="w-full p-2 border border-green-500 rounded-md bg-gray-900 text-white mb-4"
                    onChange={(e) => setInputDelete(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                    <button
                        disabled={inputDelete.toLocaleLowerCase() != name?.toLowerCase()}
                        onClick={onDelete}
                        className={`px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 ${(inputDelete.toLocaleLowerCase() == name?.toLowerCase())
                            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                            : "bg-gray-500 text-gray-300 cursor-not-allowed"
                            }`}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;

// pages/index.tsx
import { SQLConnection } from '@/pages/settings/core/_models';
import { createSQLConnection, updateSQLConnection } from '@/pages/settings/core/_requests';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ModalProps {
    setIsOpen: (value: boolean, submit: boolean) => void;
    data?: SQLConnection
}

const CreateNewConnectionSQL: React.FC<ModalProps> = ({ setIsOpen, data }) => {

    const [formState, setFormState] = useState({
        guid: "",
        name: "",
        database_name: "",
        database_logo: "",
        user: "",
        password: "",
        host: "",
        port: "",
    });

    var isEdit = Boolean(data);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [selected, setSelected] = useState<number>(1);
    const [errors, setErrors] = useState<Record<string, string>>({}); // Object to hold validation errors

    const databases = [
        {
            id: 1,
            uniq: "postgree-sql",
            name: "PostgreSQL",
            logo: "https://i0.wp.com/softwareengineeringdaily.com/wp-content/uploads/2016/10/PostgreSQL.png?fit=610%2C280",
        },
        {
            id: 2,
            uniq: "mysql",
            name: "MySQL",
            logo: "https://pngimg.com/uploads/mysql/mysql_PNG35.png",
        },
        {
            id: 3,
            uniq: "sql-server",
            name: "SQL Server",
            logo: "https://www.techsoupindonesia.or.id/sites/default/files/SQL-Server-2012_0.png",
        },
        {
            id: 4,
            uniq: "oracle-server",
            name: "Oracle Server",
            logo: "https://download.logo.wine/logo/Oracle_Database/Oracle_Database-Logo.wine.png",
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [id]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [id]: "", // Clear the error for the field as user starts typing
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.name.trim()) {
            newErrors.name = "Connection name is required.";
        }
        if (!formState.database_name.trim()) {
            newErrors.database_name = "Database name is required.";
        }
        if (!formState.user.trim()) {
            newErrors.user = "Database user is required.";
        }
        if (!formState.password.trim()) {
            newErrors.password = "Database password is required.";
        }
        if (!formState.host.trim()) {
            newErrors.host = "Server host is required.";
        }
        if (!formState.port.trim()) {
            newErrors.port = "Port is required.";
        }
        return newErrors;
    };


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop submission if there are errors
        }

        const selectedDatabase = databases.find((db) => db.id === selected);

        const body = {
            ...formState,
            database_type: selectedDatabase?.uniq || "Unknown",
            database_logo: selectedDatabase?.logo || "Unknown",
        };

        setIsLoading(true);

        if (data) {

            updateSQLConnection(body).then((data) => {
                toast.success("SQL connection updated successfully!"); // Success toast
                // Close the form
                setIsOpen(false, true);
            })
                .catch((e) => {
                    console.error(e);
                    toast.error("Failed to save SQL connection."); // Error toast
                })
                .finally(() => setIsLoading(false));

            return

        }

        createSQLConnection(body).then((data) => {
            toast.success("SQL connection saved successfully!"); // Success toast
            // Close the form
            setIsOpen(false, true);
        })
            .catch((e) => {
                console.error(e);
                toast.error("Failed to save SQL connection."); // Error toast
            })
            .finally(() => setIsLoading(false));

        // Perform further actions, e.g., API call or saving to storage
    };

    useEffect(() => {
        if (data) {
            setFormState({
                guid: data?.guid ?? '',
                name: data?.name ?? '',
                database_name: data?.database_name ?? '',
                database_logo: data?.database_logo ?? '',
                user: data?.user ?? '',
                password: data?.password ?? '',
                host: data?.host ?? '',
                port: data?.port ?? '',
            });


            const selectedDatabase = databases.findIndex((db) => db.uniq === data.database_type);
            setSelected(selectedDatabase + 1)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <div className="text-white font-inter">
                <div className="fixed inset-0 flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-800 p-6 rounded-lg w-2/5 max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'New'} SQL Connection</h2>
                        <p className="text-sm mb-4">
                            Add the connection information for your database below, and it will be available for future SQL agent calls.
                        </p>
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            <p className="text-sm font-semibold">
                                WARNING: The SQL agent has been{' '}
                                <span className="font-bold">instructed</span> to only perform non-modifying queries. This does not prevent a hallucination
                                from still deleting data. Only connect with a user who has{' '}
                                <span className="font-bold">READ_ONLY</span> permissions.
                            </p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">Select your SQL engine</p>
                            <div className="flex space-x-4">
                                {databases.map((db) => (
                                    <div
                                        key={db.id}
                                        onClick={() => setSelected(db.id)}
                                        className={`p-2 bg-white rounded cursor-pointer ${selected === db.id ? 'border-4 border-blue-500' : 'border border-gray-300'
                                            }`}
                                    >
                                        <img alt={`${db.name} logo`} className="w-12 h-12" src={db.logo} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-sm mb-1" htmlFor="name">
                                    Connection name
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder="Connection Name"
                                    type="text"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm mb-1" htmlFor="database_name">
                                    Database name
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="database_name"
                                    value={formState.database_name}
                                    onChange={handleInputChange}
                                    placeholder="Database name"
                                    type="text"
                                />
                                {errors.database_name && <p className="text-red-500 text-sm">{errors.database_name}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-sm mb-1" htmlFor="user">
                                    Database user
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="user"
                                    value={formState.user}
                                    onChange={handleInputChange}
                                    placeholder="root"
                                    type="text"
                                />
                                {errors.user && <p className="text-red-500 text-sm">{errors.user}</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm mb-1" htmlFor="password">
                                    Database password
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="password"
                                    value={formState.password}
                                    onChange={handleInputChange}
                                    placeholder="password123"
                                    type="password"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <div className="w-2/3">
                                <label className="block text-sm mb-1" htmlFor="host">
                                    Server endpoint
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="host"
                                    value={formState.host}
                                    onChange={handleInputChange}
                                    placeholder="The hostname or endpoint for your database"
                                    type="text"
                                />
                                {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm mb-1" htmlFor="port">
                                    Port
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 rounded text-white"
                                    id="port"
                                    value={formState.port}
                                    onChange={handleInputChange}
                                    placeholder="3306"
                                    type="text"
                                />
                                {errors.port && <p className="text-red-500 text-sm">{errors.port}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-7">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false, false)}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit" // Change to "submit" for form handling
                                className={`px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 ${!isLoading
                                    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                                        Loading...
                                    </div>
                                ) : (
                                    isEdit ? 'Edit connection' : 'Save connection'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateNewConnectionSQL;

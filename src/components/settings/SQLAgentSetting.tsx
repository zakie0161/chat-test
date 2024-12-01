// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import CreateNewConnectionSQL from "./CreateNewConnectionSQL";
import { deleteSQLConnection, getSQLConnections } from "@/pages/settings/core/_requests";
import { SQLConnection } from "@/pages/settings/core/_models";
import ModalDelete from "../ModalDelete";
import TrainingDatabase from "./TrainingDatabase";

const SQLAgentSetting = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [trainingDatabaseData, setTrainingDatabaseData] = useState<SQLConnection>(); // Training Database
  const [sqlConnections, setSQLConnections] = useState<Array<SQLConnection>>(); // Loading state
  const [deleteSQLConnectionData, setDeleteSQLConnectionData] = useState<SQLConnection>(); // Loading state
  const [editSQLConnectionData, setEditSQLConnectionData] = useState<SQLConnection>(); // Loading state

  const getSQLConnection = () => {
    setIsLoading(true);
    getSQLConnections().then((data) => {
      var result = data.result
      setSQLConnections(result)
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteSQLConnection = (guid: string) => {
    setIsLoading(true);
    deleteSQLConnection(guid).then((data) => {
      setDeleteSQLConnectionData(undefined)
      getSQLConnection();
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getSQLConnection();
  }, []);

  return (
    <>
      <Head>
        <title>Database Connections</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-700 text-white font-sans w-full min-h-screen p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">SQL Agent</h1>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          Enable your agent to leverage SQL to answer your questions by connecting to
          various SQL database providers.
        </p>

        {/* Database Connections */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-medium mb-4">Your Database Connections</h2>
          <div className="space-y-4">
            {!isLoading && sqlConnections?.map((connection) => (
              <div
                key={connection.guid}
                className="flex items-center bg-gray-800 p-4 rounded shadow-sm cursor-pointer"
                onClick={() => setEditSQLConnectionData(connection)} // Handle click on the parent
              >
                {/* Connection Logo */}
                <div
                  className={`p-2 mr-4 bg-white rounded cursor-pointer ${'border border-gray-300'}`}
                  onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to the parent
                >
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={`${connection.database_type} logo`}
                      className="w-10 h-10"
                      src={connection.database_logo ?? ''}
                    />
                  }
                </div>
                {/* Connection Details */}
                <div className="flex-1">
                  <p className="text-base font-semibold">{connection.name}</p>
                  <p className="text-sm text-gray-400">{connection.database_type}</p>
                </div>
                {/* Training Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling to the parent
                    setTrainingDatabaseData(connection)
                  }}
                  className="text-gray-400 hover:text-green-500 transition mr-4"
                  aria-label={`Training ${connection.name}`}
                >
                  <i className="fas fa-book-open"></i>
                </button>
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling to the parent
                    setDeleteSQLConnectionData(connection);
                  }}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label={`Remove ${connection.name}`}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Add New Connection */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center mt-6 text-blue-500 hover:text-blue-400 cursor-pointer transition"
          >
            <i className="fas fa-plus mr-2"></i>
            <p className="text-base">New SQL Connection</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen || Boolean(editSQLConnectionData)} setIsOpen={setIsOpen} title="Example Modal">
        <CreateNewConnectionSQL
          data={editSQLConnectionData}
          setIsOpen={(isOpen, submit) => {
            setIsOpen(isOpen)
            setEditSQLConnectionData(undefined)
            if (submit) {
              getSQLConnection()
            }
          }} />
      </Modal>
      <Modal isOpen={Boolean(deleteSQLConnectionData)} setIsOpen={() => setDeleteSQLConnectionData(undefined)} title="Example Modal">
        <ModalDelete
          setIsOpen={() => setDeleteSQLConnectionData(undefined)}
          handleDelete={(guid => {
            handleDeleteSQLConnection(guid);
          })}
          guid={deleteSQLConnectionData?.guid ?? ''}
          name={deleteSQLConnectionData?.name ?? ''}
        />
      </Modal>
      <Modal
        isFullWidth
        isOpen={Boolean(trainingDatabaseData)}
        setIsOpen={() => setTrainingDatabaseData(undefined)} title="Example Modal">
        <TrainingDatabase
          setIsOpen={() => setTrainingDatabaseData(undefined)}
          sqlConnection={trainingDatabaseData!}
        />
      </Modal>
    </>
  );
};

export default SQLAgentSetting;

import { SQLConnection, TrainingConnection } from "@/pages/settings/core/_models";
import { createTrainingConnection, getTrainingConnections, nlToSqlStream } from "@/api/_requests_setting";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const sqlFormatter = require("sql-formatter");

interface ModalProps {
  setIsOpen: (value: boolean, submit: boolean) => void;
  sqlConnection: SQLConnection
}

const TrainingDatabase: React.FC<ModalProps> = ({ setIsOpen, sqlConnection }) => {

  const [trainingConnections, setTrainingConnections] = useState<Array<TrainingConnection>>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false); // Loading state
  const [isGenerateIndex, setIsGenerateIndex] = useState(-1); // Loading state
  const [generate, setGenerate] = useState(''); // Loading state

  const beautifyQuery = (element: HTMLElement, index: number) => {
    // Add `sql-formatter` as a dependency
    const query = parsingQuery(element.innerText);
    const beautifiedQuery = sqlFormatter.format(query);
    element.innerText = beautifiedQuery;

    const updatedConnections = [...trainingConnections];
    updatedConnections[index] = {
      ...updatedConnections[index],
      query: beautifiedQuery,
    };
    setTrainingConnections(updatedConnections);
  };

  const handlePromptKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setGenerate('')
      setIsGenerateIndex(-1); // Sembunyikan prompt
      handleSubmitDescribeQuery();
    }
  };

  const handleAddNew = () => {
    setTrainingConnections([...trainingConnections, {
      guid: '',
      database_guid: '',
      input: '',
      query: '',
      description: ''
    }])
  }

  const parsingQuery = (query: any) => {
    return query?.replaceAll('iniquerysql', '').replaceAll('iniquery', '')
  };

  const handleDelete = (index: number) => {
    const updatedItems = trainingConnections.filter((_, i) => i !== index);
    setTrainingConnections(updatedItems)
  };

  const handleSubmitDescribeQuery = async () => {
    setIsLoadingGenerate(true);

    const body = {
      input: generate
    }

    try {
      const stream = await nlToSqlStream(body);

      if (!stream) {
        throw new Error("No response stream received.");
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      setTrainingConnections((prevList) =>
        prevList.map((item, idx) => (idx === isGenerateIndex ? {...item, query: ''} : item))
      );

      let systemResponse = '';
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value).replaceAll('```', 'iniquery');
          systemResponse += chunk; // accumulate chunks into one response

          setTrainingConnections((prevList) =>
            prevList.map((item, idx) => (idx === isGenerateIndex ? {...item, query: systemResponse} : item))
          );

          // setConversation((prevList) => {
          //   const updatedList = [...prevList];
          //   updatedList[updatedList.length - 1] = { content: systemResponse, role: "system" }; // Update the last item
          //   console.log(updatedList)
          //   return updatedList;
          // });

          // Process each chunk (e.g., append to UI or store it)
        }
      }
    } catch (error) {
      console.error("Error processing stream:", error);
    } finally {
      setIsLoadingGenerate(false);
    }

    // Perform further actions, e.g., API call or saving to storage
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const updatedTrainingConnections = trainingConnections.map((trainingConnection) => {
      return {
        ...trainingConnection, // Spread the existing properties of trainingConnection
        database_guid: sqlConnection.guid // Or assign the appropriate value for `database_guid`
      };
    });

    createTrainingConnection(updatedTrainingConnections).then((data) => {
      toast.success("Training connection saved successfully!"); // Success toast
      // Close the form
      setIsOpen(false, false);
    })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to save Training connection."); // Error toast
      })
      .finally(() => setIsLoading(false));

    // Perform further actions, e.g., API call or saving to storage
  };

  const getTrainingConnection = () => {
    setIsLoading(true);
    getTrainingConnections(sqlConnection?.guid ?? '').then((data) => {
      var result = data.result
      setTrainingConnections(result ?? [])
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTrainingConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-h-screen overflow-y-auto">
        <div className="flex mb-4 ">
          <h2 className="text-xl text-white font-semibold grow">Training Connection : {sqlConnection?.name}</h2>
          <button
            onClick={() => setIsOpen(false, false)}
            className="text-red-500 hover:text-red-700 flex-none">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <p className="text-gray-400 mb-4">
          Projects are shared environments where teams can collaborate and share API resources. You can set custom rate
          limits and manage access to resources.{" "}
          <a href="#" className="text-teal-400">
            Learn more.
          </a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sample Query Cards */}
          {trainingConnections?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md relative"
            >
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-2 text-red-500 hover:text-red-700">
                <i className="fas fa-times text-lg"></i>
              </button>
              <input
                type="text"
                className="text-xl font-semibold mt-3 mb-2 w-full bg-gray-100 p-2 rounded"
                placeholder="Question"
                defaultValue={item.input}
                onChange={(e) => {
                  const updatedConnections = [...trainingConnections];
                  updatedConnections[index] = {
                    ...updatedConnections[index],
                    input: e.target.value,
                  };
                  setTrainingConnections(updatedConnections);
                }}
              />
              <p className="text-gray-700 mb-2">Query:</p>
              <pre
                contentEditable
                className="bg-gray-100 p-2 rounded w-full overflow-auto whitespace-pre-wrap break-words"
                style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                suppressContentEditableWarning={true}
                onBlur={(e) => beautifyQuery(e.target as HTMLElement, index)}
              >
                {parsingQuery(item.query)}{/* {isLoadingGenerate? parsingQuery(item.query) : sqlFormatter.format(parsingQuery(item.query))} */}
              </pre>
              <div className="flex space-x-2 mt-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  <i className="fas fa-play mr-2"></i> Run
                </button>
                <button
                  onClick={() => {
                    setGenerate('')
                    setIsGenerateIndex(isGenerateIndex === index? -1 : index);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  {isLoadingGenerate ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-magic mr-2"></i> Generate
                    </>
                  )}
                </button>
              </div>
              {isGenerateIndex === index && <input
                type="text"
                className="text-xs mt-3 mb-2 w-full bg-gray-100 rounded p-2"
                placeholder="Describe your query to generate"
                defaultValue={generate}
                onChange={(e) => setGenerate(e.target.value)}
                onKeyDown={handlePromptKeyPress}
              />}
              <textarea
                className="bg-gray-100 p-2 rounded w-full mt-2"
                rows={2}
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const updatedConnections = [...trainingConnections];
                  updatedConnections[index] = {
                    ...updatedConnections[index],
                    description: e.target.value,
                  };
                  setTrainingConnections(updatedConnections);
                }} />
            </div>
          ))}

          {/* Add New Query Button */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <i className="fas fa-plus mr-2"></i> Add New Training
            </button>
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
            onClick={handleSubmit}
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
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDatabase;

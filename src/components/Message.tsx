import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import Markdown from "markdown-to-jsx";
import ChartFromJson from "./ChartFromJson";
import { useRef, useState } from "react";
import { chatChart } from "@/api/_request_home";

const Message = (props: any) => {
  const { message } = props;
  const { role, content: text, table, database_guid } = message;

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [chart, setChart] = useState<any>();
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Referensi untuk textarea

  const isUser = role === "user";

  const handleSubmit = async () => {
    if (promptText) {
      setIsLoadingChart(true)
      var response = await chatChart({
        input: promptText,
        guid: database_guid ?? ''
      }).finally(() => setIsLoadingChart(false));

      if (response.ok) {
        const data = await response.json();
        setChart(data.result)
        setPromptText('')

      } else {
        console.error(response);
        // setErrorMessage(response.statusText);
      }
    }
  };

  const handleButtonClick = () => {
    setShowPrompt(true);
    setTimeout(() => {
      textAreaRef.current?.focus(); // Fokuskan textarea setelah muncul
    }, 0);
  };

  const handleCancelClick = () => {
    setShowPrompt(false);
    setPromptText("");
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const handlePromptKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Hindari membuat baris baru di textarea
      setPromptText(""); // Reset prompt setelah submit
      setShowPrompt(false); // Sembunyikan prompt
      handleSubmit();
    }
  };

  const handlePromptBlur = () => {
    setShowPrompt(false);
    setPromptText(""); // Reset prompt jika kehilangan fokus
  };


  return (
    <div
      className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${isUser ? "dark:bg-gray-800" : "bg-gray-50 dark:bg-[#444654]"
        }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          <div className="w-8 flex flex-col relative items-end">
            <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 text-opacity-100r">
              {isUser ? (
                <HiUser className="h-4 w-4 text-white" />
              ) : (
                <SiOpenai className="h-4 w-4 text-white" />
              )}
            </div>
            <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
              <span className="flex-grow flex-shrink-0">1 / 1</span>
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="markdown prose w-full break-words dark:prose-invert dark">
                  {!isUser && text === null ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <>
                      <div className="markdown text-white">
                        {table && "Here data table : "}
                        <Markdown
                          options={{
                            overrides: {
                              h1: {
                                component: 'h1',
                                props: {
                                  className: 'text-2xl font-bold',
                                },
                              },
                              p: {
                                component: 'p',
                                props: {
                                  className: 'text-gray-700',
                                },
                              },
                            },
                          }}
                        >
                          {text}
                        </Markdown>
                      </div>
                      {chart &&
                        <div className="flex flex-col mt-5 text-white">
                          <span className="mb-2">Here data chart : </span>
                          <ChartFromJson data={chart} />
                        </div>
                      }
                      {table && <>
                        <p className="text-gray-600 mt-2">
                          Click the button below to start creating or rebuilding a chart.
                        </p>

                        {!showPrompt && (
                          <div className="mt-6 flex">
                            <button
                              onClick={handleButtonClick}
                              disabled={isLoadingChart}
                              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                            >
                              {isLoadingChart ? (
                                <div className="flex items-center justify-center">
                                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                                  Generating chart...
                                </div>
                              ) : (
                                chart? "Rebuild Chart" :"Build Chart"
                              )}
                            </button>
                          </div>
                        )}

                        {showPrompt && (
                          <div className="mt-6">
                            <textarea
                              id="chartPrompt"
                              rows={3}
                              value={promptText}
                              ref={textAreaRef} // Hubungkan ref ke textarea
                              onChange={handlePromptChange}
                              onKeyDown={handlePromptKeyPress}
                              onBlur={handlePromptBlur} // Sembunyikan prompt jika textarea kehilangan fokus
                              className="w-full mt-2 p-2 border border-gray-300 text-gray-500 rounded-lg focus:ring focus:ring-blue-200"
                              placeholder="Describe your chart here..." />

                            <div className="mt-4 flex justify-end space-x-4">
                              <button
                                onClick={handleCancelClick}
                                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleSubmit();
                                }}
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}
                      </>}
                    </>
                  )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

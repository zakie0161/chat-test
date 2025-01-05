import { clearThread, createThread, deleteThread, getThreads } from "@/pages/home/core/_request";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Shimmer from "./Shimmer";
import { Thread } from "@/pages/home/core/_models";
import { useRouter } from "next/router";

const Sidebar = () => {

  const router = useRouter();

  const segment = router.asPath.split('/')[2];

  const [threads, setThreads] = useState<Thread[]>();

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleNewThread = async () => {
    setIsLoading(true)
    var response = await createThread({
      name: 'New Chat',
    })
      .finally(() => setIsLoading(false));

    if (response.ok) {
      const data = await response.json();
      setThreads(data.result)
      getThread()

    } else {
      console.error(response);
      // setErrorMessage(response.statusText);
    }
  };

  const getThread = () => {
    setIsLoading(true);
    getThreads().then((data) => {
      var result = data.result
      setThreads(result)
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteThreadData = (guid: string) => {
    setIsLoading(true);
    deleteThread(guid).then((data) => {
      var result = data.result
      router.push("/")
      getThread()
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const clearThreadData = () => {
    setIsLoading(true);
    clearThread().then((data) => {
      var result = data.result
      router.push("/")
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getThread();
  }, []);

  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <Link
          href={`/`}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </Link>
        {isLoading && <>
          <Shimmer className="w-full h-8 bg-gray-500 rounded-sm" />
          <Shimmer className="w-full h-8 bg-gray-500 rounded-sm" />
          <Shimmer className="w-full h-8 bg-gray-500 rounded-sm" />
          <Shimmer className="w-full h-8 bg-gray-500 rounded-sm" />
        </>}
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {!isLoading && threads?.map((item, index) => (
              <div
                key={item.guid}
                className={`flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group ${segment===item.guid?"bg-[#3e3f49]":""}`}>
                <FiMessageSquare className="h-4 w-4" />
                <Link
                  className="flex-1"
                  href={`/c/${item.guid}`}
                  onClick={(e) => e.stopPropagation()} >
                  <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                    {item.name}
                    <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l group-hover:from-[#2A2B32]"></div>
                  </div>
                </Link>
                <FaTimes
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering the parent `Link`
                    deleteThreadData(item.guid!);
                  }}
                  className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        {(threads ?? []).length > 0 && 
        <a 
        className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        onClick={() => clearThreadData()} >
          <AiOutlineMessage
            className="h-4 w-4"/>
          Clear conversations
        </a>}
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineUser className="h-4 w-4" />
          My plan
        </a>
        <Link
          href="/settings"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </Link>
        <a
          href="https://help.openai.com/en/collections/3742473-chatgpt"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Get help
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;

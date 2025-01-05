import { BaseResponse } from "@/core/_models"
import { TrainingConnection } from "@/pages/settings/core/_models"
import { Source, Thread, ThreadDetailWrapper } from "./_models"

const CHAT_CUSTOM_PROMPT_API_URL = '/generate-from-custom-prompt'
const CHAT_DATABASE_API_URL = '/generate-query'
const CHAT_CHART_API_URL = '/generate-from-chart'
const THREAD_API_URL = '/thread'

const LIST_SOURCE_API_URL = '/get-list-source'
const LIST_THREAD_API_URL = '/get-list-thread'

const GET_THREAD_API_URL = '/get-thread'

const CLEAR_THREAD_API_URL = '/clear-thread'

const chatCustomPrompt = (body: any): Promise<any> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CHAT_CUSTOM_PROMPT_API_URL}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }).then((d: any) => d)
  }

const chatDatabase = (body: any): Promise<any> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CHAT_DATABASE_API_URL}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((d: any) => d)
    .catch((error: any) => error)
  }

  const chatCustomPromptStream = async (body: Record<string, any>): Promise<ReadableStream | void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${CHAT_CUSTOM_PROMPT_API_URL}-stream`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }
  
      if (!response.body) {
        throw new Error("Response body is null.");
      }
  
      return response.body; // Guaranteed to be a ReadableStream here
    } catch (error) {
      console.error("Error in chatCustomPromptStream:", error);
      throw error; // Rethrow the error for upstream handling
    }
  };

const chatChart = (body: any): Promise<any> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CHAT_CHART_API_URL}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((d: any) => d)
    .catch((error: any) => error)
  }

const createThread = (body: any): Promise<any> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${THREAD_API_URL}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((d: any) => d)
    .catch((error: any) => error)
  }  

const getSources = (): Promise<BaseResponse<Array<Source>>> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_SOURCE_API_URL}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    }).then((d: any) => d.json())
}

const getThreads = (): Promise<BaseResponse<Array<Thread>>> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_THREAD_API_URL}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    }).then((d: any) => d.json())
}

const getThread = (guid: string): Promise<BaseResponse<ThreadDetailWrapper>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${GET_THREAD_API_URL}/${guid}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const deleteThread = (guid: string): Promise<BaseResponse<any>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${THREAD_API_URL}/${guid}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const clearThread = (): Promise<BaseResponse<any>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CLEAR_THREAD_API_URL}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

export {
    chatCustomPrompt,
    chatCustomPromptStream,
    chatDatabase,
    chatChart,
    createThread,
    getSources,
    getThreads,
    getThread,
    deleteThread,
    clearThread
}
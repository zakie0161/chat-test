import { BaseResponse } from "@/core/_models"
import { TrainingConnection } from "@/pages/settings/core/_models"
import { Source } from "./_models"

const CHAT_CUSTOM_PROMPT_API_URL = '/generate-from-custom-prompt'
const CHAT_DATABASE_API_URL = '/generate-query'
const CHAT_CHART_API_URL = '/generate-from-chart'

const LIST_SOURCE_API_URL = '/get-list-source'

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

const getSources = (): Promise<BaseResponse<Array<Source>>> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_SOURCE_API_URL}`, {
        method: "GET",
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
    getSources,
}
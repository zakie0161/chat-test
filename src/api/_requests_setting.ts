import { BaseResponse } from "@/core/_models"
import { CustomPrompt, TrainingConnection } from "../pages/settings/core/_models"

const SET_AI_HOST_API_URL = '/set-ai-host'
const CUSTOM_PROMPT_API_URL = '/custom-prompt'
const SQL_CONNECTION_API_URL = '/sql-connection'
const TRAINING_CONNECTION_API_URL = '/training-connection'
const GET_AI_HOST_API_URL = '/get-ai-host'
const NL_TO_SQL_API_URL = '/nl-to-sql'

const LIST_CUSTOM_PROMPT_API_URL = '/get-list-custom-prompt'
const LIST_SQL_CONNECTION_API_URL = '/get-list-sql-connection'
const LIST_TRAINING_CONNECTION_API_URL = '/get-list-training-connection'

const setHostAI = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${SET_AI_HOST_API_URL}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const createCustomPrompt = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CUSTOM_PROMPT_API_URL}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const createSQLConnection = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${SQL_CONNECTION_API_URL}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const createTrainingConnection = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${TRAINING_CONNECTION_API_URL}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const getHostAI = (): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${GET_AI_HOST_API_URL}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const getCustomPrompts = (): Promise<BaseResponse<Array<CustomPrompt>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_CUSTOM_PROMPT_API_URL}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const getSQLConnections = (): Promise<BaseResponse<Array<CustomPrompt>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_SQL_CONNECTION_API_URL}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const getTrainingConnections = (guid: string): Promise<BaseResponse<Array<TrainingConnection>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${LIST_TRAINING_CONNECTION_API_URL}/${guid}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const nlToSqlStream = async (body: Record<string, any>): Promise<ReadableStream | void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${NL_TO_SQL_API_URL}-stream`,
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

const updateCustomPrompt = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CUSTOM_PROMPT_API_URL}`, {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const updateSQLConnection = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${SQL_CONNECTION_API_URL}`, {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const updateTrainingConnection = (body: any): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${TRAINING_CONNECTION_API_URL}`, {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((d: any) => d)
}

const deleteCustomPrompt = (guid: string): Promise<BaseResponse<Array<CustomPrompt>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${CUSTOM_PROMPT_API_URL}/${guid}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const deleteSQLConnection = (guid: string): Promise<BaseResponse<Array<CustomPrompt>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${SQL_CONNECTION_API_URL}/${guid}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}

const deleteTrainingConnection = (guid: string): Promise<BaseResponse<Array<TrainingConnection>>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${TRAINING_CONNECTION_API_URL}/${guid}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d: any) => d.json())
}


export { 
  setHostAI, 
  getHostAI, 
  createCustomPrompt,
  createSQLConnection, 
  createTrainingConnection, 
  getCustomPrompts, 
  getSQLConnections,
  getTrainingConnections,
  nlToSqlStream,
  updateCustomPrompt,
  updateSQLConnection, 
  updateTrainingConnection, 
  deleteCustomPrompt,
  deleteSQLConnection,
  deleteTrainingConnection 
}
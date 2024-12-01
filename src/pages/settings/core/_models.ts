import { BaseResponse } from "@/core/_models";

export interface CustomPrompt {
    created_at?: Date;
    custom_prompt?: string;
    guid?: string;
    name?: string;
}

export interface SQLConnection {
    created_at?: Date;
    database_logo?: string;
    database_name?: string;
    database_type?: string;
    guid?: string;
    host?: string;
    name?: string;
    password?: string;
    port?: string;
    user?: string;
}

export interface TrainingConnection {
    guid?: string;
    database_guid?: string;
    input?: string;
    query?: string;
    description?: string;
}

export type CustomPromptResponse = BaseResponse<Array<CustomPrompt>>
export type SQLConnectionResponse = BaseResponse<Array<SQLConnection>>
export type TrainingConnectionResponse = BaseResponse<Array<TrainingConnection>>
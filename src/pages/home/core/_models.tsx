import { BaseResponse } from "@/core/_models";

export interface Source {
    guid?: string;
    name?: string;
    type?: string;
}

export interface Thread {
    created_at?:  Date;
    guid?:        string;
    name?:        string;
    source_guid?: null;
    type?:        null;
}

export interface ThreadDetailWrapper {
    detail?:  ThreadDetail;
    history?: ThreadHistory[];
}

export interface ThreadDetail {
    created_at?: Date;
    guid?:       string;
    source?:     null;
    type?:       null;
}

export interface ThreadHistory {
    content?: string;
    role?:    string;
}


export type SourceResponse = BaseResponse<Array<Source>>
export type ThreadResponse = BaseResponse<Array<Thread>>
export type ThreadDetailResponse = BaseResponse<ThreadDetailWrapper>
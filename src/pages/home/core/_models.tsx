import { BaseResponse } from "@/core/_models";

export interface Source {
    guid?: string;
    name?: string;
    type?: string;
}

export type SourceResponse = BaseResponse<Array<Source>>
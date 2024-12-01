export interface BaseResponse<T> {
    result?: T
  }
  
  export interface Response<T> {
    code?: string
    status?: string
    data?: T
    current_page?: number
    limit?: number
    total_page?: number
    total_data?: number
    message_en?: string
    message_id?: string
  }
  
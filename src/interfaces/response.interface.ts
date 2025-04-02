type StatusType = boolean | "T" | "F"

interface BaseResponse<T> {
  status: StatusType
  message: string
  data: T | []
}

export { BaseResponse, StatusType }

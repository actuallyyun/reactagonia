import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FileResponse } from '../misc/type'

const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1'
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileResponse, File>({
      query: (imgFile) => {
        const bodyFormData = new FormData()
        bodyFormData.append('file', imgFile)
        return {
          url: '/files/upload/',
          method: 'POST',
          body: bodyFormData,
          formData: true
        }
      }
    })
  })
})

export const { useUploadFileMutation } = fileApi
export default fileApi

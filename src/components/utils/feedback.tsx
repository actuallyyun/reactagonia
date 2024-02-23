import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { Spinner } from 'flowbite-react'
import { Toast } from 'flowbite-react'
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi'

export const handleFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    return <p>An error has occurred:{errMsg}</p>
  } else {
    return <p>An error has occurred:{error.message}</p>
  }
}

export const ShowLoading = () => <Spinner />

type FeedbackType = {
  state: 'success' | 'failure'
  message: string
}
export const ShowFeedback = ({ state, message }: FeedbackType) => {
  return (
    <Toast>
      <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
        {state === 'success' && <HiCheck className='h-5 w-5' />}
        {state === 'failure' && <HiX className='h-5 w-5' />}
      </div>
      <div className='ml-3 text-sm font-normal'>{message}</div>
      <Toast.Toggle />
    </Toast>
  )
}

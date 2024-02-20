import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserAuthToken, User } from '../../misc/type'
import { AppState } from '../../app/store'
import { authApi } from '../../services/auth'

const userInStorage = localStorage.getItem('userAuth')
const userAuthToken = userInStorage ? JSON.parse(userInStorage) : null

type InitialState = {
  user: User | null
  token: UserAuthToken | null
}

const initialState: InitialState = {
  user: null,
  token: userAuthToken
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: UserAuthToken }>
    ) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: (state, action: PayloadAction) => {
      state.user = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload
        }
      )
      .addMatcher(
        authApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload
        }
      )
  }
})

const userReducer = userSlice.reducer
export const { setCredentials, logOut } = userSlice.actions
export default userReducer

export const selectCurrentUser = (state: AppState) => state.user.user
export const selectCurrentToken = (state: AppState) => state.user.token

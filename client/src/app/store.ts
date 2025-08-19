import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import connectionsReducer from '../features/connections/connectionSlice'
import messagesReducer from '../features/messages/messagesSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        connections: connectionsReducer,
        messages: messagesReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
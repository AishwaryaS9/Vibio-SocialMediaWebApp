import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { Message } from "../../utils/helpers";

interface MessagesState {
    messages: Message[];
}

interface FetchMessagesArgs {
    token: string;
    userId: string;
}

const initialState: MessagesState = {
    messages: []
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages',
    async ({ token, userId }: FetchMessagesArgs) => {
        const { data } = await api.post('/api/message/get', { to_user_id: userId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.success ? data : null;
    }
)

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        resetMessages: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            if (action.payload) {
                state.messages = action.payload.messages
            }
        })
    }
});

export const { setMessages, addMessage, resetMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import toast from "react-hot-toast";
import type { FullUser } from "../../utils/helpers";

interface UserValues {
    userData: FormData,
    token: string | null
}

interface UserState {
    value: FullUser | null
}

const initialState: UserState = {
    value: null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string | null) => {
    const { data } = await api.get('/api/user/data', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data.success ? data.user : null
});

export const updateUser = createAsyncThunk('user/update', async ({ userData, token }: UserValues) => {
    const { data } = await api.post('/api/user/update', userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.success) {
        toast.success(data.message);
        return data.user
    } else {
        toast.error(data.message);
        return null;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.value = action.payload
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
});

export default userSlice.reducer;
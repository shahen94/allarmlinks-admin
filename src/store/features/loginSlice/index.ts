import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import login from '../../../api/auth/login';
import IAdminAuthorizeData from "../../../types/admins/IAdminAuthorizeData";
import ILoginResponse from "../../../types/auth/ILoginResponse";
import ILoginState from "../../../types/auth/ILoginState";

const adminLogin = createAsyncThunk(
    'admin/login',
    async (loginData: any): Promise<ILoginResponse> => {
        const response = await login(loginData);
        debugger
        return response as ILoginResponse
    }
)

const initialState: ILoginState = {
    user: {}
}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: ({ user }: ILoginState, { payload }: PayloadAction<ILoginResponse>): void => {
            user.data = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(adminLogin.fulfilled, (state, { payload }: PayloadAction<ILoginResponse>) => {
            window.localStorage.setItem("accessToken", payload.accessToken);
            state.user = payload;
        })
    }
})

const { actions, reducer } = loginSlice;
export const { setUser } = actions;
export { adminLogin };
export default reducer;
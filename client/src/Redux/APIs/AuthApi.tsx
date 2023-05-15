'use client';
import { LogOut, setCredentials } from '../Slices/UserSlice';
import { apiSlice } from '../ApiSlice';
import getSocket from '../SocketRTK';
import { RootState } from '../Store';
import { AuthState, userType } from '@lib/types/user';
interface SignInData {
    email: string;
    password: string;
}
interface SignUpData {
    email: string;
    password: string;
    firstname: string,
    lastname: string;
    passwordConfirm: string;
}

export const AuthApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        SigninUser: builder.mutation<AuthState, SignInData>({
            query: ({ email, password }) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body: { email, password },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        setCredentials({
                            token: data.token as string,
                            user: data.user as userType,
                        })
                    );
                    let userId = (getState() as RootState).auth?.user?._id;
                    const socket = getSocket()
                    socket.on("connect", () => {
                        socket.emit("join", userId);
                    });
                } catch (err) {
                    // do nothing
                }
            },
        }),
        signup: builder.mutation<{ status: string; token: string; user: userType }, SignUpData>({
            query: (data) => ({
                url: '/api/auth/signup',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const { token, user } = data
                    localStorage.setItem('persist', 'true')
                    dispatch(
                        setCredentials({ token, user })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
        logOut: builder.mutation<{}, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(LogOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                        localStorage.removeItem('persist')
                        localStorage.removeItem('id')
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
        }),
        refresh: builder.mutation<{ token: string; user: userType }, void>({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { token, user } = data
                    dispatch(setCredentials({ token, user }))
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatesTags: ['Auth'],
        }),
        VerifyEmail: builder.mutation<{ msg: string }, { code: number | undefined, email: string }>({
            query: ({ email, code }) => ({
                url: `/api/auth/activateEmail?email=${email}&code=${code}`,
                method: 'PUT',
            }),

        }),
        ActivateLoggedEmail: builder.mutation({
            query: (data) => ({
                url: `/api/auth/request2otpactivate`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        VerifyEmailtoResest: builder.mutation({
            query: ({ email, code }) => ({
                url: `/api/auth/verifyOtp?email=${email}&code=${code}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('persist', 'true')
                    localStorage.setItem('id', data.user._id)
                    dispatch(
                        setCredentials({
                            token: data.token as string,
                            user: data.user as userType,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
            invalidatesTags: ['Auth'],
        }),
        ChangePassword: builder.mutation({
            query: (data) => ({
                url: `/api/auth/changepassword`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        RequestOTP2: builder.mutation({
            query: (data) => ({
                url: '/api/auth/request2otpactivate',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),
        ForgetPassword: builder.mutation({
            query: (email) => ({
                url: `api/auth/forgotPassword`,
                method: 'POST',
                body: email
            }),
            invalidatesTags: ['Auth'],
        }),
        ResetPassword: builder.mutation({
            query: ({ token, data }) => ({
                url: `/api/auth/resetPassword/${token}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('persist', 'true')
                    localStorage.setItem('id', data.data.user._id)
                    dispatch(
                        setCredentials({
                            token: data.token,
                            user: data.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
            invalidatesTags: ['Auth'],
        }),
    }),
});
export const {
    useLogOutMutation,
    useRefreshMutation,
    useSigninUserMutation,
    useSignupMutation,
    useVerifyEmailMutation,
    useRequestOTP2Mutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useVerifyEmailtoResestMutation,
    useActivateLoggedEmailMutation,
} = AuthApi;
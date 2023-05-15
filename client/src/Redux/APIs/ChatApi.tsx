'use client';
import { ChatType } from '@lib/types/chat';
import { RootState } from '@Redux/Store';
import { apiSlice } from '../ApiSlice';
import getSocket from '../SocketRTK';

interface ChatResponse {
    status: string;
    results: number;
    chats: ChatType[];
}

export const ChatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewChat: builder.mutation<{ status: string; chatId: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/v1/chat/${id}`,
                method: 'Post',
            }),
            invalidatesTags: ['Chat', 'User'],
        }),
        GetUserChats: builder.query<ChatResponse, { page: 1 }>({
            query: ({ page }) => ({
                url: `/api/v1/chat/all?page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Message'],
            async onCacheEntryAdded(
                args,
                { cacheEntryRemoved, updateCachedData, cacheDataLoaded, getState }
            ) {
                const chats = await cacheDataLoaded;
                let userId = (getState() as RootState).auth.user?._id;
                const socket = getSocket()
                socket.on("connect", () => {
                    socket.emit("join", userId);
                });

                await cacheEntryRemoved;
                socket.close();
            },
        }),

        getMoreChats: builder.query<{ status: string; results: number; chats: ChatType[] }, { page: 1 }>({
            query: ({ page }) => ({
                url: `/api/v1/chat/all?page=${page}`,
                method: 'GET',
            }),

                async onQueryStarted({ page }, { queryFulfilled, dispatch }) {
                    try {

                        const { data } = await queryFulfilled;

                        dispatch(
                            ChatApi.util.updateQueryData("GetUserChats", { page: 1 }, (draft) => {
                                return {
                                    chats: [
                                        ...draft.chats,
                                        ...data.chats,
                                    ],
                                    results: data.results,
                                    status: data.status,
                                };
                            })
                        );
                    } catch (err) {
                        console.log(err)
                    }
                },
            }),
        }),
    });

    export const {
        useNewChatMutation,
        useGetUserChatsQuery,
    } = ChatApi;

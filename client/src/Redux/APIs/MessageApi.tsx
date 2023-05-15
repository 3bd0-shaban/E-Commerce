'use client';
import { MessageType } from '@lib/types/message';
import { RootState } from '@Redux/Store';
import { apiSlice } from '../ApiSlice';
import { setSingleMSGNotify } from '../Slices/MessageSlice';
import getSocket from '../SocketRTK';
import { ChatApi } from './ChatApi';

interface MessageResponse {
    status: string;
    results: number;
    messages: MessageType[];
}
export const MessageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        NewMessage: builder.mutation<{ status: string; message: MessageType }, { data: { msg: string }; chatId: string }>({
            query: ({ data, chatId }) => ({
                url: `/api/v1/message/${chatId}`,
                method: 'Post',
                body: data,
            }),

            async onQueryStarted({ chatId, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const socket = getSocket()
                    socket.emit("Message", {
                        sender: data.message.sender,
                        msg: data.message.msg,
                        createdAt: data.message.createdAt,
                        image: data.message.image,
                        // receiver: userById?._id
                    });
                    dispatch(
                        MessageApi.util.updateQueryData("GetMessages", { chatId, page: 1 }, (draft) => {
                            return {
                                messages: [
                                    data.message,
                                    ...draft.messages,
                                ],
                                results: draft.results,
                                status: data.status,
                            };
                        })
                    );
                    dispatch(
                        ChatApi.util.updateQueryData("GetUserChats", { page: 1 }, (draft) => {
                            // UPDATE LAST MASSAGE IN CHATS WNEN NEW MESSAGE SEND OR RECIEVED 
                            const userChat = draft?.chats?.find((item) => item?._id === data?.message.chatId)
                            if (userChat) {
                                // invalidatesTags:['chat']
                                userChat.lastMSG = data?.message.msg
                                //REARANGE CHATS By MOVING FOLLOWER CHAT CART AT TOP WHEN NEW MWSSGAE SEND
                                let index = draft?.chats?.indexOf(userChat); // find the index of the object in the array
                                if (index > -1) { // if the object is in the array
                                    draft?.chats.splice(index, 1); // remove it from the current position
                                    draft?.chats.unshift(userChat); // add it to the beginning of the array
                                }
                            }

                        })
                    );

                } catch (err) {
                    console.log(err)

                }
            },


        }),
        GetMessages: builder.query<MessageResponse, { chatId: string; page: number }>({
            query: ({ chatId, page }) => ({
                url: `/api/v1/message/${chatId}?page=${page}`,
                method: 'Get',
            }),
            // transformResponse(apiResponse, meta) {
            //     return {
            //         MSGs: apiResponse,
            //         totalCount: Number(apiResponse.length),
            //         typing: false
            //     };
            // },
            providesTags: ['Message'],
            async onCacheEntryAdded(
                args,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState }
            ) {

                let userId = (getState() as RootState).auth?.user?._id;
                // await cacheDataLoaded;
                const socket = getSocket()
                socket.on("connect", () => {
                    socket.emit("join", userId);

                });
                // socket.on("getusers", (data) => {
                //     console.log(`goined ${data.length}`)
                // });
                try {
                    socket.on("MessagetoClient", ({ image, sender, receiver, createdAt, chatId, msg }) => {
                        dispatch(
                            MessageApi.util.updateQueryData("GetMessages", { page: 1, chatId }, (draft) => {
                                return {
                                    messages: [
                                        { image, sender, receiver, chatId, createdAt, msg },
                                        ...draft.messages,
                                    ],
                                    results: draft.results,
                                    status: draft.status,
                                };
                            })
                        );
                        dispatch(setSingleMSGNotify({ image, sender, receiver, chatId, createdAt, msg }))

                        dispatch(
                            ChatApi.util.updateQueryData("GetUserChats", { page: 1 }, (draft) => {
                                // UPDATE LAST MASSAGE IN CHATS WNEN NEW MESSAGE SEND OR RECIEVED 
                                const userChat = draft?.chats?.find((item) => item?._id === chatId)
                                if (userChat) {
                                    userChat.lastMSG = msg
                                    //REARANGE CHATS By MOVING FOLLOWER CHAT CART AT TOP WHEN NEW MWSSGAE RECIEBED
                                    let index = draft?.chats?.indexOf(userChat); // find the index of the object in the array
                                    if (index > -1) { // if the object is in the array
                                        draft?.chats.splice(index, 1); // remove it from the current position
                                        draft?.chats.unshift(userChat); // add it to the beginning of the array
                                    }
                                }

                            })
                        );
                        // updateCachedData((draft) => {
                        //     return {
                        //         MSGs: [
                        //             { image, sender, receiver, createdAt, msg },
                        //             ...draft.MSGs,
                        //         ],
                        //         totalCount: Number(draft.totalCount),
                        // typing: false,
                        //     };
                        // });

                    });
                    socket.on("TypingtoClient", ({ receiver, chatId, status }) => {
                        const id = chatId
                        dispatch(
                            MessageApi.util.updateQueryData("GetMessages", { page: 1, chatId }, (draft) => {
                                return {
                                    messages: [
                                        ...draft.messages,
                                    ],
                                    results: draft.results,
                                    status: draft.status,
                                };
                            })
                        );
                    })

                } catch (err) { }

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        GetMoreMessages: builder.query<MessageResponse, { chatId: string; page: number }>({
            query: ({ chatId, page }) => ({
                url: `/api/v1/message/${chatId}?page=${page}`,
                method: 'Get',
            }),
            async onQueryStarted({ chatId }, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;

                    dispatch(
                        MessageApi.util.updateQueryData("GetMessages", { page: 1, chatId }, (draft) => {
                            return {
                                messages: [
                                    ...draft.messages,
                                    ...data.messages,
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
        DeleteAllMSGs: builder.mutation({
            query: (chatId) => ({
                url: `/api/message/deleteall/${chatId}`,
                method: 'Delete',
            }),
            invalidatesTags: ['Message']
        })
    }),
});

export const {
    useNewMessageMutation,
    useGetMessagesQuery,
    useDeleteAllMSGsMutation,
} = MessageApi;

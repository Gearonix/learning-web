import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const API = createApi({
    reducerPath: 'mainAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:6868'}),
    endpoints : (build) =>  {
        return {
            FetchProducts : build.query({
                query(limit = 5){
                    return {
                        url: '/posts',
                    }

                },
                providesTags: () => ['qwe']
            }),
            createPost : build.mutation({
                query(body){
                    return {
                        url : '/posts',
                        method: 'POST',
                        body
                    }
                },
                invalidatesTags: ['qwe']
            })
        }
    }
})

export default API

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const questionnaireApi = createApi({
//   reducerPath: "questionnaireApi",
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
//   endpoints: (builder) => ({

//     saveAnswers : builder.query({
//         query : ({id , ...labels}) => ({
//             url : `/user/assign-labels?id=${id}`,
//             method : 'PATCH',
//             body : labels
//         })
//     })

//   }),
// });

// export const {
//   useSaveAnswersQuery
// } = questionnaireApi;

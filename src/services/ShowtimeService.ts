import ApiUtil from "@utils/AxiosInstance";

export const AuthServiceEndpoint ={
    getAllShowtime: 'showtime',
    addShowtime: 'showtime',
    deleteShowtime: (ShowtimeId: string) => `showtime/${ShowtimeId}`,
    updateShowtime: (ShowtimeId: string) => `showtime/${ShowtimeId}`
}

export const ShowtimeService = {
    getAllShowtime: async () =>{ 
       return ApiUtil.get<IShowtimeResponse>(AuthServiceEndpoint.getAllShowtime)
    },
    addShowtime: async (body: IShowtimeRequest) =>{
        return ApiUtil.post<IShowtimeRequest>(AuthServiceEndpoint.addShowtime, body)
    },
    deleteShowtime: async (ShowtimeId: string) =>{
        return ApiUtil.delete<null>(AuthServiceEndpoint.deleteShowtime(ShowtimeId))
    },
    updateShowtime: async (ShowtimeId: string, body: IShowtimeRequest) => {
        return ApiUtil.put<null>(AuthServiceEndpoint.updateShowtime(ShowtimeId), body)
    }
}  as const
import ApiUtil from "@utils/AxiosInstance";

export const ShowTimeServiceEndPoint ={
    getAllShowtime: 'showtime',
    addShowtime: 'showtime',
    deleteShowtime: (ShowtimeId: string) => `showtime/${ShowtimeId}`,
    updateShowtime: (ShowtimeId: string) => `showtime/${ShowtimeId}`
}

export const ShowtimeService = {
    getAllShowtime: async () =>{ 
       return ApiUtil.get<IShowtimeResponse>(ShowTimeServiceEndPoint.getAllShowtime)
    },
    addShowtime: async (body: IShowtimeRequest) =>{
        return ApiUtil.post<IShowtimeRequest>(ShowTimeServiceEndPoint.addShowtime, body)
    },
    deleteShowtime: async (ShowtimeId: string) =>{
        return ApiUtil.delete<null>(ShowTimeServiceEndPoint.deleteShowtime(ShowtimeId))
    },
    updateShowtime: async (ShowtimeId: string, body: IShowtimeRequest) => {
        return ApiUtil.put<null>(ShowTimeServiceEndPoint.updateShowtime(ShowtimeId), body)
    }
}  as const
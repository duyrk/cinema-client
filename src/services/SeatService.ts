import ApiUtil from "@utils/AxiosInstance";

export const AuthServiceEndpoint ={
    getAllSeat: 'seat',
    addSeat: 'seat',
    deleteSeat: (SeatId: string) => `seat/${SeatId}`,
    updateSeat: (SeatId: string) => `seat/${SeatId}`
}

export const SeatService = {
    getAllSeat: async () =>{ 
       return ApiUtil.get<ISeatResponse>(AuthServiceEndpoint.getAllSeat)
    },
    addSeat: async (body: ISeatRequest) =>{
        return ApiUtil.post<ISeatRequest>(AuthServiceEndpoint.addSeat, body)
    },
    deleteSeat: async (SeatId: string) =>{
        return ApiUtil.delete<null>(AuthServiceEndpoint.deleteSeat(SeatId))
    },
    updateSeat: async (SeatId: string, body: ISeatRequest) => {
        return ApiUtil.put<null>(AuthServiceEndpoint.updateSeat(SeatId), body)
    }
}  as const
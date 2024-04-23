import ApiUtil from "@utils/AxiosInstance";

export const AuthServiceEndpoint ={
    getAllRoom: 'room',
    addRoom: 'room',
    deleteRoom: (RoomId: string) => `room/${RoomId}`,
    updateRoom: (RoomId: string) => `room/${RoomId}`
}

export const RoomService = {
    getAllRoom: async () =>{ 
       return ApiUtil.get<IRoomResponse>(AuthServiceEndpoint.getAllRoom)
    },
    addRoom: async (body: IRoomRequest) =>{
        return ApiUtil.post<IRoomRequest>(AuthServiceEndpoint.addRoom, body)
    },
    deleteRoom: async (RoomId: string) =>{
        return ApiUtil.delete<null>(AuthServiceEndpoint.deleteRoom(RoomId))
    },
    updateRoom: async (RoomId: string, body: IRoomRequest) => {
        return ApiUtil.put<null>(AuthServiceEndpoint.updateRoom(RoomId), body)
    }
}  as const
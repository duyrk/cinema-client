import ApiUtil from "@utils/AxiosInstance";

export const RoomServiceEndPoint ={
    getAllRoom: 'room',
    addRoom: 'room',
    deleteRoom: (RoomId: string) => `room/${RoomId}`,
    updateRoom: (RoomId: string) => `room/${RoomId}`
}

export const RoomService = {
    getAllRoom: async () =>{ 
       return ApiUtil.get<IRoomResponse>(RoomServiceEndPoint.getAllRoom)
    },
    addRoom: async (body: IRoomRequest) =>{
        return ApiUtil.post<IRoomRequest>(RoomServiceEndPoint.addRoom, body)
    },
    deleteRoom: async (RoomId: string) =>{
        return ApiUtil.delete<null>(RoomServiceEndPoint.deleteRoom(RoomId))
    },
    updateRoom: async (RoomId: string, body: IRoomRequest) => {
        return ApiUtil.put<null>(RoomServiceEndPoint.updateRoom(RoomId), body)
    }
}  as const
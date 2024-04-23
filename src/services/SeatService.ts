import ApiUtil from '@utils/AxiosInstance';

export const SeatServiceEndpoint = {
  getAllSeat: 'seat',
  addSeat: 'seat',
  deleteSeat: (SeatId: string) => `seat/${SeatId}`,
  updateSeat: (SeatId: string) => `seat/${SeatId}`,
  getSeatByShowTimeId: (showTimeId: string) => `seat/showtime/allseat/${showTimeId}`,
  getUntakenSeatByShowTimeId: (showTimeId: string) => `seat/showtime/untakenseat/${showTimeId}`,
};

export const SeatService = {
  getAllSeat: async () => {
    return ApiUtil.get<ISeatResponse>(SeatServiceEndpoint.getAllSeat);
  },
  addSeat: async (body: ISeatRequest) => {
    return ApiUtil.post<ISeatRequest>(SeatServiceEndpoint.addSeat, body);
  },
  deleteSeat: async (SeatId: string) => {
    return ApiUtil.delete<null>(SeatServiceEndpoint.deleteSeat(SeatId));
  },
  updateSeat: async (SeatId: string, body: ISeatRequest) => {
    return ApiUtil.put<null>(SeatServiceEndpoint.updateSeat(SeatId), body);
  },
  getSeatByShowTimeId: async (showTimeId: string) => {
    return ApiUtil.get<ISeatByShowTimeResponse>(SeatServiceEndpoint.getSeatByShowTimeId(showTimeId));
  },
  getUntakenSeatByShowTimeId: async (showTimeId: string) => {
    return ApiUtil.get<ISeatByShowTimeResponse>(SeatServiceEndpoint.getUntakenSeatByShowTimeId(showTimeId));
  },
} as const;

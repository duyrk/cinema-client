import ApiUtil from "@utils/AxiosInstance";

export const PaymentServiceEndPoint ={
    addNewTicket: 'ticket'
}

export const PaymentService = {
  addNewTicket: (body: IAddNewTicketRequest) =>{
    return ApiUtil.post<IAddNewTicketResponse>(PaymentServiceEndPoint.addNewTicket, body)
  }
}  as const
import { TicketRegisterRequest, TicketUpdateRequest } from "../lib/dataTypes/requests"


export interface ITicketService {
    getAllTickets(): Promise<any[]>; 
    createTicket(ticketData: TicketRegisterRequest): Promise<any>; 
    updateTicket(id: string, updateData: TicketUpdateRequest): Promise<any>; 
}

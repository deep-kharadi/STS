import { TicketRegisterRequest, TicketUpdateRequest } from "../Lib/DataTypes/Requests";


export interface ITicketService {
    getAllTickets(): Promise<any[]>; // Change to specific return type later
    createTicket(ticketData: TicketRegisterRequest): Promise<any>; // Change to specific return type
    updateTicket(id: string, updateData: TicketUpdateRequest): Promise<any>; // Change to specific return type
}

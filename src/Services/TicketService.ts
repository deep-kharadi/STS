import TicketModel from "../Model/Ticket";
import { ITicketService } from "../Interfaces/TicketServiceInterface";
import { TicketRegisterRequest, TicketUpdateRequest } from "../Lib/DataTypes/Requests";

class TicketService implements ITicketService {
    async getAllTickets() {
        return await TicketModel.find().sort({ deadline: -1 });
    }

    async createTicket(ticketData: TicketRegisterRequest) {
        const newTicket = new TicketModel(ticketData);
        return await newTicket.save();
    }

    async updateTicket(id: string, updateData: TicketUpdateRequest) {
        return await TicketModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }
}

export default new TicketService();

import TicketModel from "../model/Ticket"
import { ITicketService } from "../interfaces/TicketServiceInterface"
import { TicketRegisterRequest, TicketUpdateRequest } from "../lib/dataTypes/requests"

class TicketService implements ITicketService {
	async getAllTickets() {
		return await TicketModel.find().sort({ deadline: -1 })
	}
	async getTicketById(id: string) {
        return await TicketModel.findById(id);
    }
	async createTicket(ticketData: TicketRegisterRequest) {
		const newTicket = new TicketModel(ticketData)
		return await newTicket.save()
	}

	async updateTicket(id: string, updateData: TicketUpdateRequest) {
		return await TicketModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
	}
}

export default new TicketService()

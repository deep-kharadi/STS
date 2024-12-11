import { Request, Response } from "express"
import TicketService from "../services/TicketService"
import * as XLSX from "xlsx"
import { TicketRegisterRequest, TicketUpdateRequest } from "../lib/dataTypes/requests"
import { TicketListType } from "../lib/dataTypes/responses"

// Utility function for handling errors
const handleErrorResponse = (res: Response, status: number, message: string) => {
	return res.status(status).json({
		success: false,
		data: null,
		message,
	})
}

// Controller for handling ticket-related requests
const TicketController = {
	getTicketList: async (req: Request, res: Response): Promise<any> => {
		
		try {
			const ticketId = req.query.id as string | undefined; // Get ID from query parameters
	
			let tickets: TicketListType[] | TicketListType | null; // Initialize variable to hold ticket(s)
	
			if (ticketId) {
				// If an ID is provided, fetch the specific ticket
				const ticket = await TicketService.getTicketById(ticketId); // Update your TicketService to include this method
				if (!ticket) {
					return res.status(404).json({
						success: false,
						message: "Ticket not found",
					});
				}
				tickets = ticket; // Set tickets to the found ticket
			} else {
				// If no ID is provided, fetch all tickets
				tickets = await TicketService.getAllTickets();
			}
	
			return res.status(200).json({
				success: true,
				data: tickets,
				message: "Successfully retrieved tickets",
			});
		} catch (error) {
			console.error("Error retrieving tickets:", error);
			return handleErrorResponse(res, 500, "Error retrieving tickets");
		}
	},

	createTicket: async (req: Request<any, any, TicketRegisterRequest>, res: Response) : Promise<any> => {
		const {issue, client, deadline } = req.body

		try {
			const savedTicket = await TicketService.createTicket({
				issue, client, deadline,
				status: "open"
			})
			return res.status(201).json({
				success: true,
				data: savedTicket,
				message: "Ticket created successfully",
			})
		} catch (error) {
			console.error("Error creating ticket:", error)
			return handleErrorResponse(res, 500, "Failed to create ticket")
		}
	},

	updateTicket: async (req: Request<{ id: string }, any, TicketUpdateRequest>, res: Response) :Promise<any> => {
		const { id } = req.params
		const updateData = req.body

		try {
			const updatedTicket = await TicketService.updateTicket(id, updateData)

			if (!updatedTicket) {
				return handleErrorResponse(res, 404, "Ticket not found")
			}

			return res.status(200).json({
				success: true,
				data: updatedTicket,
				message: "Ticket updated successfully",
			})
		} catch (error) {
			console.error("Error updating ticket:", error)
			return handleErrorResponse(res, 500, "Failed to update ticket")
		}
	},

	// Report generation
	generateReport: async (req: Request, res: Response) :Promise<any>=> {
		try {
			const tickets = await TicketService.getAllTickets()
			const reportData = tickets.map(ticket => {
				return {
					client: ticket.client,
					issue: ticket.issue,
					status: ticket.status, // Here we keep the actual status (open/closed)
				}
			})
			const workbook = XLSX.utils.book_new()
			const worksheet = XLSX.utils.json_to_sheet(reportData)
			XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets Report")
			const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })

			res.setHeader("Content-Disposition", "attachment; filename=tickets_report.xlsx")
			res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
			res.send(buffer)
		} catch (error) {
			console.error("Error generating report:", error)
			return handleErrorResponse(res, 500, "Failed to generate report")
		}
	}
}

export default TicketController

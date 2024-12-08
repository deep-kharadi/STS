import { Request, Response } from "express";
import TicketService from "../Services/TicketService";
import * as XLSX from "xlsx";
import { TicketRegisterRequest, TicketUpdateRequest } from "../Lib/DataTypes/Requests";
import { TicketListResponse, TicketListType, TicketResponse } from "../Lib/DataTypes/Responses";

// Utility function for handling errors
const handleErrorResponse = (res: Response, status: number, message: string) => {
    return res.status(status).json({
        success: false,
        data: null,
        message,
    });
};

// Controller for handling ticket-related requests
const TicketController = {
    getTicketList: async (req: Request, res: Response): Promise<any> => {
        try {
            const tickets:TicketListType[] = await TicketService.getAllTickets();
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

    createTicket: async (req: Request<{}, {}, TicketRegisterRequest>, res: Response) : Promise<any> => {
        const { status, issue, client, deadline } = req.body;

        try {
            const savedTicket = await TicketService.createTicket({ status, issue, client, deadline });
            return res.status(201).json({
                success: true,
                data: savedTicket,
                message: "Ticket created successfully",
            });
        } catch (error) {
            console.error("Error creating ticket:", error);
            return handleErrorResponse(res, 500, "Failed to create ticket");
        }
    },

    updateTicket: async (req: Request<{ id: string }, {}, TicketUpdateRequest>, res: Response) :Promise<any> => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const updatedTicket = await TicketService.updateTicket(id, updateData);

            if (!updatedTicket) {
                return handleErrorResponse(res, 404, "Ticket not found");
            }

            return res.status(200).json({
                success: true,
                data: updatedTicket,
                message: "Ticket updated successfully",
            });
        } catch (error) {
            console.error("Error updating ticket:", error);
            return handleErrorResponse(res, 500, "Failed to update ticket");
        }
    },

    // Report generation
    generateReport: async (req: Request, res: Response) :Promise<any>=> {
        try {
            const tickets = await TicketService.getAllTickets();
            const reportData = tickets.map(ticket => {
                return {
                    client: ticket.client,
                    issue: ticket.issue,
                    status: ticket.status, // Here we keep the actual status (open/closed)
                };
            });
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(reportData);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets Report");
            const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

            res.setHeader("Content-Disposition", "attachment; filename=tickets_report.xlsx");
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.send(buffer);
        } catch (error) {
            console.error("Error generating report:", error);
            return handleErrorResponse(res, 500, "Failed to generate report");
        }
    }
};

export default TicketController;

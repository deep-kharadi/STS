import { Request, Response } from "express"
import TicketModel from "../../Model/Ticket"
// import { Res } from "../../Lib/DataTypes/Common"
// import { TicketListType } from "../../Lib/DataTypes/Responses"
// import { TicketRegisterRequest } from "../../Lib/DataTypes/Requests"

// import { dbError } from "../../Lib/Utils/ErrorHandler"
// import mongoose from "mongoose"
// import { ResponseCode } from "../../Lib/Utils/ResponseCode"

// interface ResponseTicketList {
//     success: boolean;
//     data: TicketListType[];
//     message: string;
// }

const handleErrorResponse = (res: Response, status: number, message: string) => {
    return res.status(status).json({
        success: false,
        data: null,
        message,
    });
};

const getTicketList =async (req: Request, res: Response) :Promise<any>=> { //TODO : Response<ResponseTicketList>

	try {
		const tickets = await TicketModel.find().sort({ deadline: -1 }) 
		res.status(200).json({
			success: true,
			data: tickets,
			message: "Successfully retrieved tickets",
		})
	} catch (error) {
		return handleErrorResponse(res, 500, "Error retrieving tickets");

	}
}


// Controller function to create a new ticket
// const createTicket = async (  req: Request<{}, {}, TicketRegisterRequest>, res: Response) => {
const createTicket = async (  req: Request, res: Response):Promise<any> => {

	try {
		const { status, issue, client, deadline } = req.body

		// Validate the required fields
		if (!status || !issue || !client || !deadline) {
			return handleErrorResponse(res, 400, "All fields (status, issue, client, deadline) are required");

		}

		// Create a new ticket
		const newTicket = new TicketModel({
			status,
			issue,
			client,
			deadline,
		})

		// Save the ticket to the database
		const savedTicket = await newTicket.save()

		res.status(201).json({
			success: true,
			data: savedTicket,
			message: "Ticket created successfully",
		})
	} catch (error) {
		return handleErrorResponse(res, 500, "Failed to create ticket");

	}
}
// Update an existing ticket
const updateTicket = async (req: Request<{ id: string }, {}, any>, res: Response<any>):Promise<any> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedTicket = await TicketModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

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
};

const TicketController = {
	getTicketList,
	createTicket,
	updateTicket
}


export default TicketController
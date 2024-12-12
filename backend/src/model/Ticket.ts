import mongoose, { Document, Schema } from "mongoose"
import type { CommonModelType, TicketModelType } from "../lib/dataTypes/models/Ticket"


const TicketSchema = new Schema<TicketModelType<CommonModelType & Document>>({
	status: {
		type: String,
		enum: ["open", "closed"], // Enforce allowed values
		required: true,
		default: "open"
	},
	issue: {
		type: String,
		required: true
	},
	client: {
		type: String,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	}
},{
	timestamps: true, // Automatically add createdAt and updatedAt fields
})


const TicketModel = mongoose.model<TicketModelType<CommonModelType & Document>>("Ticket", TicketSchema)
export default TicketModel
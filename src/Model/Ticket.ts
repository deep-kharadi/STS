import mongoose, { Document, Schema } from "mongoose"
import type { CommonModelType, TicketModelType } from "../Lib/DataTypes/Models/Ticket"


const TicketSchema = new Schema<TicketModelType<CommonModelType & Document>>({
	status: {
		type: String,
		required: true,
		unique: true
	},
	issue: {
		type: Date,
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
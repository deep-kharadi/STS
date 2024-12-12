import mongoose from "mongoose"

export const connectDB = async (): Promise<any> => {
	const mongoURI = process.env.MONGODB_URI || "mongodb+srv://deepkharadi9:3ANArrcd9QzvBXl3@cluster0.swl8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

	await mongoose.connect(mongoURI)
		.then(() => {
			console.log("MongoDB connected")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
		})
}

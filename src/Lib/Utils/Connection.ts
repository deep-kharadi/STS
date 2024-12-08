import mongoose from "mongoose"

export const connectDB = (): void => {
	const mongoURI: string = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/sts"

	mongoose.connect(mongoURI)
		.then(() => {
			console.log("MongoDB connected")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
		})
}
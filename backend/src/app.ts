import express, { Application } from "express"
import { configDotenv } from "dotenv"
import { connectDB } from "./lib/utils/Connection"
import Route from "./routes/Index"
import logger from "morgan"
import cors from "cors"; 

configDotenv()

export const app: Application = express()
const port = process.env.PORT ?? 3000

connectDB()

app.use(cors({
	origin: "http://localhost:3000", // Allow your React app to access the API
	methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
}));
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/v1", Route)

app.listen(port, () => {
	console.log(`Server is running on port http://127.0.0.1:${port}`)
})

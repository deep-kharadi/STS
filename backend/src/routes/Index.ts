import { Router } from "express"
import TicketRouter from "./Ticket"

const Route: Router = Router()

Route.use("/", TicketRouter)

export default Route
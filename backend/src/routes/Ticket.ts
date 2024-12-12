import { Router } from "express"
import TicketController from "../controller/TicketController"
import { validateTicketCreation, validateTicketUpdate } from "../middlewares/validationMiddleware"

const TicketRouter: Router = Router()

// Define routes with appropriate request handlers
TicketRouter.get("/tickets", TicketController.getTicketList)
TicketRouter.post("/tickets", validateTicketCreation, TicketController.createTicket)
TicketRouter.put("/tickets/:id", validateTicketUpdate, TicketController.updateTicket)
TicketRouter.get("/report", TicketController.generateReport)

export default TicketRouter

import { Router } from "express"
import TicketController from "../Controller/Ticket"

const TicketRouter: Router = Router()

TicketRouter.get("/tickets", TicketController.getTicketList)
TicketRouter.post("/tickets", TicketController.createTicket)
TicketRouter.put("/tickets/:id", TicketController.updateTicket);



export default TicketRouter
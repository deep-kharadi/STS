import { Request, Response, NextFunction } from "express"

export const validateTicketCreation = (req: Request, res: Response, next: NextFunction):any => {
	const { issue, client, deadline } = req.body

	if ( !issue || !client || !deadline) {
		return res.status(400).json({
			success: false,
			message: "All fields ( issue, client, deadline) are required",
		})
	}

	next()
}

export const validateTicketUpdate = (req: Request, res: Response, next: NextFunction) :any=> {
	const { status } = req.body

	// Optionally validate fields only if provided
	if (status && !["open", "closed"].includes(status)) {
		return res.status(400).json({
			success: false,
			message: "Status must be either 'open' or 'closed'",
		})
	}

	next()
}

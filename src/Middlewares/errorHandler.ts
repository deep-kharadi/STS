import { Request, Response, NextFunction } from "express"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.error("An error occurred:", err)
	res.status(500).json({
		success: false,
		message: "An unexpected error occurred",
	})
	next()
}

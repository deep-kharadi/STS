export type CommonModelType = {
    createdOn?: Date
    updatedOn?: Date
    isDeleted?: boolean
}

export type TicketModelType<T> = T & {
    status: "open" | "closed"
    issue: string
    client: string
    deadline: Date
}
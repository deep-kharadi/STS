export type CommonModelType = {
    createdOn?: Date
    updatedOn?: Date
    isDeleted?: boolean
}

export type TicketModelType<T> = T & {
    status: string
    issue: Date
    client: string
    deadline: Date
}
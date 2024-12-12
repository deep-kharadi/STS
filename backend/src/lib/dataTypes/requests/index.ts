export type TicketRegisterRequest = {
    status: "open" | "closed"
    issue: Date
    client: string
    deadline: Date
}
export type TicketUpdateRequest = {
    status?: "open" | "closed"; // Optional: can be updated to either 'open' or 'closed'
    issue?: string;             // Optional: can be updated with a new issue description
    client?: string;            // Optional: can be updated with a new client name
    deadline?: Date;            // Optional: can be updated with a new deadline
};
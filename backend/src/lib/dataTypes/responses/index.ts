export type TicketListType = {
    status: "open" | "closed"
    issue: string
    client: string
    deadline: Date
}

export interface TicketListResponse {
    success: boolean;                    // Indicates if the request was successful
    data: TicketListType[];              // Array of tickets
    message: string;                     // Message about the request
}

export interface TicketResponse {
    success: boolean;                   // Indicates if the request was successful
    data: TicketListType | null;                // Single ticket or null if not found
    message: string;                    // Message about the request
}
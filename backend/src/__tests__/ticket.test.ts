/* eslint-disable semi */
import request from "supertest"; // Importing supertest for HTTP assertions
import {app} from "../app";
describe("Ticket API Tests", () => {
	// eslint-disable-next-line semi
	let ticketId: any;

	// Test case for creating a ticket
	it("should create a new ticket", async () => {

		const newTicket = {
			client: "deep k",
			issue: "Sample Issue",
			status: "open",
			deadline: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
		};

		const response = await request(app)
			.post("/api/v1/tickets")
			.send(newTicket);

		expect(response.status).toBe(201); // Expect status code 201
		expect(response.body.data).toHaveProperty("id"); // Check if response has an ID
		expect(response.body.data.client).toBe(newTicket.client); // Check client name

		// Save the ID for further tests
		ticketId = response.body.data.id;
	});

	// Test case for fetching all tickets
	it("should fetch all tickets", async () => {
		const response = await request(app).get("/api/v1/tickets");
    
		expect(response.status).toBe(200); // Expect status code 200
		expect(Array.isArray(response.body.data)).toBe(true); // Ensure data is an array
	});

	// Test case for fetching a specific ticket by ID
	it("should fetch a ticket by ID", async () => {
		const response = await request(app).get(`/api/v1/tickets/${ticketId}`);
    
		expect(response.status).toBe(200); // Expect status code 200
		expect(response.body.data).toHaveProperty("id", ticketId); // Check if the ticket ID matches
	});

	// Test case for updating a ticket
	it("should update a ticket", async () => {
		const updatedTicket = {
			client: "Jane Doe",
			issue: "Updated Issue",
			status: "closed",
			deadline: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
		};

		const response = await request(app)
			.put(`/api/v1/tickets/${ticketId}`)
			.send(updatedTicket);
    
		expect(response.status).toBe(200); // Expect status code 200
		expect(response.body.data).toHaveProperty("client", updatedTicket.client); // Check updated client name
		expect(response.body.data).toHaveProperty("status", updatedTicket.status); // Check updated status
	});

	// Test case for deleting a ticket
 
});

"use client";

import { useCallback, useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CircularProgress, Button, Chip, Switch, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Paper } from "@mui/material";
import api from "../../utils/api";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

interface Ticket {
    _id: string; // Assuming `_id` is unique
    client: string;
    issue: string;
    status: string;
    deadline: string;
}

export default function TicketsPage() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter(); // Get the router instance
	const [downloading, setDownloading] = useState(false); // State for handling download

	useEffect(() => {
		let isMounted = true; // Guard to prevent state updates on unmounted components.

		async function fetchTickets() {
			try {
				const response = await api.get("/api/v1/tickets");
				if (isMounted) {
					setTickets(response.data.data);
				}
			} catch (error) {
				console.error("Error fetching tickets:", error);
				if (isMounted) {
					setError("Failed to fetch tickets. Please try again later.");
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		fetchTickets();

		return () => {
			isMounted = false; // Cleanup on unmount.
		};
	}, []); // Empty dependency array ensures this runs once.
	// Utility function to generate a random client name
	const getRandomClientName = () => {
		const names = ["Alice", "Bob", "Charlie", "David", "Eva"];
		return names[Math.floor(Math.random() * names.length)];
	};

    interface Ticket {
        _id: string;
        client: string;
        issue: string;
        status: string;
        deadline: string;
    }
    // Utility function to generate a random issue message
    const getRandomIssueMessage = () => {
    	const issues = [
    		"Login issue",
    		"Payment not processed",
    		"Unable to access account",
    		"Error during checkout",
    		"Feature request",
    	];
    	return issues[Math.floor(Math.random() * issues.length)];
    };

    // Utility function to generate random dates
    const getRandomDate = (start: Date, end: Date) => {
    	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    	return date.toISOString().split("T")[0]; // Return date in YYYY-MM-DD format
    };
    const getStatusColor = (status: string, deadline: string): "success" | "warning" | "error" => {
    	const today = new Date();
    	const deadlineDate = new Date(deadline);

    	if (status === "closed") {
    		return "success"; // Green
    	} else if (status === "open" && today < deadlineDate) {
    		return "warning"; // Yellow
    	} else if (status === "open" && today > deadlineDate) {
    		return "error"; // Red
    	}
    	return "error"; // Fallback if necessary
    };
    // Debounce function to prevent multiple rapid clicks
    const debounce = (func: (...args: any[]) => void, delay: number) => {
    	let timeoutId: NodeJS.Timeout | null = null;
    	return function (...args: any[]) {
    		if (timeoutId) {
    			clearTimeout(timeoutId);
    		}
    		timeoutId = setTimeout(() => {
    			func(...args);
    		}, delay);
    	};
    };
    // Function to generate a random ticket
    const generateRandomTicket = useCallback(
    	debounce(async () => {
    		const now = new Date();
    		const randomClient = getRandomClientName();
    		const randomIssue = getRandomIssueMessage();
    		const deadline = getRandomDate(
    			new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    			new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days in the future
    		);

    		const newTicket = {
    			_id: Math.random().toString(36).substr(2, 9), // Generate a random ID for local state
    			client: randomClient,
    			issue: randomIssue,
    			status: "open",
    			deadline: deadline,
    		};

    		try {
    			await api.post("/api/v1/tickets", {
    				client: randomClient,
    				issue: randomIssue,
    				status: "open",
    				deadline: deadline,
    			}); // Save new ticket using the REST API
    			setTickets((prevTickets) => [...prevTickets, newTicket]); // Add new ticket to local state
    		} catch (error) {
    			console.error("Error generating random ticket:", error);
    		}
    	}, 500),
    	[]
    ); // 500ms delay for debouncing



    const handleGenerateReport = async () => {
    	setDownloading(true); // Start download process
    	try {
    		const response = await api.get("/api/v1/report", {
    			responseType: "blob", // Ensures the response is treated as a file
    		});

    		// Create a URL for the file
    		const blob = new Blob([response.data], { type: response.headers["content-type"] });
    		const link = document.createElement("a");
    		link.href = URL.createObjectURL(blob);
    		link.download = "tickets_report.xlsx"; // Adjust file name and extension as necessary
    		document.body.appendChild(link);
    		link.click();
    		document.body.removeChild(link);
    	} catch (error) {
    		console.error("Error generating report:", error);
    	} finally {
    		setDownloading(false); // End download process
    	}
    };
    const handleStatusChange = async (ticketId: string, currentStatus: string) => {
    	const newStatus = currentStatus === "open" ? "closed" : "open"; // Toggle status
    	try {
    		await api.put(`/api/v1/tickets/${ticketId}`, { status: newStatus }); // Update ticket status on the server
    		setTickets((prevTickets) =>
    			prevTickets.map(ticket =>
    				ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
    			)
    		); // Update local state
    	} catch (error) {
    		console.error("Error updating ticket status:", error);
    	}
    };
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!tickets.length) return <><Typography>No tickets found.</Typography><Button variant="contained" color="secondary" onClick={() => router.push("/tickets/create-ticket")}> Create Ticket </Button></>;

    return (
    	<Container>
    		<Typography variant="h4" gutterBottom>
                Tickets List
    		</Typography>
    		<Button
    			variant="contained"
    			color="primary"
    			onClick={generateRandomTicket}
    			style={{ marginBottom: "16px" }}
    		>
                Generate Random Ticket
    		</Button>
    		<div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
    			<Button
    				variant="contained"
    				color="primary"
    				onClick={handleGenerateReport}
    				disabled={downloading}
    			>
    				{downloading ? "Generating Report..." : "Generate Report"}
    			</Button>
    			<Button
    				variant="contained"
    				color="secondary"
    				onClick={() => router.push("/tickets/create-ticket")}
    			>
                    Create Ticket
    			</Button>
    		</div>

    		<TableContainer component={Paper}>
    			<Table>
    				<TableHead>
    					<TableRow>
    						<TableCell>Client</TableCell>
    						<TableCell>Issue</TableCell>
    						<TableCell>Status</TableCell>
    						<TableCell>Deadline</TableCell>
    						<TableCell>Action</TableCell>
    					</TableRow>
    				</TableHead>
    				<TableBody>
    					{tickets.map((ticket) => (
    						<TableRow key={ticket._id}>
    							<TableCell>{ticket.client}</TableCell>
    							<TableCell>{ticket.issue}</TableCell>
    							<TableCell>
    								<Chip
    									label={ticket.status}
    									color={getStatusColor(ticket.status, ticket.deadline)}
    									variant="filled"
    								/>
    							</TableCell>
    							<TableCell>{new Date(ticket.deadline).toLocaleDateString()}</TableCell>
    							<TableCell>
    								{ticket.status === "open" && (
    									<>
    										<Switch
    											onChange={() => handleStatusChange(ticket._id, ticket.status)}
    											color="primary"
    										/>
    										<Button
    											variant="contained"
    											color="primary"
    											onClick={() => {
    												window.location.href = `/tickets/update-ticket/${ticket._id}`;
    											}}
    										>
                                                Update Ticket
    										</Button>
    									</>
    								)}
    							</TableCell>
    						</TableRow>
    					))}
    				</TableBody>
    			</Table>
    		</TableContainer>

    	</Container>
    );
}

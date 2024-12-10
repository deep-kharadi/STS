// // app/tickets/page.tsx
// "use client"
// import { useEffect, useState } from "react"
// import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material"
// import api from "../../utils/api"

// interface Ticket {
//   id: string;
//   client: string;
//   issue: string;
//   status: string;
// }

// export default function TicketsPage() {
// 	const [tickets, setTickets] = useState<Ticket[]>([])
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {
// 		async function fetchTickets() {
// 			try {
// 				const response = await api.get("/api/v1/tickets")
// 				console.log("response",response)
// 				setTickets(response.data.data)
// 			} catch (error) {
// 				console.error("Error fetching tickets:", error)
// 			} finally {
// 				setLoading(false)
// 			}
// 		}
// 		fetchTickets()
// 	}, [])

// 	if (loading) return <CircularProgress />

// 	return (
// 		<Container>
// 			<Typography variant="h4" gutterBottom>
//         Tickets List
// 			</Typography>
// 			{tickets.map((ticket) => (
// 				<Card key={ticket.id} style={{ marginBottom: "16px" }}>
// 					<CardContent>
// 						<Typography variant="h6">Client: {ticket.client}</Typography>
// 						<Typography>Issue: {ticket.issue}</Typography>
// 						<Typography>Status: {ticket.status}</Typography>
// 					</CardContent>
// 				</Card>
// 			))}
// 		</Container>
// 	)
// }

// "use client";

// import { useEffect, useState } from "react";
// import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
// import api from "../../utils/api";

// interface Ticket {
//   id: string;
//   client: string;
//   issue: string;
//   status: string;
//   deadline: string; // Added deadline field
// }

// export default function TicketsPage() {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true; // Flag to prevent state updates if the component unmounts during fetch

//     async function fetchTickets() {
//       try {
//         const response = await api.get("/api/v1/tickets");
//         if (isMounted) {
//           setTickets(response.data.data); // State update only if component is still mounted
//         }
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     }

//     fetchTickets();

//     // Cleanup function to prevent state updates on unmounted components
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (loading) return <CircularProgress />;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Tickets List
//       </Typography>
//       {tickets.map((ticket) => (
//         <Card key={ticket.id} style={{ marginBottom: "16px" }}>
//           <CardContent>
//             <Typography variant="h6">Client: {ticket.client}</Typography>
//             <Typography>Issue: {ticket.issue}</Typography>
//             <Typography>Status: {ticket.status}</Typography>
//             <Typography>Deadline: {new Date(ticket.deadline).toLocaleDateString()}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </Container>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import api from "../../utils/api";

interface Ticket {
  _id: string; // Assuming `id` is unique
  client: string;
  issue: string;
  status: string;
  deadline: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!tickets.length) return <Typography>No tickets found.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tickets List
      </Typography>
      {tickets.map((ticket) => (
        <Card key={ticket._id} style={{ marginBottom: "16px" }}>
          <CardContent>

            <Typography variant="h6">Client: {ticket.client}</Typography>
            <Typography>Issue: {ticket.issue}</Typography>
            <Typography>Status: {ticket.status}</Typography>
            <Typography>Deadline: {new Date(ticket.deadline).toLocaleDateString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

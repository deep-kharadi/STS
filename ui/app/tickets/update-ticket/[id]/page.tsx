"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Container, TextField, Button, Typography, CircularProgress, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Link } from "@mui/material";
import api from "../../../../utils/api"; 
import { useParams } from 'next/navigation'; 

interface Ticket {
  id: string;
  client: string;
  issue: string;
  status: string;
  deadline: string;
}

export default function UpdateTicketPage() {
  const router = useRouter();
  const { id: ticketId } = useParams(); // Get the ticket ID from params
  const [formData, setFormData] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state for handling fetch errors

  useEffect(() => {
    async function fetchTicket() {
      if (ticketId) {
        try {
          const response = await api.get(`/api/v1/tickets?id=${ticketId}`);
          if (response.data && response.data.data) {
            setFormData(response.data.data); // Set form data if available
          } else {
            setError("No ticket found");
          }
        } catch (error) {
          console.error("Error fetching ticket:", error);
          setError("Failed to fetch ticket data."); // Set error message on catch
        } finally {
          setLoading(false); // Ensure loading is set to false
        }
      } else {
        setLoading(false);
        setError("No ticket ID provided."); // Set error if no ID
      }
    }

    fetchTicket();
  }, [ticketId]); // Dependency array includes 'ticketId'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
 

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    if (formData) {
      setFormData({ ...formData, status: event.target.value as "open" | "closed" }); // Ensure type is correctly assigned
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await api.put(`/api/v1/tickets/${ticketId}`, formData); // Update the ticket
        alert("Ticket updated successfully!");
        router.push('/tickets'); // Redirect to the tickets list after update
      } catch (error) {
        console.error("Error updating ticket:", error);
        alert("Failed to update ticket");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>; // Handle error case

  return (
    <Container>
    <Typography variant="h4" gutterBottom>
      Update Ticket
    </Typography>
    {formData && (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Client"
          name="client"
          value={formData.client}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Issue"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          value={new Date(formData.deadline).toISOString().split('T')[0]} // Format to 'YYYY-MM-DD'
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange} // Use the new handler for select
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Update Ticket
        </Button>
        <Link href="/tickets">
        <Typography variant="body2" style={{ color: 'blue', cursor: 'pointer' }}>
          Cancel
        </Typography>
      </Link>
      </form>
    )}
  </Container>
  );
}

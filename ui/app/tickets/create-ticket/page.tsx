"use client";
import { useState } from "react";
import { Container, TextField, Button, Typography, MenuItem, Link } from "@mui/material";
import api from "../../../utils/api";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

export default function CreateTicketPage() {
    const router = useRouter(); // Initialize the router

  const [formData, setFormData] = useState({
    client: "",
    issue: "",
    deadline: "",
    // status: "open", // Default status
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/tickets", { ...formData });
      alert("Ticket created successfully!");
      router.push("/tickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Ticket
      </Typography>
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
          value={formData.deadline}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" type="submit">
          Create Ticket
        </Button>
        <Link href="/tickets">
        <Typography variant="body2" style={{ color: 'blue', cursor: 'pointer' }}>
          Cancel
        </Typography>
      </Link>
      </form>
    </Container>
  );
}

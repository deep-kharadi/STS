// utils/api.ts
import axios from "axios"

const api = axios.create({
	baseURL: "http://localhost:8000", // Your Node.js API base URL
	timeout: 10000,
})

export default api

import mongoose from "mongoose"

export const connectDB = (): void => {
	const mongoURI = "mongodb+srv://deepkharadi9:3ANArrcd9QzvBXl3@cluster0.swl8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

	mongoose.connect(mongoURI)
		.then(() => {
			console.log("MongoDB connected")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
		})
}


// const mongoose = require('mongoose');
// const uri = "mongodb+srv://deep:deep@cluster0.swl8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

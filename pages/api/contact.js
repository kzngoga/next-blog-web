import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email.trim() === "" ||
      !email.includes("@") ||
      !name.trim() === "" ||
      !message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = req.body;

    let client;
    try {
      const apiUrl = process.env.MONGODB_URI;

      client = await MongoClient.connect(apiUrl);
    } catch (error) {
      return res.status(500).json({ message: "Database connection failed!" });
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);

      newMessage.id = result.insertedId;
      return res
        .status(201)
        .json({ message: "Successfully sent message!", data: newMessage });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unexpected error occured, pls try again!" });
    }
  }
}

import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());


app.get("/ping", (req, res) => {
  res.send("pong");
});


app.post("/leads", async (req, res) => {
  const { name, email, status } = req.body;
  try {
    const lead = await prisma.lead.create({
      data: { name, email, status },
    });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: "Email must be unique" });
  }
});

app.get("/leads", async (req, res) => {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  res.json(leads);
});

app.listen(4000, () => console.log("API running on http://localhost:4000"));

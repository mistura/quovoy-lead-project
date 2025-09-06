"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
app.use(express_1.default.json());
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
    }
    catch (error) {
        res.status(400).json({ error: "Email must be unique" });
    }
});
app.get("/leads", async (req, res) => {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    res.json(leads);
});
app.listen(4000, () => console.log("API running on http://localhost:4000"));
//# sourceMappingURL=index.js.map
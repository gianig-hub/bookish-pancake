// apps/api placeholder — Kold Market Express backend
// Replace with real Express + Prisma setup when starting Phase 1

import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "api" });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

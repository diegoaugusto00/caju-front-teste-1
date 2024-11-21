import fs from "fs";
import path from "path";

const initialData = {
  registrations: [
    {
      id: "test1",
      email: "test1@example.com",
      cpf: "08714925982",
      admissionDate: "2024-11-12",
      status: "REVIEW",
      employeeName: "Test User 1",
    },
    {
      id: "test2",
      email: "test2@example.com",
      cpf: "08714925982",
      admissionDate: "2024-11-07",
      status: "APPROVED",
      employeeName: "Test User 2",
    },
    {
      id: "test3",
      email: "test3@example.com",
      cpf: "08714925982",
      admissionDate: "2024-11-21",
      status: "REVIEW",
      employeeName: "Test User 3",
    },
  ],
};

export const resetDatabase = () => {
  const dbPath = path.join(process.cwd(), "db.test.json");
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
};

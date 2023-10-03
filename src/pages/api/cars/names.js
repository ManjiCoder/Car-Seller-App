import fs from "node:fs/promises";

export default async function handler(req, res) {
  // For invalid method
  if (req.method !== "GET") {
    res.status(400).json({ error: "Not allowed" });
  }

  // Read the JSON data from the file
  const carsData = await fs.readFile("data/cars.json", "utf-8");
  const cars = JSON.parse(carsData);
  const carNames = cars.map(({ title }) => title);

  res.status(200).json({ carNames });
}

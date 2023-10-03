import fs from "node:fs/promises";

export default async function handler(req, res) {
  // For invalid method
  if (req.method !== "GET") {
    res.status(400).json({ error: "Not allowed" });
  }

  // Read the JSON data from the file
  const carsData = await fs.readFile("data/cars.json", "utf-8");
  const cars = JSON.parse(carsData);

  // Define the number of cars to display per page
  const limit = 6;

  // Get the requested page number from the query parameters
  let page = req.query.page || 1;
  page = parseInt(page); // Convert to an integer

  // Calculate the starting and ending indices for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the cars array to get the cars for the current page
  const carsForPage = cars.slice(startIndex, endIndex);
  if (carsForPage.length === 0) {
    return res.status(400).json({ message: "No cars" });
  }
  res.status(200).json({
    totalCars: cars.length,
    hitCount: carsForPage.length,
    cars: carsForPage,
  });
}

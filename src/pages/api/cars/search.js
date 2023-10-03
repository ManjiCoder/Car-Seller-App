export default async function handler(req, res) {
  // For invalid method
  if (req.method !== "GET") {
    res.status(400).json({ error: "Not allowed" });
  }
  // Fetching the JSON data
  let carsData = await fetch(`${process.env.BASE_URL}/cars.json`);
  carsData = await carsData.json();

  // Define the number of cars to display per page
  const limit = 6;

  // Get the requested page number from the query parameters
  let page = req.query.page || 1;
  page = parseInt(page); // Convert to an integer

  // Extract the car name from the query parameter
  const { q } = req.query;

  // Calculate the starting and ending indices for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  // Filter the cars based on the provided name (case-insensitive)
  const filteredCars = carsData.filter((cars) => {
    return cars.title.toLowerCase().includes(q.toLowerCase());
  });

  const carsForPage = filteredCars.slice(startIndex, endIndex);

  // Check if any cars match the search criteria
  if (filteredCars.length === 0) {
    return res.status(200).json({
      totalCars: 0,
      hitCount: 0,
      cars: [],
      message: "Car not found",
    });
  }

  // Send the matching cars in the response
  res.status(200).json({
    totalCars: filteredCars.length,
    hitCount: carsForPage.length,
    cars: carsForPage,
  });
}

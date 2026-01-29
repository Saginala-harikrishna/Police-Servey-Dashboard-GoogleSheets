// js/dataService.js

async function fetchSheetData() {
  try {
    console.log("Fetching Google Sheet data...");

    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const parsedData = parseCSV(csvText);

    // ✅ store data in global state
    AppState.rawData = parsedData;
    AppState.lastUpdated = new Date();

    console.log("Data fetched successfully");
    console.log("Total rows:", AppState.rawData.length);
    console.table(AppState.rawData);

    // ✅ APPLY FILTERS HERE
    applyFilters();
    if (!populateFilterOptions.called) {
  populateFilterOptions();
  populateFilterOptions.called = true;
}


  } catch (error) {
    console.error("Error fetching sheet data:", error);
  }
}

/**
 * Convert CSV string to array of objects
 */
function parseCSV(csvText) {
  const lines = csvText.split("\n").filter(line => line.trim() !== "");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });
}

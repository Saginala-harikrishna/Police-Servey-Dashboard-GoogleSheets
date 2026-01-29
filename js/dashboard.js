// js/dashboard.js

function updateKPIs() {
  const data = AppState.filteredData;

  const totalSurveys = data.length;

  // Unique areas
  const uniqueAreas = new Set(
    data.map(row => row["Sachivalayam Area"])
  ).size;

  // Sentiment counts
  const positiveCount = data.filter(
    row => row["FEEDBACK & SENTIMENT"] === "Positive"
  ).length;

  const negativeCount = data.filter(
    row => row["FEEDBACK & SENTIMENT"] === "Negative"
  ).length;

  const positivePercent = totalSurveys
    ? Math.round((positiveCount / totalSurveys) * 100)
    : 0;

  const negativePercent = totalSurveys
    ? Math.round((negativeCount / totalSurveys) * 100)
    : 0;

  // Update DOM
  document.getElementById("kpi-total-surveys").textContent = totalSurveys;
  document.getElementById("kpi-total-areas").textContent = uniqueAreas;
  document.getElementById("kpi-positive-percent").textContent =
    positivePercent + "%";
  document.getElementById("kpi-negative-percent").textContent =
    negativePercent + "%";
}

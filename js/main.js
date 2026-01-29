document.addEventListener("DOMContentLoaded", () => {
  console.log("Mahila Suraksha Dashboard initialized");

  fetchSheetData();
  initFilterListeners();
  initDemographicTabs();


  setInterval(fetchSheetData, AUTO_REFRESH_INTERVAL);
});

document
  .getElementById("remarks-search")
  .addEventListener("input", () => {
    renderSentimentAndRemarks();
  });

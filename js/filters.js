function applyFilters() {
  const {
    area,
    ageGroup,
    problemCategory,
    sentiment,
    startDate,
    endDate
  } = AppState.filters;

  AppState.filteredData = AppState.rawData.filter(row => {

    if (area !== "All" && row["Sachivalayam Area"] !== area) {
      return false;
    }

    if (ageGroup !== "All" && row["Age Group"] !== ageGroup) {
      return false;
    }

    if (sentiment !== "All" && row["FEEDBACK & SENTIMENT"] !== sentiment) {
      return false;
    }

    if (
      problemCategory !== "All" &&
      !row["What type of problems do you face?"]?.includes(problemCategory)
    ) {
      return false;
    }

    const rowDate = new Date(row["Timestamp"].replace(/-/g, "/"));
    if (startDate && rowDate < startDate) return false;
    if (endDate && rowDate > endDate) return false;

    return true;
  });

  console.log("Filters applied");
  console.log("Filtered rows:", AppState.filteredData.length);
  console.table(AppState.filteredData);

  updateKPIs();
  renderAreaWiseChart();
  renderProblemCategoryChart();
  renderDemographicChart(
  document.querySelector(".tab.active")?.dataset.tab || "age"
);
renderSentimentAndRemarks();



}


function populateFilterOptions() {
  const areaSelect = document.getElementById("filter-area");
  const ageSelect = document.getElementById("filter-age");
  const categorySelect = document.getElementById("filter-category");
  const sentimentSelect = document.getElementById("filter-sentiment");

  const unique = (key) =>
    [...new Set(AppState.rawData.map(row => row[key]).filter(Boolean))];

  fillSelect(areaSelect, unique("Sachivalayam Area"));
  fillSelect(ageSelect, unique("Age Group"));
  fillSelect(categorySelect, unique("What type of problems do you face?"));
  fillSelect(sentimentSelect, unique("FEEDBACK & SENTIMENT"));
}

function fillSelect(select, values) {
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}


function initFilterListeners() {
  document.getElementById("filter-area").addEventListener("change", e => {
    AppState.filters.area = e.target.value;
    applyFilters();
  });

  document.getElementById("filter-age").addEventListener("change", e => {
    AppState.filters.ageGroup = e.target.value;
    applyFilters();
  });

  document.getElementById("filter-category").addEventListener("change", e => {
    AppState.filters.problemCategory = e.target.value;
    applyFilters();
  });

  document.getElementById("filter-sentiment").addEventListener("change", e => {
    AppState.filters.sentiment = e.target.value;
    applyFilters();
  });

  document.getElementById("filter-start-date").addEventListener("change", e => {
    AppState.filters.startDate = e.target.value
      ? new Date(e.target.value)
      : null;
    applyFilters();
  });

  document.getElementById("filter-end-date").addEventListener("change", e => {
    AppState.filters.endDate = e.target.value
      ? new Date(e.target.value)
      : null;
    applyFilters();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    resetFilters();
  });
}

function resetFilters() {
  AppState.filters = {
    area: "All",
    ageGroup: "All",
    problemCategory: "All",
    sentiment: "All",
    startDate: null,
    endDate: null
  };

  document.getElementById("filter-area").value = "All";
  document.getElementById("filter-age").value = "All";
  document.getElementById("filter-category").value = "All";
  document.getElementById("filter-sentiment").value = "All";
  document.getElementById("filter-start-date").value = "";
  document.getElementById("filter-end-date").value = "";

  applyFilters();

}



function initDemographicTabs() {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.getAttribute("data-tab");
      renderDemographicChart(type);
    });
  });
}

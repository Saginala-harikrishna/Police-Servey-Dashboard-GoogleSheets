// js/charts.js

let areaWiseChartInstance = null;

function renderAreaWiseChart() {
  const data = AppState.filteredData;

  // Count surveys per area
  const areaCounts = {};

  data.forEach(row => {
    const area = row["Sachivalayam Area"];
    if (!area) return;

    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });

  const labels = Object.keys(areaCounts);
  const values = Object.values(areaCounts);

  const ctx = document.getElementById("areaWiseChart").getContext("2d");

  // Destroy previous chart (important!)
  if (areaWiseChartInstance) {
    areaWiseChartInstance.destroy();
  }

  areaWiseChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Number of Surveys",
        data: values,
        backgroundColor: "#2563eb",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}

let problemCategoryChartInstance = null;

function renderProblemCategoryChart() {
  const data = AppState.filteredData;

  const categoryCounts = {};

  data.forEach(row => {
    const categories = row["What type of problems do you face?"];
    if (!categories) return;

    categories.split(",").forEach(cat => {
      const category = cat.trim();
      if (!category || category === "No Issues") return;

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });

  const labels = Object.keys(categoryCounts);
  const values = Object.values(categoryCounts);

  const ctx = document
    .getElementById("problemCategoryChart")
    .getContext("2d");

  if (problemCategoryChartInstance) {
    problemCategoryChartInstance.destroy();
  }

  problemCategoryChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#2563eb",
            "#dc2626",
            "#16a34a",
            "#f59e0b",
            "#7c3aed",
            "#0891b2"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}


let demographicChartInstance = null;

function renderDemographicChart(type = "age") {
  const data = AppState.filteredData;

  let labels = [];
  let values = [];

  if (type === "age") {
    const counts = {};

    data.forEach(row => {
      const age = row["Age Group"];
      if (!age) return;
      counts[age] = (counts[age] || 0) + 1;
    });

    labels = Object.keys(counts);
    values = Object.values(counts);
  }

  if (type === "occupation") {
    const counts = {};

    data.forEach(row => {
      const occ = row["Occupation"];
      if (!occ) return;
      counts[occ] = (counts[occ] || 0) + 1;
    });

    labels = Object.keys(counts);
    values = Object.values(counts);
  }

  if (type === "daynight") {
    const counts = {
      "Day – Feel Safe": 0,
      "Day – Sometimes": 0,
      "Day – Not Safe": 0,
      "Night – Feel Safe": 0,
      "Night – Sometimes": 0,
      "Night – Not Safe": 0
    };

    data.forEach(row => {
      counts[`Day – ${row["Daytime Safety"]}`]++;
      counts[`Night – ${row["How safe do you feel in your area during nighttime?"]}`]++;
    });

    labels = Object.keys(counts);
    values = Object.values(counts);
  }

  const ctx = document
    .getElementById("demographicChart")
    .getContext("2d");

  if (demographicChartInstance) {
    demographicChartInstance.destroy();
  }

  demographicChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Count",
          data: values,
          backgroundColor: "#0ea5e9",
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });
}


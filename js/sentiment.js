// js/sentiment.js

function renderSentimentAndRemarks() {
  const data = AppState.filteredData;

  let positive = 0;
  let neutral = 0;
  let negative = 0;

  data.forEach(row => {
    const sentiment = row["FEEDBACK & SENTIMENT"];
    if (sentiment === "Positive") positive++;
    else if (sentiment === "Neutral") neutral++;
    else if (sentiment === "Negative") negative++;
  });

  // Update sentiment cards
  document.getElementById("sentiment-positive").textContent =
    `Positive (${positive})`;
  document.getElementById("sentiment-neutral").textContent =
    `Neutral (${neutral})`;
  document.getElementById("sentiment-negative").textContent =
    `Negative (${negative})`;

  renderRemarksList(data);
}

function renderRemarksList(data) {
  const remarksContainer = document.getElementById("remarks-list");
  const searchValue =
    document.getElementById("remarks-search").value.toLowerCase();

  remarksContainer.innerHTML = "";

  const filteredRemarks = data.filter(row => {
    const remark = row["Remarks / Suggestions"] || "";
    const area = row["Sachivalayam Area"] || "";
    return (
      remark.toLowerCase().includes(searchValue) ||
      area.toLowerCase().includes(searchValue)
    );
  });

  if (filteredRemarks.length === 0) {
    remarksContainer.innerHTML =
      "<p style='color:#6b7280'>No remarks found.</p>";
    return;
  }

  filteredRemarks.forEach(row => {
    const div = document.createElement("div");
    div.className = "remark";

    const sentimentClass =
      row["FEEDBACK & SENTIMENT"] === "Positive"
        ? "positive"
        : row["FEEDBACK & SENTIMENT"] === "Negative"
        ? "negative"
        : "neutral";

    div.innerHTML = `
      <strong>${row["Sachivalayam Area"]}</strong>
      <span style="float:right" class="${sentimentClass}">
        ${row["FEEDBACK & SENTIMENT"]}
      </span>
      <p>${row["Remarks / Suggestions"] || "—"}</p>
    `;

    remarksContainer.appendChild(div);
  });
}

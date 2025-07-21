let travelData = [];

fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Raw fetched data:", data);

    const fullData = data[0];

    const countryCities = fullData.countries.flatMap(
      (country) => country.cities
    );

    travelData = [...countryCities, ...fullData.temples, ...fullData.beaches];

    console.log("Flattened travelData:", travelData);
    displayTravelRecommendations(travelData);
  })
  .catch((error) => {
    console.error("Error loading travel data:", error);
  });

function displayTravelRecommendations(recommendations) {
  const container = document.getElementById("travel-container");
  container.innerHTML = "";

  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    container.innerHTML = "<p>No destinations found.</p>";
    return;
  }

  recommendations.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("travel-card");
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "8px";
    card.style.margin = "10px 0";
    card.style.padding = "10px";
    card.style.backgroundColor = "#fff";
    card.innerHTML = `
      <h2>${place.name}</h2>
      <img src="${place.imageUrl}" alt="${place.name}" style="width:100%; max-width:400px; height:auto; border-radius: 8px;">
      <p>${place.description}</p>
    `;
    container.appendChild(card);
  });
}

function executeSearch() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const filteredResults = travelData.filter(
    (place) =>
      place.name.toLowerCase().includes(query) ||
      place.description.toLowerCase().includes(query)
  );

  displayTravelRecommendations(filteredResults);
}

function resetSearch() {
  document.getElementById("searchInput").value = "";
  displayTravelRecommendations(travelData);
}

// ===== PACKAGE FILTER =====
function initPackageFilter() {
  const destSelect = document.getElementById("filterDest");
  const durSelect = document.getElementById("filterDur");
  const priceSelect = document.getElementById("filterPrice");
  const searchBtn = document.getElementById("filterSearch");
  const resetBtn = document.getElementById("filterReset");
  const cards = document.querySelectorAll(".package-card-item");
  const noResults = document.getElementById("noResults");

  // Only run on packages page
  if (!searchBtn) return;

  // Filter function
  function filterCards() {
    const dest = destSelect.value;
    const dur = durSelect.value;
    const price = priceSelect.value;
    let visible = 0;

    cards.forEach((card) => {
      const cardDest = card.dataset.dest;
      const cardDur = card.dataset.dur;
      const cardPrice = parseInt(card.dataset.price);

      let show = true;

      if (dest && cardDest !== dest) show = false;
      if (dur && cardDur !== dur) show = false;
      if (price === "low" && cardPrice >= 400) show = false;
      if (price === "mid" && (cardPrice < 400 || cardPrice > 800)) show = false;
      if (price === "high" && cardPrice <= 800) show = false;

      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    noResults.style.display = visible === 0 ? "block" : "none";
  }

  // Search button
  searchBtn.addEventListener("click", filterCards);

  // Reset button
  resetBtn.addEventListener("click", function () {
    destSelect.value = "";
    durSelect.value = "";
    priceSelect.value = "";
    cards.forEach((card) => (card.style.display = ""));
    noResults.style.display = "none";
  });
}

// ===== RUN ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {
  initPackageFilter();
});

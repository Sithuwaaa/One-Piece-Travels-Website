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

  // Search button click
  searchBtn.addEventListener("click", function () {
    const dest = destSelect.value;
    const dur = durSelect.value;
    const price = priceSelect.value;
    let visible = 0;

    cards.forEach(function (card) {
      const cardDest = card.dataset.dest || "";
      const cardDur = card.dataset.dur || "";
      const cardPrice = parseInt(card.dataset.price) || 0;

      let show = true;

      if (dest && cardDest !== dest) show = false;
      if (dur && cardDur !== dur) show = false;
      if (price === "low" && cardPrice > 400) show = false;
      if (price === "mid" && (cardPrice < 400 || cardPrice > 800)) show = false;
      if (price === "high" && cardPrice < 800) show = false;

      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    // Show no results message if nothing matches
    noResults.style.display = visible === 0 ? "block" : "none";
  });

  // Reset button click
  resetBtn.addEventListener("click", function () {
    destSelect.value = "";
    durSelect.value = "";
    priceSelect.value = "";
    cards.forEach(function (card) {
      card.style.display = "";
    });
    noResults.style.display = "none";
  });
}

// ===== RUN ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {
  initPackageFilter();
});

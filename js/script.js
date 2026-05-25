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

// ===== REGION FILTER =====
function initRegionFilter() {
  const buttons = document.querySelectorAll(".region-btn");

  // Only run on destinations page
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      buttons.forEach(function (b) {
        b.classList.remove("active-region");
      });

      // Add active class to clicked button
      this.classList.add("active-region");

      // Get filter value
      const filter = this.dataset.filter;

      // Show or hide cards
      document.querySelectorAll(".dest-item").forEach(function (item) {
        if (filter === "all" || item.dataset.region === filter) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// ===== FLEET MODAL =====
function initFleetModal() {
  const detailBtns = document.querySelectorAll(".fleet-details-btn");

  // Only run on fleet page
  if (!detailBtns.length) return;

  detailBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Get parent card
      const card = btn.closest(".fleet-card");

      // Get card details
      const name = card.querySelector(".fleet-title").textContent;
      const desc = card.dataset.desc;
      const specs = [...card.querySelectorAll(".spec-badge")]
        .map(function (b) {
          return b.textContent.trim();
        })
        .join(", ");

      // Put details into modal
      document.getElementById("modalFleetName").textContent = name;
      document.getElementById("modalFleetDesc").textContent = desc;
      document.getElementById("modalFleetSpecs").textContent = specs;

      // Open modal
      const modal = new bootstrap.Modal(document.getElementById("fleetModal"));
      modal.show();
    });
  });
}

// ===== RUN ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {
  initPackageFilter();
  initRegionFilter();
  initFleetModal();
});

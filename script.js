// Store still images for final states
const finalImages = {
  variant1: "assets/0001.png",
  variant2: "assets/0100.png",
  variant3: "assets/0200.png"
};

// Store transition GIFs
const transitions = {
  "variant1-variant2": "assets/tri-quatra.gif",
  "variant2-variant3": "assets/quatra-penta.gif",
  "variant1-variant3": "assets/tri-penta.gif",
  "variant3-variant1": "assets/penta-tri.gif",
  "variant3-variant2": "assets/penta-quatra.gif",
  "variant2-variant1": "assets/quatra-tri.gif",
};

function preloadTransitionGIFs(transitions) {
  Object.values(transitions).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

preloadTransitionGIFs(transitions);

let currentVariant = "variant1"; // Default variant

document.querySelectorAll(".variant-button").forEach(button => {
  button.addEventListener("click", function () {
    // Remove 'selected' class from all buttons
    document.querySelectorAll(".variant-button").forEach(btn => btn.classList.remove("selected"));

    // Add 'selected' class to the clicked button
    this.classList.add("selected");

    const newVariant = this.getAttribute("data-variant");
    const transitionKey = `${currentVariant}-${newVariant}`;
    const productMedia = document.getElementById("product-media");
    const productHead = document.getElementById('product-header');

    if (currentVariant === newVariant) {
      return; // Prevent replaying the GIF if the same variant is selected
    }

    // Fade out header and update text
    fadeOutHeader(productHead, function() {
      if (newVariant === "variant1") {
        productHead.innerHTML = "TRI-TOP&trade;";
      }

      if (newVariant === "variant2") {
        productHead.innerHTML = "QUATRA-TOP&trade;";
      }

      if (newVariant === "variant3") {
        productHead.innerHTML = "PENTA-TOP&trade;";
      }

      // Fade in header after text change
      fadeInHeader(productHead);
    });

    // Now, play the transition GIF (or final image) immediately
    if (transitions[transitionKey]) {
      productMedia.src = transitions[transitionKey];
    } else {
      productMedia.src = finalImages[newVariant];
    }

    // Update the current variant
    currentVariant = newVariant;
  });
});

// Function to fade out the header
function fadeOutHeader(element, callback) {
  let opacity = 1;
  const fadeOutInterval = setInterval(function() {
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      callback(); // Call the provided callback when fade-out is done
    } else {
      opacity -= 0.05;
      element.style.opacity = opacity;
    }
  }, 20);
}

// Function to fade in the header
function fadeInHeader(element) {
  let opacity = 0;
  const fadeInInterval = setInterval(function() {
    if (opacity >= 1) {
      clearInterval(fadeInInterval);
    } else {
      opacity += 0.05;
      element.style.opacity = opacity;
    }
  }, 20);
}



// Store transition GIFs
const transitions = {
  "variant1-variant2": "assets/tri-quatra.webp",
  "variant2-variant3": "assets/quatra-penta.webp",
  "variant1-variant3": "assets/tri-penta.webp",
  "variant3-variant1": "assets/penta-tri.webp",
  "variant3-variant2": "assets/penta-quatra.webp",
  "variant2-variant1": "assets/quatra-tri.webp",
  "variant1-variant4": "assets/uni.webp",
  "variant2-variant4": "assets/uni.webp",
  "variant3-variant4": "assets/uni.webp",
  "variant4-variant1": "assets/l-tri.webp",
  "variant4-variant2": "assets/tri-quatra.webp",
  "variant4-variant3": "assets/tri-penta.webp",
  "variant4-variant5": "assets/l-t.webp",
  "variant5-variant1": "assets/t-tri.webp",
  "variant1-variant5": "assets/t-top.webp",
  "variant2-variant5": "assets/t-top.webp",
  "variant3-variant5": "assets/t-top.webp",
  "variant5-variant2": "assets/tri-quatra.webp",
  "variant5-variant3": "assets/tri-penta.webp",
  "variant5-variant4": "assets/t-l.webp",
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

      if (newVariant === "variant4") {
        productHead.innerHTML = "L-TOP&trade;";
      }

      if (newVariant === "variant5") {
        productHead.innerHTML = "T-TOP&trade;";
      }

      // Fade in header after text change
      fadeInHeader(productHead);
    });

    // Now, play the transition GIF (or final image) immediately
    if (transitions[transitionKey]) {
      productMedia.src = transitions[transitionKey];
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

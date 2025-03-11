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
    const newVariant = this.getAttribute("data-variant");
    const transitionKey = `${currentVariant}-${newVariant}`;
    const productMedia = document.getElementById("product-media");

    if (currentVariant === newVariant) {
      return; // Prevent replaying the GIF if the same variant is selected
    }
    
    if (transitions[transitionKey]) {
      // Play transition GIF
      productMedia.src = transitions[transitionKey];
    
      // Once the GIF finishes, it will stay on the last frame naturally
    } else {
      // No transition GIF available, directly switch to final image
      productMedia.src = finalImages[newVariant];
    }
    
    // Update the current variant
    currentVariant = newVariant;
    
  });
});
const properties = [
  {
    tag: "For Rent",
    title: "Apartments in Naalya",
    features: ["2 Beds", "1 Baths"],
    price: "UGX 1.5 - 2.6 M/month",
    link: "#",
    image: "https://res.cloudinary.com/detidz8zk/image/upload/v1769344446/DSC_0732_house_2_kdxwvy.webp"
  },
  {
    tag: "For Sale",
    title: "Stand Alone House - Kira",
    features: ["3 bedrooms"],
    price: "UGX 650M",
    link: "#",
    image: "https://res.cloudinary.com/detidz8zk/image/upload/v1769344436/DSC_0012_kira_iyb2px.webp"
  },
  {
    tag: "For Sale",
    title: "Wakiso Land",
    features: ["Range of Hectares"],
    price: "Contact Us For Price",
    link: "#",
    image: "https://res.cloudinary.com/detidz8zk/image/upload/v1769344434/2024-01-02_ak9klm.webp"
  }
];

const card = document.querySelector(".property-card");
let currentIndex = 0;
let rotateInterval;
let isClosed = false;

function showProperty(index) {
  if(isClosed) return; // do not show if closed

  const property = properties[index];
  card.innerHTML = `
    <button class="close-btn">&times;</button>
    <img src="${property.image}" alt="${property.title}" class="property-image" />
    <div class="tag">${property.tag}</div>
    <h2>${property.title}</h2>
    <ul class="features">
      ${property.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div class="price">${property.price}</div>
    <a href="${property.link}" class="cta-btn">View Details</a>
  `;
  card.classList.add("show");

  // Add close button event
  const closeBtn = card.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    isClosed = true;
    card.classList.remove("show");
  });
}

function hideProperty() {
  card.classList.remove("show");
}

// Rotate properties every 5 seconds
function rotateProperties() {
  if(isClosed) return; // stop rotation if closed
  hideProperty();
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % properties.length;
    showProperty(currentIndex);
  }, 800); // match transition
}

// Initial display
window.addEventListener('load', () => {
  showProperty(currentIndex);
  rotateInterval = setInterval(rotateProperties, 5000);
});

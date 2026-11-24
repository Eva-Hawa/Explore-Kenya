/*=================================
 EXPLORE KENYA - JAVASCRIPT 
 =================================*/

//1. Our destination information
const destinations = [
    {
        name: "Maasai Mara",
        category: "Wildlife",
        type: "Wildlife & Safari",
        description: "Witness incredible wildlife and the sweeping beauty of the African savannah.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80",
        alt: "African wildlife in a golden savannah",
        id: "maasai-mara"
    },
    {
        name: "Diani Beach",
        category: "beach",
        type: "Coastal Escape",
        description: "Relax beside turquoise waters, white sands and swaying palm trees",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
        alt: "Tropical beach with turquoise water",
        id: "diani-beach"
    },
    {
        name: "Lake Naivasha",
        category: "nature",
        type: "Nature & Adventure",
        description: "Discover peaceful lake views, birdlife and beautiful green landscapes.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
        alt: "Peaceful lake surrounded by mountains",
        id: "lake-naivasha"
    },
    {
        name: "Amboseli",
        category: "wildlife",
        type: "Wildlife & Safari",
        description: "See majestic elephants with the spectacular Mount Kilimanajaro in the distance",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=80",
        alt: "Elephants walking throuh the African wilderness",
        id: "amboseli",
    },
    {
        name: "Mount Kenya",
        category: "nature",
        type: "Nature & Adventure",
        description: "Explore dramatic mountain scenary, forest trails and high-altitude adventure",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        alt: "Towering mountain peaks",
        id: "mount-kenya",
    },
    {
        name: "Nairobi",
        category: "wildlife",
        type: "City & Wildlife",
        description: "Experience Kenya's lively capital, food, culture and wildlife just outside the city",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80",
        alt: "Modern city skyline",
        id: "nairobi",
    }
];


// 2. Connect Javascript to our HTML elements
const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("destinationSearch");
const categoryFilter = document.getElementById("categoryFilter");
const noResults = document.getElementById("noResults");


// 3. Remember favourite destinations during this page visit
const favorites = new Set();


// 4. Display destination cards
function displayDestinations(destinationList) {

    //Clear the old cards before display new ones
    destinationGrid.innerHTML = "",

    // Show a message when no destinations match
    noResults.hidden = destinationList.length !== 0;

    // Create a acard for every matching destination
    destinationList.forEach((destination) => {

        const isFavorite = favorites.has(destination.id);

        const card = document.createElement("article");
        card.className = "destination-card";
        card.id = destination.id;

        card.innerHTML = `
            <div class="card-image">
                <img 
                     src="${destination.image}"
                     alt="${destination.alt}"
                     loading="lazy">

                <span class="category-tag">
                    ${destination.type}
                </span>

                <button 
                      class="favorite-button ${isFavorite ? "is-favorite" : ""}"
                      type="button"
                      data-favorite="${destination.id}"  
                      aria-label="${isFavorite ? "Remove" : "Add"} ${destination.name} ${isFavorite ? "from" : "to"} favourites"
                      aria-pressed="${isFavorite}">
                      ${isFavorite ? "♥" : "♡"} 
                </button>
            </div>

            <div class="card-content">
                  <h3>${destination.name}</h3> 

                  <p>${destination.description}</p>

                  <div class="card.bottom">
                       <span class="card-type">
                           ✦ Explore Kenya
                       </span> 

                       <a 
                       href="#plan"
                       class="discover-link"
                       data-plan="${destination.name}">
                       Plan a visit →
                       </a>
                  </div>
            </div>
        `;

        destinationGrid.appendChild(card); 
    });
}


// 5. Search and filter destinations
function filterDestinations() {

    const searchTerm = destinationSearch.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredDestinations = destinations.filter((destination) => {

        const matchesSearch =
            destination.name.toLowerCase().includes(searchTerm) ||
            destination.description.toLowerCase().includes(searchTerm) ||
            destination.type.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            destination.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayDestinations(filteredDestinations);
}

red/ yellow
// Update results when someone searches
destinationSearch.addEventListener("input", filterDestinations);


//Update results when someone chnages the category
categoryFilter.addEventListener("change", filterDestinations); 


// 6. Add or remove favourites
destinationGrid.addEventListener("click", (event) => {

    const favoriteButton = event.target.closest("[data-favorite]");
    const planLink = event.target.closest("[data-plan]");

    if (favoriteButton) {

        const destinationId = favoriteButton.dataset.favorite;

        if (favorites.has(destinationId)) {
            favorites.delete(destinationId);
        } else {
            favorites.add(destinationId);
        }

        // Refresh cards to show the updated heart
        filterDestinations();
    }

    // Preselect a destination in the trip form
    if (planLink) {

        const destinationName = planLink.dataset.plan;
        const tripDestination = document.getElementById("tripDestination");

        tripDestination.value = destinationName;
    }
});


// 7. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navlinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navlinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded" , isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


// Close the mobile menu when a navigation link is selected
navLinks.addEventListener("click", (event) => {

    if (event.target.closest("a")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }
});


// 8. Trip planning form
const tripForm = document.getElementById("tripForm");
const formMessage = document.getElementById("formMessage");

tripForm.addEventListener("submit", (event) => {

    // Prevent the page from reloading
    event.preventDefault();

    const travellerName = document 
        .getElementById("travellerName")
        .value
        .trim();

    const tripDestination = document
        .getElementById("tripDestination")
        .value;
    
    const travelStyle = document
         .getElementById("tripStyle")
         .value;

    // Bsic validation
    if (!travellerName || !tripDestination || !travelStyle) {
        formMessage.textContent =
            "Please complete all fields before creating your trip idea,";
        return;
    }

    // Display the visitor's trip idea
    formMessage.textContent =
       `Karibu, ${travellerName}! Your trip idea is ready: ` +
       `${tripDestination} - ${travelStyle}. Happy exploring!`;

    // Bring the confirmation into view
    formMessage.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

// 9. Display destinations when the page first loads
displayDestinations(destinations);

console.log("Explore Kenya is ready! 🇰🇪");

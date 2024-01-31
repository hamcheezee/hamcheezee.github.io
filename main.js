const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

/* =========================== SHOW MENU =========================== */
/* validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add("show-menu")
    })
}

/* =========================== HIDDEN MENU =========================== */
/* validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove("show-menu")
    })
}

/* =========================== REMOVE MENU MOBILE =========================== */
const navLinks = document.querySelectorAll(".nav-link")

function linkAction() {
    const navMenu = document.getElementById("nav-menu")
    // when we click on each nav link, we remove the show menu class
    navMenu.classList.remove("show-menu")
}

navLinks.forEach(n => n.addEventListener('click', linkAction))

/* =========================== CHANGE BACKGROUND HEADER =========================== */
function scrollHeader() {
    const header = document.getElementById("header")
    // when the scroll is greater than 80 viewport height, add the class scroll header to the tag header
    if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}

window.addEventListener("scroll", scrollHeader)

/* =========================== SCROLL SECTIONS ACTIVE LINK =========================== */
// get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

// dd an event listener listening for scroll 
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // get current scroll position
    let scrollY = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link")
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}

/* =========================== PORTFOLIO ITEM FILTER =========================== */
const filterContainer = document.querySelector(".portfolio-filter-inner"),
      filterBtns = filterContainer.children,
      totalFilterBtn = filterBtns.length,
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      totalPortfolioItem = portfolioItems.length;

      for(let i = 0; i < totalFilterBtn; i++) {
        filterBtns[i].addEventListener('click', function() {
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            for(let k = 0; k < totalPortfolioItem; k++) {
                if(filterValue === portfolioItems[k].getAttribute("data-category")) {
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                } else {
                    portfolioItems[k].classList.add("hide");
                    portfolioItems[k].classList.remove("show");
                }

                if(filterValue === "all") {
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
            }
        })
      }

/*==================== CERTIFICATE ITEM POPUP ====================*/
document.querySelectorAll('.cer-thumbnail img').forEach(image => {
    image.addEventListener('click', (event) => {
        event.preventDefault();

        const popup = document.querySelector('.img-popup');
        const popupImage = popup.querySelector('img');
        const originalImageSrc = image.getAttribute('src');

        popupImage.setAttribute('src', originalImageSrc);
        popup.classList.add("open");

        // Close the popup when clicking on the close button (span)
        popup.querySelector('span').addEventListener('click', () => {
            popup.classList.remove("open");
        });

        // Close the popup when clicking outside the image
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.classList.remove("open");
            }
        });
    });
});

/*==================== PORTFOLIO ITEM DETAILS POPUP ====================*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("more-button")) {
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement)
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    // document.querySelector(".main").classList.toggle("fade-out");
}

document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

/*==================== HIDE POPUP WHEN CLICK OUTSIDE OF IT ====================*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
})

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML =
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
    portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}
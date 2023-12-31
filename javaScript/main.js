// theme
const theme = "theme";
const dataTheme = "data-theme";
//this one is a class so needs that period, its a selector
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
//storing the state of our theme
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

// full page Modal - JavaScript

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

//filter
const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

// need access to the root of page
//to access html element, this targets the html element of the document
const root = document.documentElement;

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// Portfolio
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
// querySelector, we only want to select the one thing, we just want the id, so use a string, # for id
const searchBox = document.querySelector("#search");

// Modal
// will look through the document and hunt for our variables
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

//we are going through and grabbing our selectors, the switcher buttons, and it grabs the class, if it isn't null, it will remove the class, else it will take the element and add the active class.
const setActive = (elm, selector) => {
  //grab the elements and check for active class
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }

  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

// on page load, checking for page theme, if there is set the current theme, remove active class from both buttons, then check for theme and set the active to that button
if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

// Error found that was breaking all of the code, my function here was outside of the curly braces, so it caused the theme switch not to work, as well as the active states for the filter
// //includes our switcher buttons, the light and dark
// for (const elm of switcher) {
//   elm.addEventListener("click", function () {});
//   const toggle = this.dataset.toggle;
//   //set active state
//   setActive(elm, switcherBtn);
//   setTheme(toggle);
// }

//includes our switcher buttons, the light and dark
for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    //set active state
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

// search box
searchBox.addEventListener("keyup", (e) => {
  // store the users input
  //lowercase it and get rid of any white space
  const searchInput = e.target.value.toLowerCase().trim();
  //   console.log(searchInput);;
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// filter
for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// full Site modal "open buttons"
// same for Modals
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    // because we used a regular function, it gives us direct access to this(the parent object)(elm) - the node item
    // dataset is the data- part, then our attribute is whats after, for example open or close
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    // here, this is the icon itself(x), parentElement takes us from icon to header, calling again takes us to the outside where isVisible is
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// for the individual modals
document.addEventListener("click", (e) => {
  //check if the element that is clicked on is the same as the element that has the isvisible on it
  console.log(e.target, document.querySelector(".modal.is-visible"));
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  //this time we are doing a keypress for the escape key
  console.log(e.key);
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

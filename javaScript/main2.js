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

// exercise: creating html with data
// doesn't let the rest of the code work that we did in the videos up til now so going to comment out
const data = [
  {
    id: 1,
    dataItem: "web",
    dataOpen: "web-1",
    img: "./assets/images/week 8 image assets/portfolio-1.jpg",
    alt: "portfolio-icon",
    divTitle: "Web Development",
    h3Title: "Food Website",
    h3Title2: "Web Project 1",
    pStrongInput: "My first awesome website",
  },
  {
    id: 2,
    dataItem: "web",
    dataOpen: "web-2",
    img: "./assets/images/week 8 image assets/portfolio-2.jpg",
    alt: "portfolio-icon",
    divTitle: "Web Development",
    h3Title: "Skate Website",
    h3Title2: "Web Project 2",
    pStrongInput: "My first awesome website",
  },
  {
    id: 3,
    dataItem: "web",
    dataOpen: "web-3",
    img: "./assets/images/week 8 image assets/portfolio-3.jpg",
    alt: "portfolio-icon",
    divTitle: "Web Development",
    h3Title: "Eating Website",
    h3Title2: "Web Project 3",
    pStrongInput: "My first awesome website",
  },
  {
    id: 4,
    dataItem: "ui",
    dataOpen: "ui-1",
    img: "./assets/images/week 8 image assets/portfolio-4.jpg",
    alt: "portfolio-icon",
    divTitle: "UI Design",
    h3Title: "Cool Design",
    h3Title2: "UI Project 1",
    pStrongInput: "My first awesome website",
  },
  {
    id: 5,
    dataItem: "app",
    dataOpen: "app-1",
    img: "./assets/images/week 8 image assets/portfolio-5.jpg",
    alt: "portfolio-icon",
    divTitle: "App Development",
    h3Title: "Game App",
    h3Title2: "App Project 1",
    pStrongInput: "My first awesome website",
  },
  {
    id: 6,
    dataItem: "app",
    dataOpen: "app-2",
    img: "./assets/images/week 8 image assets/portfolio-6.jpg",
    alt: "portfolio-icon",
    divTitle: "App Development",
    h3Title: "Gambling App",
    h3Title2: "App Project 2",
    pStrongInput: "My first awesome website",
  },
  {
    id: 7,
    dataItem: "app",
    dataOpen: "app-3",
    img: "./assets/images/week 8 image assets/portfolio-7.jpg",
    alt: "portfolio-icon",
    divTitle: "App Development",
    h3Title: "Money",
    h3Title2: "App Project 3",
    pStrongInput: "My first awesome website",
  },
  {
    id: 8,
    dataItem: "ui",
    dataOpen: "ui-2",
    img: "./assets/images/week 8 image assets/portfolio-8.jpg",
    alt: "portfolio-icon",
    divTitle: "UI Design",
    h3Title: "Fantastic Design",
    h3Title2: "UI Project 2",
    pStrongInput: "My first awesome website",
  },
];

const data2 = [
  {
    dataAnimation: "slideInOutTop",
    dataClose: "data-close",
    symbol: "fas fa-times",
    p1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime fugiat iusto optio, eaque rerum!",
    p2: "Provident similique accusantium nemo autem. Veritatis obcaecati aliquam nihil, eveniet aliquid culpa officia aut!",
  },
];

// this is making the portfolio grid contents that we replace in the html
const portfolioGrid = document.querySelector(".portfolio-grid");

const addCard = (cardData) => {
  const portfolioCard = document.createElement("div");
  portfolioCard.setAttribute("class", "portfolio-card");
  portfolioCard.setAttribute("id", cardData.id);
  portfolioCard.setAttribute("data-item", cardData.dataItem);
  portfolioCard.setAttribute("data-open", cardData.dataOpen);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const image = document.createElement("img");
  image.setAttribute("src", cardData.img);
  image.setAttribute("alt", cardData.alt);
  const popUpBox = document.createElement("div");
  popUpBox.setAttribute("class", "card-popup-box");

  const titleDiv = document.createElement("div");
  titleDiv.innerText = cardData.divTitle;

  const titleH3 = document.createElement("h3");
  titleH3.innerText = cardData.h3Title;

  popUpBox.append(titleDiv);
  popUpBox.append(titleH3);
  cardBody.append(image);
  cardBody.append(popUpBox);
  portfolioCard.append(cardBody);
  portfolioGrid.append(portfolioCard);
};

data.forEach((itemData) => addCard(itemData));

//Exercise: Creating dynamic Modals from data
const $modalContainer = document.querySelector("#modal-container");
console.log($modalContainer);

// adding Exercise: Creating dynamic Modals from data

const portfolioCards = document.querySelectorAll(".card-popup-box");
// console.log("this is openModal", openModal);

portfolioCards.forEach((card) => {
  card.addEventListener("click", () => {
    // console.log(data);
    console.log("finding parent: ", card.parentElement.parentElement);
    // console.log("finding parent: ", card.parentElement.parentElement.id);

    let foundParentId = card.parentElement.parentElement.id;
    const item = data.find((i) => i.id.toString() === foundParentId);

    console.log({ item, foundParentId, data });
    console.log(item.h3Title2);
    console.log(item.img);

    $modalContainer.classList.add(isVisible);

    // $modalContainer.modal.classList.add(isVisible);
    // console.log({ newModal });

    // need to find something to compare between the data and element

    // for (const item of data) {
    //   if (foundParent === item.id) {
    //     console.log(item);
    // not logging ot the console
    console.log(foundParentId, "and ", item.id);
    $modalContainer.innerHTML = `<div class="modal" data-animation="slideInOutTop">
         <div class="modal-dialog">
           <header class="modal-header">
             <h3>"${item.h3Title2}"</h3>
             <i class="fas fa-times" data-close></i>
           </header>
           <div class="modal-body">
             <div class="img-wrapper">
               <img
                 src="${item.img}"
                 alt="portfolio image"
               />
             </div>
             <div class="text-wrapper">
               <p>
                 <strong>"${item.pStrongInput}"</strong>
               </p>
               <p>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                 fugiat iusto optio, eaque rerum!
               </p>
               <p>
                 Provident similique accusantium nemo autem. Veritatis obcaecati
                 aliquam nihil, eveniet aliquid culpa officia aut!
               </p>
             </div>
           </div>
         </div>
       </div>;`;
    //   }
    // }
    const modalCardPopUP = $modalContainer.querySelector("div");
    console.log("Iwanna put stuff here: ", modalCardPopUP);
    modalCardPopUP.classList.add(isVisible);

    const getTheIcon = modalCardPopUP.querySelector("i");
    console.log("did i get the icon?: ", getTheIcon);
    // for (const elm of closeModal) {
    getTheIcon.addEventListener("click", function () {
      // here, this is the icon itself(x), parentElement takes us from icon to header, calling again takes us to the outside where isVisible is
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
      this.parentElement.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
      $modalContainer.innerHTML = `<!-- Modal content goes here -->`;
    });
    // }
  });
});

//when a portfolio card is clicked, display a popup with more information.

// 10/29/23

const slides = document.querySelectorAll(".review-item");

// console.log(slides);

const buttons = document.querySelectorAll(".slide-ctrl-container button");

// console.log(buttons);

//pseudo code
let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;
// console.log("current:", current);
// console.log("next:", next);
// console.log("prev: ", prev);

// const dummySlides = [
// slide 0
// slide 1
// slide 2 - current [next] = current + 1
//   when current is the last item in the array, it will need to loop back to the first item in the array
// slide 3 - next, next will become current once we hit the next button
// ];

// create eventListener for prev/next
//goToNext()
//goToPrev()
//updateIndexes(param)
// updateCSS()

// ---decide how to call prev/next
// ---update variables
// --- [current] = newIndex
//--- [next] = current + 1 : 0
// --- [prev] = current - 1 : length -1
//update the css classes, the active state, prev and next

const update = () => {
  slides.forEach((slide) => {
    // we want to remove all classes first
    slide.classList.remove("active", "prev", "next");
  });
  // update slides with new class
  slides[current].classList.add("active");
  slides[prev].classList.add("prev");
  slides[next].classList.add("next");
};

// update indexes function, the number being passed in is the new current index
const goToNum = (number) => {
  //   console.log("current:", current);
  //   console.log("number:", number);
  current = number;
  next = current < slides.length - 1 ? current + 1 : 0;
  prev = current > 0 ? current - 1 : slides.length - 1;
  update();

  //   this will show us what it currently is
  console.log("prev: ", prev);
  console.log("current: ", current);
  console.log("next: ", next);
};
// try pressing the arrow buttons now, it should update
console.log("prev: ", prev);
console.log("current: ", current);
console.log("next: ", next);

const goToNext = () => {
  console.log("Next");
  current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
};
const goToPrev = () => {
  console.log("Prev");
  current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () =>
    i === 0 ? goToPrev() : goToNext()
  );
}

// invoke so it starts with the page
update();

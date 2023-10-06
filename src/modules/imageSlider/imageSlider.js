import "./imageSlider.css";

const createImageSlider = ({ imageLinks }) => {
    // Add slider
    const slider = document.createElement("div");
    slider.className = "slider";

    // Add image container
    const container = document.createElement("div");
    container.className = "container";
    slider.appendChild(container);

    // Add previous button
    const previousButton = document.createElement("button");
    previousButton.className = "previous-button";
    previousButton.textContent = "<";
    slider.appendChild(previousButton);

    // Add next button
    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.textContent = ">";
    slider.appendChild(nextButton);

    // Add the dots
    const dots = document.createElement("div");
    dots.className = "dots";
    imageLinks.forEach(() => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dots.appendChild(dot);
    });
    slider.appendChild(dots);

    // Add the images to the container
    for (let i = 0; i < imageLinks.length; i++) {
        const image = new Image();
        image.src = imageLinks[i];
        if (i !== 0) {
            image.style.visibility = "hidden";
        }
        slider.querySelector(".container").appendChild(image);
        slider.imageIndex = 0;
    }

    // Detect when an image finishes the animation
    slider.querySelectorAll(".container > img").forEach(image => {
        image.addEventListener("animationend", () => {
            if (image.style.animationName === "slide-left-out") {
                image.style.visibility = "hidden";
            } else if (image.style.animationName === "slide-left-in") {
                image.style.visibility = "visible";
            } else if (image.style.animationName === "slide-right-out") {
                image.style.visibility = "hidden";
            }  else if (image.style.animationName === "slide-right-in") {
                image.style.visibility = "visible";
            }
        });
    });

    // Detect when user clicks the next button
    slider.querySelector(".next-button").addEventListener("click", () => {
        toNextSlide({ slider: slider });
    });

    // Detect when user clicks the previous button
    slider.querySelector(".previous-button").addEventListener("click", () => {
        toPreviousSlide({slider: slider});
    });

    return slider;
};


const toNextSlide = ({ slider }) => {
    // Hide the current image
    const currentImage = slider.querySelector(".container").children.item(slider.imageIndex);
    currentImage.style.animation = "0.5s slide-left-out";


    // Calculate the index of the next image
    let newIndex = slider.imageIndex;
    if (newIndex === slider.querySelector(".container").children.length - 1) {
        newIndex = 0;
    } else {
        newIndex += 1;
    }
    slider.imageIndex = newIndex;

    // Show the next image
    const newImage = slider.querySelector(".container").children.item(slider.imageIndex);
    newImage.style.animation = "0.5s slide-left-in"
};

const toPreviousSlide = ({ slider }) => {
    // Hide the current image
    const currentImage = slider.querySelector(".container").children.item(slider.imageIndex);
    currentImage.style.animation = "0.5s slide-right-out";

    // Calculate the index of the next image
    let newIndex = slider.imageIndex;
    if (newIndex === 0) {
        newIndex = slider.querySelector(".container").children.length - 1;
    } else {
        newIndex -= 1;
    }
    slider.imageIndex = newIndex;

    // Show the next image
    const newImage = slider.querySelector(".container").children.item(slider.imageIndex);
    newImage.style.animation = "0.5s slide-right-in";
};

export default createImageSlider;
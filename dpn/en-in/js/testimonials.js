document.addEventListener('DOMContentLoaded', function() {

    const carouselContainers = document.querySelectorAll(".carousel-container");
    for (let i = 0; i < carouselContainers.length; ++i) {
        const carouselContainer = carouselContainers[i];

        const carouselItems = carouselContainer.querySelectorAll(".carousel-item");
        const dotsContainer = carouselContainer.parentNode.querySelector(".dots");

        if (!dotsContainer) {
            continue;
        }
        const dots = [];

        let activeIndex = 0; // Initialize the active index
        let isPaused = false; // Flag to track whether the scrolling is paused

        if (carouselItems.length > 1) {
            carouselItems.forEach((item, index) => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        const index = Array.from(carouselItems).findIndex((item) => item === entry.target);
                        const dot = dots[index];

                        if (entry.isIntersecting && !isPaused) { // Check if not paused
                            dots.forEach((dot) => dot.classList.remove("active"));
                            dot.classList.add("active");
                            activeIndex = index; // Update the active index
                        }
                    });
                }, {
                    threshold: 0.5 // Adjust the threshold as needed
                });

                observer.observe(item);

                const dot = document.createElement("span");
                dot.classList.add("dot");
                dotsContainer.appendChild(dot);
                dots.push(dot);

                dot.addEventListener("click", () => {
                    dots.forEach((dot) => dot.classList.remove("active"));
                    dot.classList.add("active");
                    carouselContainer.scrollLeft = index * carouselItems[0].offsetWidth;
                    activeIndex = index; // Update the active index
                });
            });

            dots[0].classList.add("active");
        }
        
        const pauseScroll = () => {
            isPaused = true; // Set the pause flag
        };

        const resumeScroll = () => {
            isPaused = false; // Reset the pause flag
        };

        carouselContainer.addEventListener("mouseenter", pauseScroll);
        carouselContainer.addEventListener("mouseleave", resumeScroll);

        setInterval(() => {
            if (!isPaused) { // Check if not paused
                activeIndex = (activeIndex + 1) % carouselItems.length;
                dots.forEach((dot) => dot.classList.remove("active"));
                dots[activeIndex].classList.add("active");
                carouselContainer.scrollLeft = activeIndex * carouselItems[0].offsetWidth;
            }
        }, 5000); // Autoscroll every 5 seconds
    }
});

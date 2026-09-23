document.addEventListener('DOMContentLoaded', function () {

    function initCarousel(carouselMain) {

        // Prevent duplicate initialization
        if (carouselMain.dataset.carouselInit) return;
        carouselMain.dataset.carouselInit = 'true';

        const sl = carouselMain.querySelector('.carousel-items');

        if (!sl) return;

        // ==================================================
        // Create Navigation Buttons
        // ==================================================

        function createButton(direction) {

            const btn = document.createElement('button');

            btn.type = 'button';
            btn.id = direction + '-btn';
            btn.className =
                `${direction}-arrow absolute top-1/2 -translate-y-1/2 ` +
                `${direction === 'left' ? 'left-0' : 'right-0'}`;

            btn.innerHTML =
                `<i class="si-solid si-chevron-up font-bold ` +
                `${direction === 'left' ? '-rotate-90' : 'rotate-90'}"></i>`;

            btn.setAttribute(
                'aria-label',
                `Scroll ${direction}`
            );

            // Use visibility instead of display:none
            btn.style.visibility = 'hidden';

            return btn;
        }

        const leftBtn = createButton('left');
        const rightBtn = createButton('right');

        carouselMain.insertBefore(leftBtn, sl);
        carouselMain.appendChild(rightBtn);

        // ==================================================
        // Cached Measurements
        // ==================================================

        let childData = [];
        let cardWidth = 0;

        function cacheMeasurements() {

            // READS ONLY

            const children = Array.from(sl.children);

            childData = children.map(child => {

                const left = child.offsetLeft;
                const width = child.offsetWidth;

                return {
                    element: child,
                    left: left,
                    width: width,
                    center: left + (width / 2)
                };
            });

            if (childData.length) {
                cardWidth = childData[0].width;
            }
        }

        // ==================================================
        // Arrow Visibility
        // ==================================================

        let visibilityTicking = false;

        function updateArrowVisibility() {

            if (visibilityTicking) return;

            visibilityTicking = true;

            requestAnimationFrame(() => {

                // ==========================
                // READS
                // ==========================

                const scrollWidth = sl.scrollWidth;
                const clientWidth = sl.clientWidth;
                const scrollLeft = sl.scrollLeft;

                const isOverflowing =
                    scrollWidth > clientWidth;

                const maxScrollLeft =
                    scrollWidth - clientWidth;

                const tolerance = 5;

                const hideLeft =
                    !isOverflowing ||
                    scrollLeft <= tolerance;

                const hideRight =
                    !isOverflowing ||
                    scrollLeft >= maxScrollLeft - tolerance;

                // ==========================
                // WRITES
                // ==========================

                leftBtn.style.visibility =
                    hideLeft ? 'hidden' : 'visible';

                rightBtn.style.visibility =
                    hideRight ? 'hidden' : 'visible';

                visibilityTicking = false;
            });
        }

        // ==================================================
        // Scroll To Card
        // ==================================================

        function scrollToCard(index) {

            const item = childData[index];

            if (!item) return;

            const targetLeft =
                item.left -
                ((sl.clientWidth - item.width) / 2);

            sl.scrollTo({
                left: targetLeft,
                behavior: 'smooth'
            });
        }

        // ==================================================
        // Handle Scroll
        // ==================================================

        function handleScroll(direction) {

            if (!childData.length) return;

            // =====================================
            // Mobile
            // =====================================

            if (window.innerWidth <= 768) {

                const containerCenter =
                    sl.scrollLeft +
                    (sl.clientWidth / 2);

                let closestIndex = 0;
                let minDist = Infinity;

                // Uses cached values
                for (let i = 0; i < childData.length; i++) {

                    const dist = Math.abs(
                        containerCenter -
                        childData[i].center
                    );

                    if (dist < minDist) {

                        minDist = dist;
                        closestIndex = i;
                    }
                }

                const targetIndex = Math.min(
                    Math.max(
                        closestIndex + direction,
                        0
                    ),
                    childData.length - 1
                );

                scrollToCard(targetIndex);

            } else {

                // =====================================
                // Desktop
                // =====================================

                const maxScrollLeft =
                    sl.scrollWidth - sl.clientWidth;

                const targetPosition =
                    Math.min(
                        Math.max(
                            sl.scrollLeft +
                            (cardWidth * direction),
                            0
                        ),
                        maxScrollLeft
                    );

                sl.scrollTo({
                    left: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // ==================================================
        // Event Listeners
        // ==================================================

        leftBtn.addEventListener('click', () => {
            handleScroll(-1);
        });

        rightBtn.addEventListener('click', () => {
            handleScroll(1);
        });

        // Passive scroll listener
        sl.addEventListener(
            'scroll',
            updateArrowVisibility,
            { passive: true }
        );

        // ==================================================
        // Resize Handling
        // ==================================================

        let resizeTimer;

        function handleResize() {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                // Double RAF prevents forced reflow
                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        cacheMeasurements();
                        updateArrowVisibility();

                    });

                });

            }, 100);
        }

        window.addEventListener(
            'resize',
            handleResize,
            { passive: true }
        );

        // ==================================================
        // ResizeObserver
        // ==================================================

        const resizeObserver =
            new ResizeObserver(() => {

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        cacheMeasurements();
                        updateArrowVisibility();

                    });

                });

            });

        resizeObserver.observe(sl);

        // ==================================================
        // Initial Setup
        // ==================================================

        function initializeCarousel() {

            // Wait for:
            // style recalculation
            // layout
            // paint
            // cookie popup changes

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    cacheMeasurements();
                    updateArrowVisibility();

                });

            });
        }

        window.addEventListener(
            'load',
            initializeCarousel
        );

        initializeCarousel();
    }

    // ==================================================
    // Initialize Existing Carousels
    // ==================================================

    document
        .querySelectorAll('.carousel-main')
        .forEach(initCarousel);

    // ==================================================
    // Observe Dynamically Added Carousels
    // ==================================================

    let mutationTimer;

    const observer =
        new MutationObserver((mutations) => {

            clearTimeout(mutationTimer);

            mutationTimer = setTimeout(() => {

                requestAnimationFrame(() => {

                    for (let i = 0; i < mutations.length; i++) {

                        for (
                            let j = 0;
                            j < mutations[i].addedNodes.length;
                            j++
                        ) {

                            const node =
                                mutations[i].addedNodes[j];

                            if (node.nodeType !== 1) {
                                continue;
                            }

                            if (
                                node.matches &&
                                node.matches('.carousel-main')
                            ) {
                                initCarousel(node);
                            }

                            if (node.querySelectorAll) {

                                node
                                    .querySelectorAll('.carousel-main')
                                    .forEach(initCarousel);
                            }
                        }
                    }

                });

            }, 50);
        });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});
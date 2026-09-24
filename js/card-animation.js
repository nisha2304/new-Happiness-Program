(function () {
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const CARD_SELECTOR = '.aol-animate-card';

    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll(CARD_SELECTOR).forEach(card => {
            card.classList.add('is-visible');
        });
        return;
    }

    /**
     * Reveal observer
     */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const card = entry.target;

                requestAnimationFrame(() => {
                    card.classList.add('is-visible');
                });

                observer.unobserve(card);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        }
    );

    /**
     * Get SAME parent wrapper for all cards
     * This is the key fix.
     */
    function getGroup(card) {
        return (
            card.closest('[data-aos-group]') ||
            card.closest('.elementor-widget') ||
            card.closest('.elementor-top-section') ||
            card.parentElement
        );
    }

    /**
     * Initialize cards
     */
    function initCards(cards) {
        const groups = new Map();

        cards.forEach(card => {
            if (
                !(card instanceof HTMLElement) ||
                card.classList.contains('aol-init')
            ) {
                return;
            }

            if (prefersReducedMotion) {
                card.classList.add('is-visible');
                return;
            }

            const group = getGroup(card);

            if (!groups.has(group)) {
                groups.set(group, []);
            }

            groups.get(group).push(card);

            card.classList.add('aol-init');
        });

        /**
         * Each section gets its OWN stagger
         */
        groups.forEach(groupCards => {

            /**
             * Sort visually
             */
            groupCards.sort((a, b) => {
                const aRect = a.getBoundingClientRect();
                const bRect = b.getBoundingClientRect();

                if (Math.abs(aRect.top - bRect.top) > 20) {
                    return aRect.top - bRect.top;
                }

                return aRect.left - bRect.left;
            });

            groupCards.forEach((card, index) => {
                const delay = Math.min(index * 80, 480);

                card.style.setProperty('--delay', `${delay}ms`);

                revealObserver.observe(card);
            });
        });
    }

    /**
     * Initial load
     */
    function initExistingCards() {
        initCards(document.querySelectorAll(CARD_SELECTOR));
    }

    /**
     * Script is deferred / in_footer, so the DOM is already parsed
     * by the time this runs - no need to wait for window 'load',
     * which only fires once every image/iframe has finished
     * downloading and can be several seconds late on image-heavy pages.
     */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            initExistingCards();
        });
    });

    /**
     * Elementor dynamic content
     */
    const mutationObserver = new MutationObserver(mutations => {
        const newCards = [];

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (!(node instanceof HTMLElement)) return;

                if (node.matches(CARD_SELECTOR)) {
                    newCards.push(node);
                }

                node.querySelectorAll?.(CARD_SELECTOR).forEach(card => {
                    newCards.push(card);
                });
            });
        });

        if (newCards.length) {
            requestAnimationFrame(() => {
                initCards(newCards);
            });
        }
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
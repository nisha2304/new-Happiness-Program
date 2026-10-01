// document.addEventListener('DOMContentLoaded', function() {
//     // Get all accordion items
//     const accordionItems = document.querySelectorAll('.accordion-item')

// // Set first item as active initially
// //accordionItems[0].classList.add('active')

// // Add click event listener to each accordion title
// accordionItems.forEach((item) => {
//     const title = item.querySelector('.accordion-title')
//     title.addEventListener('click', () => {
//         // Toggle active class on clicked item
//         item.classList.toggle('active')
//         // Close all other items except for clicked item
//         accordionItems.forEach((otherItem) => {
//             if (otherItem !== item) {
//                 otherItem.classList.remove('active')
//             }
//         })
//     })
// })
// })

//new js to handle first expanded , all expanded and closed option 

document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length > 0) {
        const initialState = accordionItems[0].dataset.initialState || 'first_item_expanded';

        // Initialize state based on data attribute
        switch (initialState) {
            case 'all_items_expanded':
                accordionItems.forEach((item) => item.classList.add('active'));
                break;
            case 'all_items_closed':
                accordionItems.forEach((item) => item.classList.remove('active'));
                break;
            case 'first_item_expanded':
            default:
                accordionItems[0].classList.add('active');
                break;
        }

        // click event listener for each accordion item
        accordionItems.forEach((item) => {
            const title = item.querySelector('.accordion-title') || item.querySelector('.aol-accordian-head');

            title.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // if all items are initially expanded, close only the clicked one
                if (initialState === 'all_items_expanded') {
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        accordionItems.forEach((otherItem) => otherItem.classList.remove('active'));
                        item.classList.add('active');
                    }
                    return;
                }

                // default accordion toggle behavior (only one stays open at a time)
                accordionItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // toggle clicked item
                item.classList.toggle('active');
            });
        });
    } else {
        console.error('No accordion items found.');
    }
});

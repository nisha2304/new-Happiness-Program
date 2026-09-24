document.addEventListener( "DOMContentLoaded", function () {
    // Select all links in the index block
    var indexLinks = document.querySelectorAll( '.index-block a' );
    indexLinks.forEach( function ( link ) {
        link.addEventListener( 'click', function ( event ) {
            // Prevent default click action
            event.preventDefault();

            // Get the href attribute and subtract the offset
            var targetId = this.getAttribute( 'href' );
            var targetElement = document.querySelector( targetId );
            if ( targetElement ) {
                var topPos = targetElement.getBoundingClientRect().top + window.pageYOffset - 200;
                window.scrollTo( { top: topPos, behavior: 'smooth' } );
            }
        } );
    } );

    // Toggle functionality for collapsible index
    let indexTitle = document.querySelector( '.index-title-toggle' );
    if ( indexTitle ) {
        indexTitle.addEventListener( 'click', function () {
            let indexBlock = this.parentElement;
            if ( indexBlock.classList.contains( 'expanded' ) ) {
                indexBlock.classList.remove( 'expanded' );
            } else {
                indexBlock.classList.add( 'expanded' );
            }
        } );
    }
} );

document.addEventListener('DOMContentLoaded', function() {

  var div = document.createElement('div');
  div.innerHTML = `
    <div id="youtubePopup" class="popup">
      <!-- Close button -->
      <span class="popup-close">&times;</span>
  
      <!-- YouTube embed iframe -->
      <iframe id="youtubeIframe" class="youtubeIframe" width="854" height="480" src="" frameborder="0" allowfullscreen></iframe>
    </div>
    <div id="overlay" class="overlay"></div>
  `;
  
  // Append the div to the body element or any other desired parent element
  document.body.appendChild(div);
  
  // Get the elements
  var youtubeLinks = document.getElementsByClassName('youtubeLink');
  var youtubePopup = document.getElementById('youtubePopup');
  var youtubeIframe = document.getElementById('youtubeIframe');
  var closeBtn = document.getElementsByClassName('popup-close')[0];
  var overlay = document.getElementById('overlay');
  
  // Add click event listeners to the links
  for (var i = 0; i < youtubeLinks.length; i++) {
    youtubeLinks[i].addEventListener('click', function(e) {
      console.log("click;")
      e.preventDefault(); // Prevent default link behavior
      var youtubeId = this.getAttribute('data-youtube-id'); // Extract YouTube video ID from data attribute
      console.log(this, youtubeId)
  
      // Set the YouTube video URL
      var youtubeURL = 'https://www.youtube.com/embed/' + youtubeId + '?enablejsapi=1';
      console.log(youtubeURL)
      youtubeIframe.src = youtubeURL;
  
      // Show the popup
      youtubePopup.style.display = 'block';
      overlay.style.display = 'block';
   });
  }
  
  closeBtn.addEventListener('click', function() {
    youtubePopup.style.display = 'none'; // Hide the popup
    overlay.style.display = 'none'; // Hide the overlay
    youtubeIframe.src = ''; // Reset the YouTube video URL
  });
  overlay.addEventListener('click', function() {
    youtubePopup.style.display = 'none'; // Hide the popup
    overlay.style.display = 'none'; // Hide the overlay
    youtubeIframe.src = ''; // Reset the YouTube video URL
  });
  
  youtubePopup.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
  
  var div = document.createElement('div');
  div.innerHTML = `
    <div id="instaReelPopup" class="popup">
        <span class="instaReel-popup-close popup-close">&times;</span>
       <div class='embed-container'><iframe id="instaReelIframe" src='' frameborder='0' scrolling='no' allowtransparency='true'></iframe></div>
      </div>
    <div id="overlay" class="overlay"></div>`;
  
  
  
  // Append the div to the body element or any other desired parent element
  document.body.appendChild(div);
  
  
  // Get the elements
  var instaReelLinks = document.getElementsByClassName('instaReelLink');
  var instaReelPopup = document.getElementById('instaReelPopup');
  var instaReelIframe = document.getElementById('instaReelIframe');
  var closeBtn = document.getElementsByClassName('instaReel-popup-close')[0];
  var overlay = document.getElementById('overlay');
  var instareeldiv = '';
  
  for (var i = 0; i < instaReelLinks.length; i++) {
  
    var instaReelId = instaReelLinks[i].getAttribute('data-instaReel-id');
    instaReelLinks[i].addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      instaReelIframe.src = '';
  
      var instaUniqueId = this.getAttribute('data-instaReel-unique');
      var instaUrl = 'https://www.instagram.com/p/'+instaUniqueId+'/embed';
      instaReelIframe.src = instaUrl;
      
      instaReelPopup.style.display = 'block';
      overlay.style.display = 'block';
   });
  }
  
  closeBtn.addEventListener('click', function() {
    instaReelPopup.style.display = 'none'; // Hide the popup
    overlay.style.display = 'none'; // Hide the overlay
    instaReelIframe.src = '';
  });
  
  overlay.addEventListener('click', function() {
    instaReelPopup.style.display = 'none'; // Hide the popup
    overlay.style.display = 'none'; // Hide the overlay
    instaReelIframe.src = ''; // Reset the YouTube video URL
  });
  
  instaReelPopup.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  });
  
  //popup for data card  
  document.addEventListener('DOMContentLoaded', function() {
    var div = document.createElement('div');
    div.innerHTML = `
      <div id="contentPopup" class="popup">
        <!-- Close button -->
        <span class="popup-close">&times;</span>
    
        <!-- Content container -->
        <div id="contentContainer" class="content-container p-10 h-[30]"></div>
      </div>
      <div id="overlay" class="overlay"></div>
    `;
    
    // append the div to the body element or any other desired parent element
    document.body.appendChild(div);
    
    // get the elements
    var contentLinks = document.getElementsByClassName('contentLink');
    var contentPopup = document.getElementById('contentPopup');
    var contentContainer = document.getElementById('contentContainer');
    var closeBtn = contentPopup.querySelector('.popup-close'); // Get the close button within the contentPopup div
    var overlay = document.getElementById('overlay');
    
    // function to strip HTML tags
    function stripHtml(html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // add click event listeners to the links
    for (var i = 0; i < contentLinks.length; i++) {
        contentLinks[i].addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            const { text, excerpt, name, age, profession } = this.dataset;
            const content = text;

            // strip HTML tags from post content
            const strippedContent = stripHtml(content);

            //console.log("Post Content:", strippedContent);
            //console.log("Excerpt from data-excerpt attribute:", excerpt);

            // check if content is strictly greater than excerpt and excerpt is not empty
            if (strippedContent.trim() !== '' && excerpt && excerpt.trim() !== '' && excerpt.trim().length < strippedContent.trim().length) {
                var popupTitle = age ? `${name}, ${age}` : name;
                var popupContent = `<h3 class="mb-0 font-bold">${popupTitle}</h3>
                                    <p class="italic">${profession}</p>
                                    ${content}`;

                contentContainer.innerHTML = popupContent;
                
                // show the popup
                contentPopup.style.display = 'block';
                overlay.style.display = 'block';
            }
        });
    }
    
    closeBtn.addEventListener('click', function() {
        contentPopup.style.display = 'none'; // Hide the popup
        overlay.style.display = 'none'; // Hide the overlay
        contentContainer.innerHTML = ''; // Clear the content
    });
    
    overlay.addEventListener('click', function() {
        contentPopup.style.display = 'none'; // Hide the popup
        overlay.style.display = 'none'; // Hide the overlay
        contentContainer.innerHTML = ''; // Clear the content
    });
    
    contentPopup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});



  //vimeo popup
  document.addEventListener('DOMContentLoaded', function() {

    var div = document.createElement('div');
    div.innerHTML = `
      <div id="vimeoPopup" class="popup">
        <!-- Close button -->
        <span class="vimeo-popupclose popup-close">&times;</span>
    
        <!-- Vimeo embed iframe -->
        <iframe id="vimeoIframe" class="vimeoIframe" width="854" height="480" src="" frameborder="0" allowfullscreen></iframe>
      </div>
      <div id="overlay" class="overlay"></div>
    `;
    
    // Append the div to the body element or any other desired parent element
    document.body.appendChild(div);
    
    // Get the elements
    var vimeoLinks = document.getElementsByClassName('vimeoLink');
    var vimeoPopup = document.getElementById('vimeoPopup');
    var vimeoIframe = document.getElementById('vimeoIframe');
    var closeBtn = document.getElementsByClassName('vimeo-popupclose')[0];

    var overlay = document.getElementById('overlay');
    
    // Add click event listeners to the links
    for (var i = 0; i < vimeoLinks.length; i++) {
      vimeoLinks[i].addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var vimeoId = this.getAttribute('data-vimeo-id'); // Extract Vimeo video ID from data attribute
    
        // Set the Vimeo video URL
        var vimeoURL = 'https://player.vimeo.com/video/' + vimeoId;
        vimeoIframe.src = vimeoURL;
    
        // Show the popup
        vimeoPopup.style.display = 'block';
        overlay.style.display = 'block';
     });
    }
    
    closeBtn.addEventListener('click', function() {
      vimeoPopup.style.display = 'none'; // Hide the popup
      overlay.style.display = 'none'; // Hide the overlay
      vimeoIframe.src = ''; // Reset the Vimeo video URL
    });
    overlay.addEventListener('click', function() {
      vimeoPopup.style.display = 'none'; // Hide the popup
      overlay.style.display = 'none'; // Hide the overlay
      vimeoIframe.src = ''; // Reset the Vimeo video URL
    });
    
    vimeoPopup.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
  });

  document.addEventListener('DOMContentLoaded', function() {
  
    var div = document.createElement('div');
    div.innerHTML = `
      <div id="additionalcontactPopup" class="popup">
        <!-- Close button -->
        <span class="popup-close">&times;</span>
    
        <!-- Content container -->
        <div id="additionalcontactPopupContainer" class="content-container"></div>
      </div>
      <div id="overlay" class="overlay"></div>
    `;
    
    // Append the div to the body element or any other desired parent element
    document.body.appendChild(div);
    
    // Get the elements
    var additionalContactLinks = document.getElementsByClassName('see_additional_contact');
    var additionalContactPopup = document.getElementById('additionalcontactPopup');
    var additionalContactContainer = document.getElementById('additionalcontactPopupContainer');
    var closeBtn = additionalContactPopup.querySelector('.popup-close'); // Get the close button within the contentPopup div
    var overlay = document.getElementById('overlay');
    
    // Add click event listeners to the links
    for (var i = 0; i < additionalContactLinks.length; i++) {
      additionalContactLinks[i].addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var content = this.getAttribute('data-text'); // Extract content from data attribute
        
        // Set the content in the popup
        additionalContactContainer.innerHTML = content;
        
        // Show the popup
        additionalContactPopup.style.display = 'block';
        overlay.style.display = 'block';
     });
    }
    
    closeBtn.addEventListener('click', function() {
      additionalContactPopup.style.display = 'none'; // Hide the popup
      overlay.style.display = 'none'; // Hide the overlay
      additionalContactContainer.innerHTML = ''; // Clear the content
    });
    
    overlay.addEventListener('click', function() {
      additionalContactPopup.style.display = 'none'; // Hide the popup
      overlay.style.display = 'none'; // Hide the overlay
      additionalContactContainer.innerHTML = ''; // Clear the content
    });
    
    additionalContactPopup.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
  });
  
  
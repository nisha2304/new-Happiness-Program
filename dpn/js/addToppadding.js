document.addEventListener('DOMContentLoaded', function() {
    var siteHeader = document.getElementById("site-header");
    var bannerCont = document.querySelector(".program-banner");
    const msg = document.getElementById("message-bar");
    const msgH = msg.clientHeight;
    var headerHeight = siteHeader.clientHeight;
    bannerCont.style.paddingTop = headerHeight + msgH + 'px';
    msg.addEventListener("animationstart", function () {
        msg.classList.add("hidden-msgbar");
        msg.style.display = "none";
        document.getElementById("site-header").style.top = "0";
        bannerCont.style.paddingTop = (headerHeight + msgH - msgH) + 'px';
    });
})
   /*test*/
    var prevScrollpos = window.pageYOffset;
    const msg = document.getElementById("message-bar");
    const backToOld = document.querySelector(".back-to-oldsite");
    const backToOldCont = document.querySelector(".back-to-old");

    msg.style.display = 'flex';
    //backToOld.style.display = 'none';
    document.getElementById("site-header").style.top = msg.clientHeight + 'px';
    document.onscroll = function() {
      showFeedback()
    }

    function showFeedback() {
      if (!backToOldCont || !backToOld) return; // exit if not found

      if (
        document.body.scrollTop > window.innerHeight ||
        document.documentElement.scrollTop > window.innerHeight
      ) {
        backToOldCont.style.opacity = "1";
        backToOldCont.style.zIndex = "998";
        backToOldCont.style.display = "block";
        backToOld.style.display = "block";
      } else {
        backToOldCont.style.opacity = "0";
        backToOldCont.style.display = "none";
        backToOldCont.style.zIndex = "-1";
      }
    }
    window.addEventListener('scroll', function() {

      var siteHeader = document.getElementById("site-header");
      var headerHeight = siteHeader.clientHeight;
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos || currentScrollPos < headerHeight) {
        siteHeader.style.top = msg.clientHeight + 'px';
        siteHeader.classList.add("duration-300")
        if (currentScrollPos > headerHeight) {
          siteHeader.style.backgroundColor = 'rgba(255,255,255,1)';
          siteHeader.classList.add("duration-300")
        } else {
          siteHeader.style.backgroundColor = 'rgba(255,255,255,0.7)';
          siteHeader.classList.add("duration-300")
        }
      } else {
        siteHeader.style.top = "-" + headerHeight + 'px';
        // siteHeader.classList.add("duration-300")

      }
      prevScrollpos = currentScrollPos;
    });



    // document.addEventListener("click", function(event) {
    //    var menu = document.getElementById("menu-search");
    //    var magnifyingGlass = document.querySelector(".si-magnifying-glass");
    //   if(menu !== null && magnifyingGlass !== null){
    //    if (!menu.contains(event.target) && event.target !== magnifyingGlass) {
    //         menu.classList.add("hidden");
    //         menu.classList.remove("w-[230px]");
    //     }
    //   }
    // });
    document.addEventListener("click", function(event) {
      var menu = document.getElementById("menu-search");
      var magnifyingGlass = document.querySelector(".menu-page-links.si-magnifying-glass");

      // ensure the menu and magnifying glass elements exist
      if (menu !== null && magnifyingGlass !== null) {

        // check if the click is outside the menu and magnifying glass
        if (!menu.contains(event.target) && event.target !== magnifyingGlass) {

          menu.classList.add("hidden");

          // remove all width-related classes to reset the menu width
          menu.classList.remove("w-[200px]", "w-[230px]");

          var currentHostname = window.location.hostname;

          // list of hostnames where width should be 230px
          var wideWidthHostnames = [
            "yoga.admin.in.artofliving.org",
            "srisrischoolofyoga.org",
            "srisrischoolofyoga.org/in",
            //"rocks.artofliving.org"
          ];

          if (wideWidthHostnames.includes(currentHostname)) {
            menu.classList.add("w-[230px]");
          } else {
            menu.classList.add("w-[200px]"); // for other sites
          }
        }
      }
    });



    const messageBar = document.getElementById("message-bar");

    function closeOnClick() {
      document.onscroll = function() {
        showFeedback()
      }
      localStorage.setItem("popupShown", 'true')
      messageBar.classList.add("slide-up");
      event.preventDefault();

      // Remove the message-bar from the DOM after the animation is complete
      messageBar.addEventListener("animationstart", function() {
        messageBar.classList.add("hidden-msgbar");
        messageBar.style.display = "none";
        document.getElementById("site-header").style.top = "0";


      });
    }

    function menuCloseOnClick() {
      document.querySelector('.mobile-menu-wrapper').classList.toggle('closed');
      document.querySelector('body').style.overflow = 'visible';
      document.querySelector('body').style.position = 'static';
      document.querySelector('body').style.touchAction = '';
      document.querySelector('html').style.overflow = 'visible';
      document.querySelector('html').style.position = 'static';

    }

    function hamburgerOnclick() {
      document.querySelector('.mobile-menu-wrapper').classList.toggle('closed');
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.touchAction = 'none';
      document.querySelector('html').style.overflow = 'hidden';
      document.querySelector('html').style.position = 'fixed';
    }
    // function toggleMenu() {
    //    var menu = document.getElementById("menu-search");
    //    menu.classList.toggle("hidden");
    //    menu.classList.toggle("w-[200px]");
    // }



    function toggleMenu() {
      var menu = document.getElementById("menu-search");

      // List of hostnames where the width should be 230px
      var wideWidthHostnames = [
        "yoga.admin.in.artofliving.org",
        "srisrischoolofyoga.org",
        "srisrischoolofyoga.org/in",
        //"rocks.artofliving.org"
      ];

      // Check if the current hostname matches any in the list
      var isWideWidthSite = wideWidthHostnames.includes(window.location.hostname);

      // Toggle visibility of the menu
      menu.classList.toggle("hidden");

      // Reset the width classes
      menu.classList.remove("w-[200px]", "w-[230px]");

      // Add the appropriate width class based on the hostname
      if (isWideWidthSite) {
        menu.classList.add("w-[230px]"); // For specific hostnames
      } else {
        menu.classList.add("w-[200px]"); // For other sites
      }
    }

    function toggleNewLanguageDropDown() {
      var menu = document.getElementById("mob-language-drop-down");
      menu.classList.toggle("hidden");
    }


    window.onclick = function(event) {
      if (!event.target.matches('.menu-link')) {
        var dropdowns = document.getElementsByClassName("menu-link");

        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('active-parent')) {
            openDropdown.classList.remove('active-parent');
          }

        }
      } else {

      }
    }


    // const items = document.querySelectorAll('.menu-bar-link');
    // const sub_items = document.querySelectorAll('.mega-menu-link');
    //   items.forEach((item, idx) => {
    //     item.addEventListener('click', () => {
    //       ToggleActive(item,idx);
    //     });
    //   });
    //   sub_items.forEach((item, idx) => {
    //     item.addEventListener('click', () => {
    //       ToggleActive(item,idx);
    //     });
    //   });
    //   function ToggleActive(el,index) {
    //     el.classList.toggle('active-parent');
    //     items.forEach((item,idx) => {
    //       if(idx !== index){
    //         if (item.classList.contains('mega-menu-link')) {
    //           item.classList.remove('active-parent');
    //         }else if (!item.classList.contains('mega-menu-link')){
    //           item.classList.remove('active-parent');
    //         }else{
    //           item.classList.remove('active-parent');
    //         }
    //       }
    //     });
    //   }
    document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth < 767) {
        const menu_link_parents = document.querySelectorAll('.menu-link-parent');

        menu_link_parents.forEach(menu_link_parent => {
            menu_link_parent.addEventListener('click', function() {
                // Remove 'active-parent' class from other parent menu items
                menu_link_parents.forEach(menuItem => {
                    if (menuItem !== this) {
                        menuItem.classList.remove('active-parent');
                    }
                });

                // Toggle 'active-parent' class on the clicked parent menu item
                this.classList.toggle('active-parent');
            });
        });

        const menu_link_childs = document.querySelectorAll('.menu-link-child');

        menu_link_childs.forEach(menu_link_child => {
            menu_link_child.addEventListener('click', function() {
                // Remove 'active-parent' class from other child menu items
                menu_link_childs.forEach(submenuItem => {
                    if (submenuItem !== this) {
                        submenuItem.classList.remove('active-parent');
                    }
                });

                // Toggle 'active-parent' class on the clicked child menu item
                this.classList.toggle('active-parent');
            });
        });
    }
});







    //Adding back to old website button in small screens
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {

      document.addEventListener('click', function(event) {
          const dropdownMenu = document.getElementById('mob-language-drop-down');
          const menuToggle = document.querySelector('.language-dd-holder');

          // Check if the dropdown is currently visible (doesn't have the 'hidden' class)
          if (!dropdownMenu.classList.contains('hidden')) {
              // If the click is not inside the dropdown AND not on the toggle icon
              if (!dropdownMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                  dropdownMenu.classList.add('hidden'); // Add the 'hidden' class to hide it
              }
          }
      });

      var back_to_old_link_ul = document.getElementById("menu-header");
      if (back_to_old_link_ul != undefined) {
        var back_to_old_link_li = document.createElement("li");
        var back_to_old_link = document.createElement('a');
        var linkText = document.createTextNode("Feedback?");
        back_to_old_link.appendChild(linkText);
        back_to_old_link.title = "Feedback?";
        back_to_old_link.href = "https://us21.list-manage.com/survey?u=fdde460ef9d3367ac7e102ab4&id=4c361f9cc6&attribution=false";
        back_to_old_link.target = "_blank";
        back_to_old_link.classList = "back-to-oldsite uppercase font-bold text-xsm text-pm-pink border border-pm-darkyellow px-2 py-1 rounded-[10px] bg-gradient-to-l from-snd-banana to-snd-banana";
        back_to_old_link.id = "back-to-oldsite";

        document.body.appendChild(back_to_old_link);
        back_to_old_link_li.style.padding = "20px 25px";
        back_to_old_link_li.appendChild(back_to_old_link);
        back_to_old_link_ul.appendChild(back_to_old_link_li);
      }
      if (wpmlActive) {
        var lang_parent_div_element = document.createElement("div");
        lang_parent_div_element.classList = "dropdown-container md:hidden block pl-4";
        var lang_parent_div_child_element = document.createElement("div");
        lang_parent_div_child_element.classList = "dropdown-wrapper";
        lang_parent_div_child_element.setAttribute('id', 'dropdown-wrapper');
        var lang_parent_div_span = document.createElement('span')
        lang_parent_div_span.innerHTML = currentLanguageName; //'India - English';
        lang_parent_div_child_element.appendChild(lang_parent_div_span);
        //lang_parent_div_element.appendChild(lang_parent_div_child_element);
        // var lang_arr = [
        //     {'link': 'https://www.artofliving.org/in-en', 'title': 'India - English'},
        //     {'link': 'https://www.artofliving.org/in-bn', 'title': 'বাংলা'},
        //     {'link': 'https://www.artofliving.org/in-gu', 'title': 'ગુજરાતી'},
        //     {'link': 'https://www.artofliving.org/in-hi', 'title': 'हिन्दी'},
        //     {'link': 'https://www.artofliving.org/in-kn', 'title': 'ಕನ್ನಡ'},
        //     {'link': 'https://www.artofliving.org/in-ml', 'title': 'മലയാളം'},
        //     {'link': 'https://www.artofliving.org/in-mr', 'title': 'मराठी'},
        //     {'link': 'https://www.artofliving.org/in-ta', 'title': 'தமிழ்'},
        //     {'link': 'https://www.artofliving.org/in-te', 'title': 'తెలుగు'}
        //   ];
        var lang_arr = [];

        //custom
        const currentUrl = window.location.href;
        console.log("current URL:", currentUrl);
        //const regex_navratri = /^https:\/\/www\.artofliving\.org\/in-(en|hi|mr|ka)\/navratri/;

        //const regex_navratri = /^https:\/\/www\.artofliving\.org\/in-(en|hi|mr|ka)\/navratri(?:\/.*|\?.*|#.*)?$/;
        //const regex_navratri = /^https:\/\/www\.artofliving\.org\/in-(en|hi|mr|ka)\/navratri$/;
        //const regex_navratri = /^http:\/\/rocks\.artofliving\.org\/$/;
        // if (regex_navratri.test(currentUrl)) {
        //   lang_arr = [{
        //       'link': 'https://www.artofliving.org/in-en/navratri',
        //       'title': 'India - English'
        //     },
        //     {
        //       'link': 'https://www.artofliving.org/in-hi/navratri',
        //       'title': 'हिन्दी'
        //     },
        //     {
        //       'link': 'https://www.artofliving.org/in-mr/navratri',
        //       'title': 'मराठी'
        //     }
        //   ];

        // }  else 
        if (isSiteInList) {
          lang_arr = [{
              'link': 'https://www.artofliving.org/in-en',
              'title': 'India - English'
            },
            {
              'link': 'https://www.artofliving.org/in-bn',
              'title': 'বাংলা'
            },
            {
              'link': 'https://www.artofliving.org/in-gu',
              'title': 'ગુજરાતી'
            },
            {
              'link': 'https://www.artofliving.org/in-hi',
              'title': 'हिन्दी'
            },
            {
              'link': 'https://www.artofliving.org/in-kn',
              'title': 'ಕನ್ನಡ'
            },
            {
              'link': 'https://www.artofliving.org/in-ml',
              'title': 'മലയാളം'
            },
            {
              'link': 'https://www.artofliving.org/in-mr',
              'title': 'मराठी'
            },
            {
              'link': 'https://www.artofliving.org/in-ta',
              'title': 'தமிழ்'
            },
            {
              'link': 'https://www.artofliving.org/in-te',
              'title': 'తెలుగు'
            }
          ];

          // const currentUrl = window.location.href;
          // const currentUrl = 'https://www.artofliving.org/in-en/navratri#schedule';
          // const currentUrl = 'https://www.artofliving.org/in-en/navratri#BangaloreAshram';
          // const currentUrl = 'https://www.artofliving.org/in-en/navratri/wisdom/';

          // const regex_production = /^https:\/\/www\.artofliving\.org\/in-[a-z]{2,}\/navratri(\/.*)?(#.*)?$/;


          // if(regex_production.test(currentUrl)){
          //   lang_arr = Object.keys(languages_active)
          //   .filter(code => ["in-en", "in-hi", "in-mr"].includes(code))
          //     .map(code => ({
          //       link: languages_active[code].url,
          //       title: languages_active[code].native_name
          //     }));
          // }

          let foundKey = Object.keys(languages_active).find(
            key => languages_active[key].url.includes("/navratri")
          );

          if (is_navratri) {
              lang_arr = Object.keys(languages_active)
              .filter(code => ["in-en", "in-hi", "in-mr"].includes(code))
                .map(code => ({
                  link: languages_active[code].url,
                  title: languages_active[code].native_name
                }));
          }

          // console.log("before", lang_arr);
        } else {
          // Show only active languages
          if (typeof languages_active !== 'undefined' && languages_active !== null) {
            lang_arr = Object.keys(languages_active).map(function(code) {
              
                const regex_navratri = /^https:\/\/navratri\.admin\.in\.artofliving\.org\/in-[a-z]{2,}(\/.*)?$/;
                                
                if(regex_navratri.test(currentUrl)){
                         if (["in-en", "in-hi", "in-mr"].includes(code)) {

                            return {
                                'link': languages_active[code].url,
                                'title': languages_active[code].native_name
                            };
                        }
                }else {
                        return {
                      'link': languages_active[code].url,
                      'title': languages_active[code].native_name
                    };
                }
              // return {
              //   'link': languages_active[code].url,
              //   'title': languages_active[code].native_name
              // };
            });
          }
          //console.log("in active lang list", lang_arr);
        }

        //console.log("after", lang_arr);

        // var lang_parent_div_ul = document.createElement('ul');
        // lang_parent_div_ul.classList = "dropdown-list";

        // for(var j = 0; j < lang_arr.length; j++) {
        //   var lang_row = lang_arr[j];
        //   var lang_li = document.createElement('li');
        //   lang_li.classList = "pl-0 text-left";
        //   var lang_li_link = document.createElement('a');
        //   lang_li_link.href = lang_row.link;
        //   lang_li_link.title = lang_row.title;
        //   lang_li_link.innerHTML = lang_row.title;
        //   lang_li.appendChild(lang_li_link);
        //   lang_parent_div_ul.appendChild(lang_li);
        // }
        //lang_parent_div_child_element.appendChild(lang_parent_div_ul);

        var mob_language_drop_down = document.getElementById("mob-language-drop-down");

        // Ensure the dropdown is available before appending
        if (mob_language_drop_down !== undefined) {
          mob_language_drop_down.innerHTML = "";
          for (var j = 0; j < lang_arr.length; j++) {
            var lang_row = lang_arr[j];
            var lang_li_link_new = document.createElement('a');
            lang_li_link_new.classList = "px-5 py-[10px] hover:bg-snd-banana flex flex-row gap-3 items-center text-sm";
            lang_li_link_new.href = lang_row.link;
            lang_li_link_new.title = lang_row.title;
            lang_li_link_new.innerHTML = lang_row.title;
            mob_language_drop_down.appendChild(lang_li_link_new);
          }
        }

        // back_to_old_link_ul.parentNode.insertBefore(lang_parent_div_element, back_to_old_link_ul.nextSibling);
        var dd_li = document.createElement("li");
        dd_li.appendChild(lang_parent_div_element);
        var back_to_old_link_ul = document.getElementById("menu-header");
        if (back_to_old_link_ul != undefined) {
          back_to_old_link_ul.appendChild(dd_li);
        }
      }
    } /*close*/

    const dd = document.querySelector('.dropdown-wrapper');
    const links = document.querySelectorAll('.dropdown-list a');
    const span = document.querySelector('.dropdown-wrapper span');

    if (dd !== null) {
      dd.addEventListener('click', function() {
        this.classList.toggle('is-active');
      });
    }
    links.forEach((element) => {
      element.addEventListener('click', function(evt) {
        span.innerHTML = currentLanguageName; //"India - English";
      })
    })
    document.addEventListener('click', function(event) {
      var targetDiv = document.querySelector('.dropdown-wrapper');

      // Check if the click target is not the targetDiv or one of its descendants
      if (targetDiv !== null) {
        if (event.target !== targetDiv && !targetDiv.contains(event.target)) {
          // Remove the class from the targetDiv
          targetDiv.classList.remove('is-active');
              //mobile
              const mob_href = event.target.getAttribute('href');
              if (mob_href && mob_href.includes('#')) {
                const targetId = mob_href.split('#')[1];
                const target = document.getElementById(targetId);
                if (target) {console.log(target);
                  menuCloseOnClick();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            //mobile ends
        }else{
              const mob_href = this.getAttribute('href');
              if (mob_href && mob_href.includes('#')) {
                const targetId = mob_href.split('#')[1];
                const target = document.getElementById(targetId);
                if (target) {console.log(target);
                  menuCloseOnClick();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
          }
      }
    });
    //  }


    // function togglesDropdown() {
    //     const dropdown = document.getElementById("dropdown-options");
    //     dropdown.classList.toggle("hidden"); // Toggles visibility of the dropdown list
    // }

    function togglesDropdown() {
      const dropdown = document.getElementById("custom-dropdown");
      const options = document.getElementById("dropdown-options");

      if (options.classList.contains("hidden")) {
        options.classList.remove("hidden"); // Show dropdown
        dropdown.classList.add("open"); // Rotate arrow up
      } else {
        options.classList.add("hidden"); // Hide dropdown
        dropdown.classList.remove("open"); // Rotate arrow down
      }
    }

    function navigateToSite(url) {
      if (url) {
        window.location.href = url; // Navigate to the selected URL
      }
    }

    // Close the dropdown if clicked outside
    document.addEventListener("click", function(event) {
      const dropdownOptions = document.getElementById("dropdown-options");
      const dropdownTrigger = document.getElementById("custom-dropdown");

      if (dropdownOptions && dropdownTrigger) {
        if (!dropdownOptions.contains(event.target) && !dropdownTrigger.contains(event.target)) {
          dropdownOptions.classList.add("hidden"); // Hide the dropdown
          dropdownTrigger.classList.remove("open"); // Rotate arrow down
        }
      }
    });
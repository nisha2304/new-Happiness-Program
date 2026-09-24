document.addEventListener('DOMContentLoaded', function() {
	window.dataLayer = window.dataLayer || [];
	var solution_icon_list = document.querySelectorAll('.banner-solution-icon');

	//banner_solution_icon
	if(solution_icon_list){
		solution_icon_list.forEach((solution_item) => {
		    solution_item.addEventListener('click', function(event) {
				window.dataLayer.push({
			  		event:'banner_solution_icon',
					destination_page_url: this.href,
					icon_name:event.target.alt
				});	
			});	
		});
	}

	//carousel_click 
	var aol_gallery_thumbnail = document.querySelectorAll('.aol-gallery-thumbnail');

	if(aol_gallery_thumbnail){
		aol_gallery_thumbnail.forEach((aol_gallery_thumbnail_item) => {			
		    aol_gallery_thumbnail_item.addEventListener('click', function(event) {
		    	window.dataLayer.push({
                    event:'carousel_click',
					destination_page_url: this.href,
					carousel_name:this.children[0].textContent.trim()
				});
			});	
		});
	}

	//join_program_click
	var faq_item_list = document.querySelectorAll('.faq-item div');

	if(faq_item_list){
		faq_item_list.forEach((faq_item) => {
		    faq_item.addEventListener('click', function(event) {
		    	let child = this.children;
		    	console.log(child[0].textContent);
				window.dataLayer.push({
				  	event:'join_program_click',
					destination_page_url: '#',
					program_name:child[0].textContent
				});	
			});	
		});
	}

	// aol_teacher
	// testimonies
	var aol_teachers = document.querySelector('.testmonial-card');
	if(aol_teachers){
		var aol_teachers_anchor = document.querySelectorAll('.testmonial-card');
		aol_teachers_anchor.forEach((aol_teachers_item) => {	
			if(aol_teachers_item.querySelector('.gtm-testimonies-anchor')){
				aol_teachers_item.querySelector('.gtm-testimonies-anchor').addEventListener('click', function(event) {
					if(this.href.includes("teacher")){

						window.dataLayer.push({
						  event:'aol_teacher',
						  destination_page_url: this.href,
						  name: this.querySelector('p').innerText
						});

					}else{
						if(event.target.querySelector('.gtm-testimonies-name')){
							var testimonies_name = event.target.querySelector('.gtm-testimonies-name').innerText;
						}else{
							var testimonies_name = '';
						}
						window.dataLayer.push({
						  event:'testimonies',
						  destination_page_url: this.href,
						  testimonies_name:testimonies_name
						});
					}
				});
			}
		    	
		});


	}

	
	// header_menu
	var menu_links = document.querySelectorAll(".menu-link");
	if(menu_links){
		var tempMenu = [];
		menu_links.forEach((menu_links_item) => {	

		    menu_links_item.addEventListener('click', function(event) {
		    	tempMenu.push(event.target.innerText);
		    	if(this.href !== 'javascript:void(0);'){
		    		if(tempMenu.length == 3){
		    			window.dataLayer.push({
					event:'header_menu',
					destination_page_url: this.href,
					menu_category:tempMenu[0],
					sub_menu_category:tempMenu[1],
					sub_menu_category_1:tempMenu[2],
					user_id:''
				});	

		    		tempMenu = [];
		    		}else if(tempMenu.length == 2){
		    			window.dataLayer.push({
					event:'header_menu',
					destination_page_url: this.href,
					menu_category:tempMenu[0],
					sub_menu_category:tempMenu[1],
					sub_menu_category_1:'',
					user_id:''
				});	
		    			
		    		tempMenu = [];
		    		}else if(tempMenu.length == 1){
		    			window.dataLayer.push({
					event:'header_menu',
					destination_page_url: this.href,
					menu_category:tempMenu[0],
					sub_menu_category:'',
					sub_menu_category_1:'',
					user_id:''
				});	
		    			
		    		tempMenu = [];
		    		}
		    		console.log(dataLayer);
		    	}
		    	
			});	
		});
	}

	//footer_menu
	var footer_menu_links = document.querySelector(".footer-links").querySelectorAll('a');
	if(footer_menu_links){
		footer_menu_links.forEach((footer_menu_links_item) => {	

		    footer_menu_links_item.addEventListener('click', function(event) {
				if(event.target.getAttribute('href') != '#'){

					var menuCategory = event.target.parentNode.parentNode.parentNode.querySelector("h5").querySelector("a").textContent;

					if(menuCategory){
						menuCategory = menuCategory;
					}else{
						menuCategory = 'Footer';
					}

					window.dataLayer.push({
					  event:'footer_menu',
					  destination_page_url: this.href,
					  menu_category:menuCategory
					});
				}

			});	
		});
	}


	//download_application
	var download_application_icon = document.querySelectorAll('.download-application-icon');

	if(download_application_icon){
		download_application_icon.forEach((download_application_icon_item) => {
			let app_name = '';
			
		    download_application_icon_item.addEventListener('click', function(event) {

			
			if(this.href !== undefined){
				if(this.href.includes("play.google.com")){
					app_name = 'google play store';
				}else if(this.href.includes("apps.apple.com")){
					app_name = 'apple app store';
				}
			}

		    	window.dataLayer.push({
				  event:'download_application',
				  destination_page_url: this.href,
				  app_name: app_name
				});
			});	
		});
	}



	//social_clicks
	var social_brands = document.querySelectorAll('.si-brands');

	if(social_brands){
		social_brands.forEach((social_brands_item) => {
			social_brands_item.addEventListener('click', function(event) {
		    	window.dataLayer.push({
				  event:'social_clicks',
				  destination_page_url: event.target.parentElement.href,
				  channel_name:event.target.parentElement.ariaLabel.split(' ').pop()

				});

			});	
			
		});
	}

	  

	//solution_navigation
	var solution_navigation = document.querySelectorAll('.solution-navigation-datalayer');

	if(solution_navigation){
		solution_navigation.forEach((solution_navigation_item) => {
			solution_navigation_item.addEventListener('click', function(event) {
				window.dataLayer.push({
				  	event:'solution_navigation',
					destination_page_url: this.src.split("/").pop(),
					solution_name:event.target.parentNode.querySelector('h6').innerText
				});
			});	
			
		});
	}

	// program_know_more_cta
	var course_cards_horizontal = document.querySelector('.shadow-course-card-hozl-know-more');
	if(course_cards_horizontal){
        var course_cards_horizontals = document.querySelectorAll('.shadow-course-card-hozl-know-more');
		course_cards_horizontals.forEach((course_cards_horizontals_item) => {
            course_cards_horizontals_item.addEventListener('click', function(event) {
                    window.dataLayer.push({
					  	event:'program_know_more_cta',
						destination_page_url: this.href,
						course_name:event.target.parentNode.parentNode.parentNode.querySelector('h3').innerText
					});


			});	
			
		});
	}



	// share_article
	var share_article_social = document.getElementById("socialIcons");
        if(share_article_social){
        	
        	var share_article_social_icons = document.getElementById("socialIcons").querySelectorAll('.si-brands');
        	if(share_article_social_icons){
        		share_article_social_icons.forEach((share_article_social_icons_item) => {
		            share_article_social_icons_item.addEventListener('click', function(event) {
	                    window.dataLayer.push({
	                                event:'share_article',
	                                destination_page_url: window.location.pathname,
	                                course_name:document.title
	                        });


				});	
				
			});
        	}

        	
                
        }



// filter_button
	var course_card_filter = document.querySelector('.course-card-filter-datalayer');
	if(course_card_filter){
		course_card_filter.addEventListener('click', function(event) {
			window.dataLayer.push({
			  event:'filter_button',
			  destination_page_url: window.location.pathname,
			});
		});	
	}

	

// filter_mode
	var filter_mode = document.getElementById("event-type");
	if(filter_mode){
		filter_mode.onclick = function(){
			window.dataLayer.push({
				event:'filter_mode',
				destination_page_url: window.location.pathname,
				mode:event.target.value
			});
		}	
	}
	

// filter_location
	// var course_card_filter_location_div = document.querySelector('.gtm-mapbox-input-location');
	// if(course_card_filter_location_div){

	// 	const course_card_filter_location = course_card_filter_location_div.querySelector('input[type="text"]');

	// 	course_card_filter_location.onfocus = function() {
	// 		window.dataLayer.push({
	// 		  	event:'filter_location',
	// 			destination_page_url: window.location.pathname
	// 		});
	// 	}
	// }
// filter_language

	var language = document.getElementById("language");

	if(language){
		language.onclick = function(){
			window.dataLayer.push({
				event:'filter_language',
				destination_page_url: window.location.pathname,
				language:event.target.value
			});
		}
	}
	

// filter_date

	let start_date_from = document.querySelector('#start_date_from')
	if(start_date_from){
		start_date_from.onchange = function(){
			window.dataLayer.push({
			    event:'filter_date',
				destination_page_url: window.location.pathname,
			});

		};
	}
	
// faq_click

	var faq_item_list_div = document.querySelector('.wp-block-aol-aol-accordion');

	if(faq_item_list_div){
		var faq_item_list_buttons = faq_item_list_div.querySelectorAll('button');
		if(faq_item_list_buttons){
			faq_item_list_buttons.forEach((faq_item) => {
		    faq_item.addEventListener('click', function(event) {
			    	let faq_text = this.children[0].innerText;
			    	window.dataLayer.push({
					  	event:'faq_click',
						destination_page_url: '',
						faq_name:faq_text
					});

				});	
			});
		}
	}

	// var accordion_question_title = document.querySelectorAll('.accordion-question-title');

	// if(accordion_question_title){
	// 	alert('test');
	// 	accordion_question_title.forEach((accordion_question_item) => {
	//     accordion_question_item.addEventListener('click', function(event) {
	// 	    	window.dataLayer.push({
	// 			  	event:'faq_click',
	// 				destination_page_url: '',
	// 				faq_name:this.innerText
	// 			});

	// 		});	
	// 	});
	// }





// article_keywords
	var article_keywords = document.querySelectorAll('.in-this-article-link');

	if(article_keywords){
		article_keywords.forEach((article_keywords_item) => {
			article_keywords_item.addEventListener('click', function(event) {
				if(this.href){
					window.dataLayer.push({
					  	event:'article_keywords',
						destination_page_url: this.href,
						article_name:document.title
					});

				}
		    	
			});	
			
		});
	}


// article_tag_clicks

	var article_tag_clicks = document.querySelector(".post-tag-list");
	if(article_tag_clicks){ 
		var article_tag_clicks_a = document.querySelector(".post-tag-list").querySelectorAll('a');
	
		article_tag_clicks_a.forEach((article_tag_clicks_item) => {	
		    article_tag_clicks_item.addEventListener('click', function(event) {
				window.dataLayer.push({
				  event:'article_tag_clicks',
				  destination_page_url:  window.location.pathname,
				});
			});	
		}); 
	}


// phone_number_click
// email_click
	var contact_links = document.querySelectorAll('.elementor-widget-elementor-aol-text a');
	contact_links.forEach((contact_links_item) => {
        contact_links_item.addEventListener('click', function(event) {
        	if(this.href.includes("tel:")){

        		window.dataLayer.push({
				  event:'phone_number_click',
				  destination_page_url: window.location.pathname,
				  phone_number:this.href.replace('tel:', '')
				});

        	}else if (this.href.includes("mailto:")){
        		window.dataLayer.push({
				  event:'email_click',
				  destination_page_url: window.location.pathname,
				  email:this.href.replace('mailto:', '')
				});
        	}
        });     
            
    });



// search_programs
// search_content
	var menu_search_anchor = document.querySelectorAll('#menu-search a');

	if(menu_search_anchor){
		menu_search_anchor.forEach((menu_search_anchor_item) => {

		    menu_search_anchor_item.addEventListener('click', function(event) {
		    	let child = this.children;
		    	console.log(child[1].textContent);

		    	if(child[1].textContent == 'Programs'){
		    		window.dataLayer.push({
					  event:'search_programs',
					  destination_page_url: this.href,
					});
		    	}else if(child[1].textContent == 'Content'){
		    		window.dataLayer.push({
					  event:'search_content',
					  destination_page_url: this.href,
					});
		    	}
		    	
			});	
		});
	}


	// var read_more_datalayer = document.querySelectorAll('.read-more-datalayer');

	// if(read_more_datalayer){
	// 	alert('sadsada');
	// 	read_more_datalayer.forEach((read_more_datalayer_item) => {
	// 		read_more_datalayer_item.addEventListener('click', function(event) {
	// 			window.dataLayer.push({
	// 				event:'course_search',
	// 				destination_page_url: <dynamic>
	// 				course_name:<dynamic>,
	// 				location:<dynamic>
	// 				mode:<dynamic>
	// 				language:<dynamic>
	// 				program_type:<dynamic>
	// 			});

	// 		});	
			
	// 	});
	// }
	
// course_search
// blog_read_more_cta

	// var blog_read_more_cta = document.querySelectorAll('.content-search-read-more-url');

	// if(blog_read_more_cta){
	// 	blog_read_more_cta.forEach((blog_read_more_cta_item) => {
	// 		blog_read_more_cta_item.addEventListener('click', function(event) {
	// 			if(this.href){
        //             			window.dataLayer.push({
	// 				  event:'blog_read_more_cta',
	// 				  destination_page_url: this.href,
	// 				  blog_name:event.target.parentNode.querySelector('h3').innerText
	// 				});
					
	// 			}
		    	
	// 		});	
			
	// 	});
	// }

	// plp_register_cta shadow-course-card

	window.addEventListener("click", function (event) {
	    if(event.target.classList.contains('plp-register-btn')){
	    	if(event.target.getAttribute('href')){
				window.dataLayer.push({
				  	event:'plp_register_cta',
					destination_page_url: event.target.getAttribute('href'),
					course_name:event.target.parentNode.parentNode.querySelector('h3').innerText
				});
			}
	    }

	    if(event.target.classList.contains('plp-register-btn-course-card')){
	    	if(event.target.getAttribute('href')){
				window.dataLayer.push({
				  	event:'plp_register_cta',
					destination_page_url: event.target.getAttribute('href'),
					course_name:event.target.parentNode.parentNode.parentNode.querySelector('.font-semibold').querySelector('a').innerText
				});
			}
	    }

	    if(event.target.classList.contains('content-search-read-more-url')){
	    	if(event.target.getAttribute('href')){
				window.dataLayer.push({
				  event:'blog_read_more_cta',
				  destination_page_url: event.target.getAttribute('href'),
				  blog_name:event.target.parentNode.querySelector('h3').innerText
				});
			}
	    }

	    if(event.target.classList.contains('banner-solution-icon')){
	    	if(event.target.getAttribute('href')){
	    		window.dataLayer.push({
			  		event:'banner_solution_icon',
					destination_page_url: this.href,
					icon_name:event.target.src.split('/').pop()
				});
			}
	    }

	    if(event.target.classList.contains('accordion-question-title')){
	    	window.dataLayer.push({
			  	event:'faq_click',
				destination_page_url: '',
				faq_name:this.innerText
			});
	    }

	    const link = event.target.closest('.ai-draft-content a');
		  if (!link) return;

		  // All links inside the AI section
		  const allLinks = Array.from(
		    document.querySelectorAll('.ai-draft-content a')
		  );

		  // 1-based position of clicked link
		  const position = allLinks.indexOf(link) + 1;

		  // Get search input value
		  const searchInput = document.querySelector(
		    '.aol-content-searchfield input'
		  );
		  const searchQuery = searchInput ? searchInput.value.trim() : '';

		  window.dataLayer = window.dataLayer || [];
		  dataLayer.push({
		    event: 'ai_section_link_click',
		    destination_page_url: link.href,
		    previous_page_url: document.referrer || '',
		    search_query: searchQuery,
		    result_position: `${position}/${allLinks.length}`,
		    eventTimeout : 2000
		  });

		  console.log('AI link clicked:', {
		    text: link.textContent.trim(),
		    url: link.href,
		    search_query: searchQuery,
		    position
		  });

	}); 

	// var plp_register_course_search = document.querySelector('#course-search');

	// if(plp_register_course_search){
	// 	var plp_register_cta = document.querySelector('#course-search').querySelectorAll('.plp-register-btn');
	// 	plp_register_cta.forEach((plp_register_cta_item) => {
	// 		plp_register_cta_item.addEventListener('click', function(event) {
	// 			if(this.href){
	// 				window.dataLayer.push({
	// 				  	event:'plp_register_cta',
	// 					destination_page_url: this.href,
	// 					course_name:event.target.parentNode.parentNode.querySelector('h3').innerText
	// 				});


	// 			}
		    	
	// 		});	
			
	// 	});
	// }

	var course_search_div = document.getElementById("course-search");

	if(course_search_div){
		const course_search_form = course_search_div.querySelector("form");
		const course_search_checkboxes = course_search_form.querySelectorAll('input[type="checkbox"]');

		const is_online = course_search_form.querySelector("#ctype-isonline");
		const is_in_person = course_search_form.querySelector("#ctype-inperson");
		const program_ctypes = course_search_form.querySelectorAll('input[name="ctype"]');

		// const course_search_language = course_search_form.querySelector('.language-filter').querySelector('select');
		const course_search_language = course_search_form?.querySelector('.language-filter select');

		var location='';
		var mode='';
		var language='';
		var program_type='';

		course_search_checkboxes.forEach((course_search_checkboxes_item) => {
			course_search_checkboxes_item.addEventListener('change', function(event) {
				if(is_online.checked){
					mode = 'Online';
				}else if(is_in_person.checked){
					mode = 'In Person';
				}

				program_ctypes.forEach((program_ctypes_item) => {
					if(program_ctypes_item.id != 'ctype-isonline'){
						if(program_ctypes_item.checked){
							program_type += program_ctypes_item.parentNode.querySelector('label').innerText + ','
						}
					}
					
				});

				if(course_search_language){
					language = course_search_language.options[course_search_language.selectedIndex].text
				}

				window.dataLayer.push({
				  	event:'course_search',
					destination_page_url: window.location.href,
					course_name:'',
					location:'',
					mode:mode,
					language:language,
					program_type:program_type
				});
	    	
			});	
			
		});
		
		

	}

	var contact_us_cta_form = document.getElementById("contact_us_cta_form"); //contact_us_cta_form_gtm

	if(contact_us_cta_form){
		var lastFocused;
		let contact_us_cta_form_name = contact_us_cta_form.querySelector('input');


		contact_us_cta_form.querySelectorAll('input').forEach(contact_form_item => {
		  contact_form_item.addEventListener('focus', function(event) {
				if(lastFocused !== this){
					lastFocused = this;
                    console.log("clicked");
					window.dataLayer.push({
					  event:'contact_form_interaction'
					});
				}
				
			})
		});
    }

	// var contact_us_cta_form = document.getElementById("contact_us_cta_form"); //contact_us_cta_form_gtm

	// if(contact_us_cta_form){

	// 	let contact_us_cta_form_name = contact_us_cta_form.querySelector('input[type="text"]');
	// 	contact_us_cta_form_name.addEventListener('focus', function(event) {
	// 		window.dataLayer.push({
	// 		  event:'contact_form_interaction'
	// 		});
	// 	})

	// 	let contact_us_cta_form_email = contact_us_cta_form.querySelector('input[type="email"]');
	// 	contact_us_cta_form_email.addEventListener('focus', function(event) {
	// 		window.dataLayer.push({
	// 		  event:'contact_form_interaction'
	// 		});
	// 	})

	// 	let contact_us_cta_form_tel = contact_us_cta_form.querySelector('input[type="tel"]');
	// 	contact_us_cta_form_tel.addEventListener('focus', function(event) {
	// 		window.dataLayer.push({
	// 		  event:'contact_form_interaction'
	// 		});
	// 	})

	// 	let contact_us_cta_form_date = contact_us_cta_form.querySelector('input[type="date"]');
	// 	contact_us_cta_form_date.addEventListener('focus', function(event) {
	// 		window.dataLayer.push({
	// 		  event:'contact_form_interaction'
	// 		});
	// 	})

		

	// }

	const contact_us_cta_form_gtm = document.getElementById("contact_us_cta_form_gtm");
	if(contact_us_cta_form_gtm){
		contact_us_cta_form_gtm.addEventListener("submit", (event) => {
			window.dataLayer.push({
			  event:'contact_form_submit',
			});
		});	
	}
	


	var article_video_cards_vertical = document.querySelector('.article-video-cards-vertical');
	if(article_video_cards_vertical){
		var article_video_cards_vertical_anchor = document.querySelector('.article-video-cards-vertical').querySelectorAll('a');
		article_video_cards_vertical_anchor.forEach((article_video_cards_vertical_anchor_item) => {	

		    article_video_cards_vertical_anchor_item.addEventListener('click', function(event) {
				if(this.href.includes("navratri")){

					window.dataLayer.push({
					  event:'navratri_articles',
					  article_name: event.target.innerText
					});

				}
			});	
		});
	}
	

})

const url = new URL(window.location);
const urlParams = new URLSearchParams(url.search);
const utmParamsArray = Array.from(urlParams.entries()).filter(param => param[0].startsWith("utm"));

if(utmParamsArray.length > 0){
	var now = new Date().getTime(); // Get current timestamp in milliseconds
    var expiryTime = now + (2 * 24 * 60 * 60 * 1000);

	if(localStorage.hasOwnProperty("goat_utm_params")){
	     localStorage.setItem("goat_utm_params", JSON.stringify(utmParamsArray));
	     localStorage.setItem("goat_utm_expiryTime", expiryTime);
	 }else{
	    localStorage.setItem("goat_utm_params", JSON.stringify(utmParamsArray));
	    localStorage.setItem("goat_utm_expiryTime", expiryTime);
	 }	
}

function update_UTM_Paramters(links) {
    if(localStorage.hasOwnProperty("goat_utm_params")){
	     var goat_utm_params = localStorage.getItem("goat_utm_params");
	     	if (goat_utm_params.length > 0) {

	     		var expiryTime = localStorage.getItem('goat_utm_expiryTime');

	     		if (expiryTime && parseInt(expiryTime) >= new Date().getTime()) {

	     			let utmParamString = '&';
			  	
				  	JSON.parse(goat_utm_params).forEach(item => {
					    utmParamString += item[0]+'='+item[1]+'&';
					 });
				  
				  	// Remove the trailing comma and space
				  	utmParamString = utmParamString.slice(0, -1);
					links.forEach(link => {

					    if (
					        link.href.includes("www.artofliving.online/registration.php") ||
					        link.href.includes("https://programs.vvmvp.org/events/") ||
					        link.href.includes("http://aolic.org/") ||
					        link.href.includes("/program/")
					    ) {

					        const url = new URL(link.href);

					    	// Add UTM params
					        JSON.parse(goat_utm_params).forEach(item => {
					            url.searchParams.append(item[0], item[1]);
					        });

					        // Add greferrer if not already present
				            if (!url.searchParams.has('greferrer')) {
				            	url.hash = `greferrer=${encodeURIComponent(window.location.href)}`;
				                //url.searchParams.append('greferrer', window.location.href);
				            }

					        link.href = url.toString();
					    }
					});

	     		}else{
	     			localStorage.removeItem("goat_utm_params");
	     			localStorage.removeItem("goat_utm_expiryTime");
	     		}
				
				

			} else {
			  console.log('goat_utm_params not available');
			}
	 }
  }

// Callback function for MutationObserver
// function registerLinkRenderedCallback(mutationsList, observer) {
// for(let mutation of mutationsList) {
//   if (mutation.type === 'childList') {
// 	    const addedLinks = Array.from(mutation.addedNodes).filter(node => node.tagName === 'A');
	      
// 	    if (addedLinks.length > 0 && addedLinks[0].href.includes("www.artofliving.online/registration.php")) {
// 	    	console.log(addedLinks[0].href);

// 	    	addedLinks.forEach(link => {
// 		       //link.href += utmParamString;
// 				if(link.href.includes("www.artofliving.online/registration.php")){
// 						var refferrerStr = '';
//                         var refferrer = location.href;
//                         if(refferrer !== undefined){
//                         	refferrerStr += '&greferrer='+refferrer;
//                         }
//                         link.href += refferrerStr;
//                         refferrerStr = '';
                        
//                 }
// 		    });
// 	      	update_UTM_Paramters(addedLinks);
// 	    }
// 	  }
// 	}
// }

function registerLinkRenderedCallback(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      const addedLinks = Array.from(mutation.addedNodes).filter(node =>
        node.nodeType === 1 && // Ensure it's an element
        node.tagName === 'A' &&
        typeof node.href === 'string' &&
        (node.href.includes('www.artofliving.online/registration.php') || node.href.includes('https://programs.vvmvp.org/events/') || node.href.includes('/program/'))
      );

      if (addedLinks.length > 0) {
        addedLinks.forEach(link => {

		  const url = new URL(link.href);

		  // Add greferrer if not present
		  if (!url.searchParams.has('greferrer')) {
		  	url.hash = `greferrer=${encodeURIComponent(window.location.href)}`;
		    //url.searchParams.set('greferrer', window.location.href);
		  }

		  // Add _ga only for specific domains
		  if (
		    location.href.includes("https://srisrischoolofyoga.org/") ||
		    location.href.includes("https://yoga.admin.in.artofliving.org/")
		  ) {
		    const gacookie = getCookieForDatalayer('_ga');

		    if (gacookie && !url.searchParams.has('_ga')) {
		      url.searchParams.set('_ga', gacookie);
		    }
		  }

		  link.href = url.toString();

		});

        update_UTM_Paramters(addedLinks);
      }
    }
  }
}

//register-url
function isValidURL(link_string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol (optional)
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}$', 'i'); // fragment locator
    return !!pattern.test(link_string);
}

function getCookieForDatalayer(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

// Create a MutationObserver instance
// const observer = new MutationObserver(registerLinkRenderedCallback);

// Start observing changes in the body and its descendants
// observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });



// const observer = new MutationObserver(registerLinkRenderedCallback);

// observer.observe(document.body, {
//   childList: true,
//   subtree: true
// });

function initObserver() {
  if (!document.body) {
    return;
  }

  const observer = new MutationObserver(registerLinkRenderedCallback);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initObserver);
} else {
  initObserver();
}

document.addEventListener("DOMContentLoaded", function() {
	var links = document.querySelectorAll('a.register-url');
    var refferrerStr = '';
    if (links.length > 0) {
    	
        var refferrer = location.href;

        links.forEach(function(link) {

		  if (
		    link.href.includes("www.artofliving.online/registration.php") ||
		    link.href.includes("https://programs.vvmvp.org/events/") ||
		    link.href.includes("www.artofliving.online/subscription.php")
		  ) {

		    try {
		      const url = new URL(link.href, window.location.origin);

		      if (typeof refferrer !== 'undefined' && refferrer) {
		        if (!url.searchParams.has('greferrer')) {
		          url.hash = `greferrer=${encodeURIComponent(referrer)}`;
		          // url.searchParams.set('greferrer', refferrer);
		        }
		      }

		      link.href = url.toString();

		    } catch (e) {
		      console.warn("Invalid URL:", link.href);
		    }

		  }

		});

    } else {
        console.log("No links with the class 'register-url' found.");
    }
});

window.addEventListener('load', () => {
    
    const shadow_card_btn_anchors = document.querySelectorAll(`a.shadow-card-btn`);
    if(shadow_card_btn_anchors.length > 0){
    		update_UTM_Paramters(shadow_card_btn_anchors);
    }

    const custom_cards_btn_anchors = document.querySelectorAll(`a.custom-cards-btn`);
    if(custom_cards_btn_anchors.length > 0){
    		update_UTM_Paramters(custom_cards_btn_anchors);
    }

    // var gtm_aol_teachers_anchor = document.querySelectorAll('.gtm-teacher-anchor');
	var gtm_aol_aol_teachers = document.querySelector('.teachers-carousel-container');
        if(gtm_aol_aol_teachers){
            gtm_aol_aol_teachers.addEventListener('click', function(event) { 
                    if (event.target.parentElement && event.target.parentElement.classList.contains('gtm-teacher-anchor')) {
                    window.dataLayer.push({
                              event:'aol_teacher',
                              name:event.target.querySelector('p').textContent
                            });
                }
            });

        }

    document.addEventListener('click', function (event) {

	    const clickedLink_ai = event.target.closest('.aol-content-card h3 a');
	    if (!clickedLink_ai) return;

	    const parentCard_ai = clickedLink_ai.closest('.aol-content-card');
	    if (!parentCard_ai) return;

	    // All cards for position calculation
	    const allCards_ai = Array.from(
	      document.querySelectorAll('.aol-content-card')
	    );
	    const resultPosition_ai = allCards_ai.indexOf(parentCard_ai) + 1;

	    // Search query
	    const searchInput_ai = document.querySelector(
	      '.aol-content-searchfield input'
	    );
	    const searchQuery_ai = searchInput_ai ? searchInput_ai.value.trim() : '';

	    const resultTitle_ai = clickedLink_ai.textContent.trim();

	    window.dataLayer = window.dataLayer || [];
	    dataLayer.push({
	      event: 'ai_search_result_article',
	      destination_page_url: clickedLink_ai.href,
	      previous_page_url: document.referrer || '',
	      search_query: searchQuery_ai,
	      result_position: resultPosition_ai,
	      result_title: resultTitle_ai,
	      keyword_click: false,
	      tag_click: false
	    });

	    console.log('AI article title clicked:', {
	      title: resultTitle_ai,
	      position: resultPosition_ai,
	      search_query: searchQuery_ai
	    });

	  });

    document.addEventListener('click', function (event) {

	  const clickedImg_img = event.target.closest('.aol-content-card img');
	  if (!clickedImg_img) return;

	  const imgAnchor_img = clickedImg_img.closest('a');
	  if (!imgAnchor_img) return;

	  const cardImg_img = clickedImg_img.closest('.aol-content-card');
	  if (!cardImg_img) return;

	  const allCards_img = Array.from(
	    document.querySelectorAll('.aol-content-card')
	  );
	  const resultPosition_img = allCards_img.indexOf(cardImg_img) + 1;

	  const searchInput_img = document.querySelector(
	    '.aol-content-searchfield input'
	  );
	  const searchQuery_img = searchInput_img
	    ? searchInput_img.value.trim()
	    : '';

	  const resultTitle_img =
	    clickedImg_img.alt?.trim() ||
	    imgAnchor_img.getAttribute('aria-label') ||
	    '';

	  window.dataLayer = window.dataLayer || [];
	  dataLayer.push({
	    event: 'ai_search_result_article',
	    destination_page_url: imgAnchor_img.href,
	    previous_page_url: document.referrer || '',
	    search_query: searchQuery_img,
	    result_position: resultPosition_img,
	    result_title: resultTitle_img,
	    keyword_click: false,
	    tag_click: false,
	    image_click: true
	  });

	  console.log('✅ Image click event fired', {
	    title: resultTitle_img,
	    position: resultPosition_img
	  });

	});
});

function fm_submit_form( id){
    // Get form data
    // alert(id);
    // event.preventDefault();
    // return;
    var form = document.getElementById("form" + id);
    let isValid = true;
    let error_id = "";
    let webform_wrapper_id = ""
    let form_campaign_lead = "";

    //Commented this if condition to apply loader on all forms where loader has been added
    // if (id === '37' || id === '40') {
      const submitBtn = form.querySelector(".button-submit");
      const submitLoading = form.querySelector(".fm-submit-loading");

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      if (submitLoading) {
        submitLoading.style.display = "inline"; // or "flex"
      }
    // }

    Array.from(form.elements).forEach((input) => {
        if (input.type === "file") {
            const acceptAttr = input.getAttribute("accept");
            if (acceptAttr) {
                const allowedExts = acceptAttr
                    .split(',')
                    .map(ext => ext.trim().replace(/^\./, '').toLowerCase());
    
                const invalidFiles = [];
                for (const file of input.files) {
                    const ext = file.name.split('.').pop().toLowerCase();
                    if (!allowedExts.includes(ext)) {
                        invalidFiles.push(file.name);
                    }
                }
    
                if (invalidFiles.length > 0) {
                    input.setCustomValidity("Invalid file(s): " + invalidFiles.join(", "));
                    input.reportValidity(); // shows standard HTML error popup
                    isValid = false;
                    return;
                } else {
                    input.setCustomValidity(""); // clear previous errors
                }
            }
        }
    
        if (!input.validity.valid) {
            input.reportValidity(); // Show standard HTML error popup
            isValid = false;

            const submitBtn1 = form.querySelector(".button-submit");
            const submitLoading1 = form.querySelector(".fm-submit-loading");

            // if (id === '37' || id === '40') {
              if (submitBtn1) {
                submitBtn1.disabled = false;
              }

              if (submitLoading1) {
                submitLoading1.style.display = "none"; // or "flex"
              }
            // }

            return;
        }
    
        if(input.name == 'error_id'){
            error_id = input.value
        }

        if(input.name == 'form_campaign_lead'){
            form_campaign_lead = input.value
        }

        if (input.name == 'webform_ajax_wrapper_id') {
            webform_wrapper_id = input.value;
        }
    });
    if (isValid) {
        event.preventDefault();
        var formData = new FormData(form);
        // Create XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        // Set up the AJAX request
        xhr.open("POST", "/webform-api", true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Set onload and onerror callbacks
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Replace form with response message
                const responseText = JSON.parse(xhr.responseText);
                const command = responseText[0].command;
                if (command == 'insert') {
                    const html_message = responseText[0].html_message;
                    
                    if(responseText[0].success == "1") {
                        document.querySelector("#"+webform_wrapper_id).innerHTML = html_message;
                    }else {
                        document.querySelector("#"+error_id).innerHTML = html_message;
                    }          
                    
                    const wrapper = document.querySelector("#" + webform_wrapper_id);
                    const scripts = wrapper.querySelectorAll("script");
                    scripts.forEach(script => {
                        const newScript = document.createElement("script");
                        if (script.src) {
                            newScript.src = script.src;
                            newScript.async = false; // Maintain execution order
                            document.head.appendChild(newScript);
                        } else {
                            newScript.textContent = script.textContent;
                            document.body.appendChild(newScript);
                        }
                    });
                } else if (command == 'redirect') {
                    const url = responseText[0].url;
                    const delay = responseText[0].delay;
                    window.location = url;
                }

                // if (typeof createDatalayerFormSubmitEvent === "function") {
                    datalayerFormSubmitEvent(form, form_campaign_lead); //Runs only if function exists
                // }

            } else {
                // Handle error
                alert("We encountered an error while processing your form submission. Please try again later.")
                console.error('Error: ' + xhr.statusText);
            }
        };
        xhr.onerror = function() {
            // Handle error
            alert("We encountered an error while processing your form submission. Please try again later.")
            console.error('Error: ' + xhr.statusText);
        };
        // Send the AJAX request with form data
        xhr.send(formData);
   }
   
}

function datalayerFormSubmitEvent(form, form_campaign_lead) {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Validate input before pushing
    if (typeof form_campaign_lead === "string" && form_campaign_lead.trim() !== "") {
        window.dataLayer.push({
            event: form_campaign_lead,
        });
        console.log(`DataLayer event '${form_campaign_lead}' pushed successfully.`);
    } else {
        window.dataLayer.push({
            event: "lead_submitted",
        });
    }
}

function populateEventIdFromUrl() {
    // Get the current URL
    const url = window.location.href;

    // Define the pattern to look for (program/{id})
    const pattern = /program\/(\d+)/;

    // Check if the pattern exists in the URL
    const match = url.match(pattern);

    if (match) {
        // Extract the ID from the match result
        const id = match[1];

        // Find all input elements with the name 'event_id'
        const inputs = document.querySelectorAll('input[name="event_id"]');

        // Populate each input with the extracted ID
        inputs.forEach(input => {
            input.value = id;
        });
    }

    // Find source field
    const courseTypeField = document.querySelector(
        'input[type="hidden"][name="course_type_id"]'
      );
      if (!courseTypeField) return;

      const courseTypeValue = courseTypeField.value;
      if (!courseTypeValue) return;

      // Find destination field
      const mctypeField = document.querySelector(
        'input[type="hidden"][name="mctype"]'
      );
      if (!mctypeField) return;

      // Set value
      mctypeField.value = courseTypeValue;

      console.log('mctype set from course_type_id:', courseTypeValue);

    const courseNameHeading = document.querySelector('h1.course-name');
      if (!courseNameHeading) return;

      const courseNameValue = courseNameHeading.textContent.trim();
      if (!courseNameValue) return;

      // Find destination hidden field
      const programNameField = document.querySelector(
        'input[type="hidden"][name="program-name"]'
      );
      if (!programNameField) return;

      // Set value
      programNameField.value = courseNameValue;

      console.log('program-name set from course-name:', courseNameValue);


}
document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll(".fm-form");
  
    forms.forEach((form) => {
      const fileInputs = form.querySelectorAll("input[type='file']");
  
      fileInputs.forEach((input) => {
        input.addEventListener("change", function () {
          const spanId = input.id + "-selected";
          const span = document.getElementById(spanId);
  
          if (!span) return;
  
          const acceptAttr = input.getAttribute("accept");
          const allowedExts = acceptAttr
            ? acceptAttr.split(",").map(ext => ext.trim().replace(/^\./, "").toLowerCase())
            : [];
  
          const invalidFiles = [];
  
          for (const file of input.files) {
            const ext = file.name.split(".").pop().toLowerCase();
            if (!allowedExts.includes(ext)) {
              invalidFiles.push(file.name);
            }
          }
  
          if (input.files.length > 0) {
            const fileNames = Array.from(input.files).map(file => file.name).join(", ");
            span.textContent = fileNames;
          } else {
            span.textContent = "No files selected";
          }
  
          // Highlight error if needed
          if (invalidFiles.length > 0) {
            span.classList.add("file-error");
            input.setCustomValidity("Invalid file type: " + invalidFiles.join(", "));
            input.reportValidity();
          } else {
            span.classList.remove("file-error");
            input.setCustomValidity("");
          }
        });
      });
    });
  });
  
  

document.addEventListener('DOMContentLoaded', function() {
    populateEventIdFromUrl();


document.querySelectorAll('.form_count').forEach(row => {
    if (row.innerHTML.includes('{count}')) {
        const formNumber = row.closest('form').id.match(/\d+/)[0];

        fetch('https://www.artofliving.org/webform-counts/' + formNumber + "?t=" + Math.floor(Date.now() / 1000))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                row.innerHTML = row.innerHTML.replace(/{count}/g, data.count);
                row.style.visibility = 'visible'; // Make the row visible
            })
    }
  });

    // Helper to set value only if empty
function setFieldValueIfEmpty(name, value) {
    const fields = document.querySelectorAll(`input[name="${name}"]`);

    fields.forEach(field => {
        if (!field.value && value !== null && value !== '') {
            field.value = value;
        }
    });
}

function setFieldSmart(name) {
    const fields = document.querySelectorAll(`input[name="${name}"]`);

    if (!fields.length) return;

    const urlValue = hasCustomUTMParameters(window.location.href, name);

    // Find first existing value from fields
    let existingValue = null;

    fields.forEach(field => {
        if (field.value) {
            existingValue = field.value;
        }
    });

    fields.forEach(field => {
        // Priority 1: URL value
        if (urlValue) {
            if (!field.value) {
                field.value = urlValue;
            }
        }
        // Priority 2: Existing field value
        else if (existingValue) {
            if (!field.value) {
                field.value = existingValue;
            }
        }
        // else: leave empty
    });
}

// UTM fields list
[
    'utm_ref',
    'utm_source', 
    'utm_medium', 
    'utm_campaign', 
    'utm_id', 
    'utm_content', 
    'utm_term', 
    'utm_source_platform', 
    'crm-category', 
    'fbclid', 
    'gl', 
    'client_id', 
    'lead_id', 
    'account_id', 
    'campaign_id', 
    'campaign_name', 
    'ad_group_id', 
    'creative_id', 
    'keyword_text', 
    'keyword_match_type', 
    'search_term', 
    'adset_id', 
    'adset_name', 
    'ad_id', 
    'ad_name', 
    'ad_group_name', 
    'network', 
    'device'
].forEach(setFieldSmart);

// Loop through all UTM fields
// utmFields.forEach(param => {
//     const value = hasCustomUTMParameters(window.location.href, param);
//     setFieldValueIfEmpty(param, value);
// });


// Special handling for utm_ref
(function () {
    const fields = document.querySelectorAll('input[name="utm_ref"]');

    if (!fields.length) return;

    let currentUrl = window.location.href;
    let _fbp = getCookie("_fbp");
    let _fbc = getCookie("_fbc");
    let _ga = getCookie("_ga");
    let _ga_94LL2PDDSQ = getCookie("_ga_94LL2PDDSQ");

    let url = new URL(currentUrl);

    if (_fbp) url.searchParams.set("_fbp", _fbp);
    if (_fbc) url.searchParams.set("_fbc", _fbc);

    if (_ga) {
        _ga = _ga.replace("GA1.1.", "");
        url.searchParams.set("_ga", _ga);
    }

    if (_ga_94LL2PDDSQ) {
        let match = _ga_94LL2PDDSQ.match(/s(\d+)/);
        let firstTimestamp = match ? match[1] : null;

        if (firstTimestamp) {
            url.searchParams.set("_ga_94LL2PDDSQ", firstTimestamp);
        }
    }

    const finalValue = url.toString();

    fields.forEach(field => {
        if (!field.value) {
            field.value = finalValue;
        }
    });

})();


    //Prefill form starts
    // Function to parse query parameters from a URL
    function getQueryParams(url) {
        let params = {};
        let parser = new URL(url);
        for (let pair of parser.searchParams.entries()) {
          let match = pair[0].match(/^form\[(.+)\]$/);
          if (match) {
            params[match[1]] = pair[1];
          }
        }
        return params;
      }
      
    // Function to fill form fields with values from query parameters
    function fillFormFields(params) {
        console.log("fill", params)
        for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    field.checked = true;
                } else {
                    field.value = params[key];
                }
            }
        }
        }
    }
    
    let url = window.location.href;
    
    // Extract and fill form fields
    let queryParams = getQueryParams(url);
    fillFormFields(queryParams);
    
    //Prefill form ends
});

function hasCustomUTMParameters(url, param_name) {
    // Parse the URL
    var urlParams = new URLSearchParams(new URL(url).search);
    var paramValue = '';
    // Check if any UTM parameter is present in the URL
    if (urlParams.has(param_name)) {
        if(urlParams.get(param_name) !== ''){
            paramValue = urlParams.get(param_name)
        }
    }
    return paramValue;
}


function set_default(id, j)
{
	for(k=0; k<100; k++)
		if(document.getElementById(id+"_elementform_id_temp"+k))
			if(!document.getElementById(id+"_elementform_id_temp"+k).checked)
				document.getElementById(id+"_elementform_id_temp"+k).removeAttribute("checked");
			else
				document.getElementById(id+"_elementform_id_temp"+j).setAttribute("checked", "checked");
	
	if(document.getElementById(id+"_other_inputform_id_temp"))
	{
		document.getElementById(id+"_other_inputform_id_temp").parentNode.removeChild(document.getElementById(id+"_other_brform_id_temp"));
		document.getElementById(id+"_other_inputform_id_temp").parentNode.removeChild(document.getElementById(id+"_other_inputform_id_temp"));
	}
}

function getFbCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('input[name="has_learn_kriya[0]"]');
    const submitBtn = document.querySelector('.button-submit');

    if (!checkbox || !submitBtn) return;

    // Initial state
    submitBtn.disabled = !checkbox.checked;

    // Enable/disable on change
    checkbox.addEventListener('change', function () {
        submitBtn.disabled = !this.checked;
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelectorAll('.wdform-page-button').forEach(function(button) {
//         button.addEventListener('click', function(event) {
//             const buttonId = event.target.id;
//             const parent = event.target.closest('.wdform-page-and-images');
//             if (parent) {
//                 //const current = parent.querySelector('.wdform-page.visible');
//                 let target;

//                 const formFields = parent.querySelectorAll('input, textarea, select');
//                 let valid = true;

//                 formFields.forEach(field => {
//                     if (field.checkValidity()) {
//                         //alert('sucess');
//                     } else {
//                         //Validate Form
//                         field.reportValidity();
//                         valid = false;
//                     }

//                 });
//                 if (valid) {
//                     if (buttonId.includes('next')) {
//                         target = parent.nextElementSibling;
//                     } else if (buttonId.includes('previous')) {
//                         target = parent.previousElementSibling;
//                     }
                    
//                     if (target) {
//                         parent.style.display = "none";
                        
//                         target.style.display = "block";
//                     }
//                 }
//             }
//         });
//     });
// });

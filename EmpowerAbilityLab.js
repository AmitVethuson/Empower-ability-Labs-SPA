//Template Function that can be used to run JavaScript on the page
//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like

// ------------------------------- Routing---------------------------------




//initialize the page functions:
function initPageFunctions(pathname) {
  // If the current page is the Schedule a Call page, initialize its functions
  if (pathname === "/schedule-a-call") {
    setupScheduleACallPage();
  }
  //inject the page data to the 
  document.getElementById("root").innerHTML = getPage;
  document.title = selectRoute.title;
  document.querySelector(`meta[name="description"]`).setAttribute("content", selectRoute.description);
  document.getElementById("root").focus()
}

// //check for change
// window.onpopstate = RouteHandler;
window.onload = function () {
  openTab(null, 'Home');
};

//----------------------- Homepage------------------------------



document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById('toggleElement');
  element.style.display = 'none';
});

function toggleVisibility() {
  var element = document.getElementById('toggleElement');
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

function openModal() {
  document.getElementById('myModal').style.display = 'block';
  document.getElementById('closeModelButton').focus();
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}


window.onclick = function (event) {
  var modal = document.getElementById('myModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// ------------------------------------------------------------




//----------------------Handle hamberger menu---------------------------
function navBarToggler() {
  const navbarCollapse = document.getElementById('navbarItems');
  const navTogglerbutton = document.getElementById('navigationToggle');
  var isExpanded = navTogglerbutton.getAttribute('aria-expanded');
  //toggle aria-expanded
  if (isExpanded === "true") {
    isExpanded = "false"
  } else {
    isExpanded = "true"
  }
  navbarCollapse.classList.toggle('collapsed');
  navTogglerbutton.setAttribute('aria-expanded', isExpanded);

}

function getNavbarToggleState() {
  const navbarCollapse = document.getElementById("navbarItems");
  return navbarCollapse.classList.contains('collapsed')

}
//------------------------------------------------------------------

// ------------------------------- Schedule a Call ---------------------------------
function setupSwitchInput() {
  const switchContainer = document.querySelector(".switch");
  const checkbox = document.getElementById("emailUpdates");
  const statusMessage = document.getElementById("emailUpdatesStatus");

  function updateStatus() {
    const state = checkbox.checked ? "on" : "off";
    statusMessage.textContent = `Receive emails about updates and services ${state}`;
    switchContainer.setAttribute("aria-checked", checkbox.checked.toString());
  }

  if (switchContainer) {
    switchContainer.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      updateStatus();
    });

    switchContainer.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling when using Space
        checkbox.checked = !checkbox.checked;
        updateStatus();
      }
    });

    // Initialize the status message when the page loads
    updateStatus();
  }
}



function toggleSwitch(checkbox) {
  const switchContainer = checkbox.closest('.switch');
  const isChecked = checkbox.checked;

  // Update the aria-checked attribute
  switchContainer.setAttribute("aria-checked", isChecked.toString());

  // Update the visual state of the switch
  switchContainer.classList.toggle("switch-on", isChecked);
}


function switchKeyDown(event) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    toggleSwitch(this);
  }
}

function setupPhoneNumberInput() {
  const phoneNumberInput = document.getElementById("phoneNumber");
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener("input", function (event) {
      let value = event.target.value;
      value = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
      let formattedNumber = "";

      // Format the number with dashes
      for (let i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
          formattedNumber += "-"; // Add a dash after 3rd and 6th digits
        }
        formattedNumber += value[i];
      }

      // Limit to 12 characters (3 digits - 3 digits - 4 digits)
      formattedNumber = formattedNumber.substring(0, 12);

      event.target.value = formattedNumber;
    });
  }
}
function updateCheckboxLabel(checkbox) {
  var checkboxDescription = checkbox.nextSibling.textContent.trim();
  checkbox.setAttribute(
    "aria-label",
    checkboxDescription + (checkbox.checked ? " selected" : " unselected")
  );
}

function setupScheduleACallPage() {
  setupSwitchInput();
  const inviteSpeakerCheckbox = document.getElementById("inviteSpeaker");
  const eventDetailsContainer = document.getElementById(
    "eventDetailsContainer"
  );

  if (inviteSpeakerCheckbox && eventDetailsContainer) {
    eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked
      ? "block"
      : "none";

    inviteSpeakerCheckbox.addEventListener("change", function () {
      eventDetailsContainer.style.display = this.checked ? "block" : "none";
    });
  } else {
    console.error("One or more elements are missing on the page.");
  }
  // Set up phone number input
  setupPhoneNumberInput();

  const scheduleCallForm = document.getElementById("scheduleCallForm");
  if (scheduleCallForm) {
    scheduleCallForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("The form element is missing on the page.");
  }

  // Attach event listener to close the modal
  const closeModalButton = document.getElementById("closeModal");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      const successModal = document.getElementById("successModal");
      successModal.style.display = "none";

      // Return focus to the submit button or another appropriate element
      document.getElementById("submitBtn").focus();
    });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const businessName = document.getElementById("businessName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const submissionMessage = document.getElementById("submissionMessage"); // Message element for feedback

  // Validation checks
  if (!businessName || !phoneNumber || !email) {
    submissionMessage.textContent = "Please fill in all required fields.";
    submissionMessage.style.color = "red"; // Or any color for error messages
    return;
  }

  const inviteSpeakerChecked = document.getElementById("inviteSpeaker").checked;
  const eventDetails = document.getElementById("eventDetails").value.trim();

  if (inviteSpeakerChecked && !eventDetails) {
    submissionMessage.textContent = "Please provide event details.";
    submissionMessage.style.color = "red"; // Or any color for error messages
    return;
  }

  simulateFormSubmission(businessName, phoneNumber, email, eventDetails);
}


function simulateFormSubmission(
  businessName,
  phoneNumber,
  email,
  eventDetails
) {
  // Simulate an AJAX request
  const submissionMessage = document.getElementById("submissionMessage"); // Message element for feedback

  console.log("Submitting form...");
  console.log(`Business Name: ${businessName}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Email: ${email}`);
  console.log(`Event Details: ${eventDetails}`);

  // Simulate a successful submission
  setTimeout(() => {
    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const closeModalButton = document.getElementById("closeModal");

    successMessage.textContent =
      "Your call has been scheduled! We will get back to you soon.";
    successModal.style.display = "block";

    // Focus on the close button in the modal
    closeModalButton.focus();

    document.getElementById("scheduleCallForm").reset();
  }, 1000);
}
// Event listener to close the modal
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("successModal").style.display = "none";
});
window.addEventListener("load", setupScheduleACallPage);
// ------------------------------- schedule a call ends---------------------------------



//Note: This can be changed to whatever JavaScript formatting you would like

//----------Nav tabs-----------------------
function openTab(evt, tabName) {

  var i, tabcontent, tablinks;
  document.title = tabName;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  if (!evt || window.location.hash !== '#' + tabName) {
    history.pushState({ tabName: tabName }, '', '#' + tabName);
  }
  const navbarCollapseState = getNavbarToggleState();
  if (navbarCollapseState === true) {
    navBarToggler()
  }
}

// Event listener for handling browser navigation
window.addEventListener('popstate', function (event) {
  if (event.state && event.state.tabName) {
    // Manually open the tab without pushing a new state
    var tabToOpen = document.querySelector(`.tablinks[onclick*='${event.state.tabName}']`);
    if (tabToOpen) {
      openTab({ currentTarget: tabToOpen }, event.state.tabName);
    }
  } else if (!event.state && window.location.hash) {
    // Handle direct URL access with a hash
    var hash = window.location.hash.replace('#', '');
    var tabToOpen = document.querySelector(`.tablinks[onclick*='${hash}']`);
    if (tabToOpen) {
      openTab({ currentTarget: tabToOpen }, hash);
    }
  }
});

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Add keyboard accessibility
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    var srcElement = event.srcElement;
    if (srcElement.classList.contains('tablinks')) {
      openTab(event, srcElement.textContent);
    }
  }
});




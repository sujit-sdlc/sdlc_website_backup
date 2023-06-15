var isCookiesYesAccepted = false;

window.getCookie = function(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

function checkIfCookiesYesIsAccepted() {
  try {
    getCookie('cookieyes-consent').split(",").forEach(item => {
        var keyval = item.split(":");
        console.log(keyval)
        if(keyval[0].indexOf("consent") > -1 && keyval[1] == "yes") {
            isCookiesYesAccepted = true;
        }
    })
  }
  catch(ex) {
    console.log(ex);
  }
  return isCookiesYesAccepted;
}
 

// Generate a unique user ID
function generateUserID() {
  return Math.random().toString(36).substr(2, 15);
}

// Function to track user journey
function trackUserJourney() {

  if(!checkIfCookiesYesIsAccepted()) return false;

  // Check if user ID is already stored in local storage
  let userID = localStorage.getItem('userID');
  if (!userID) {
    // Generate a new user ID and store it in local storage
    userID = generateUserID();
    localStorage.setItem('userID', userID);
  }

  // Check if session start time is already stored in local storage
  const sessionStartTime = localStorage.getItem('sessionStartTime');
  if (!sessionStartTime) {
    // Store the session start time in local storage
    localStorage.setItem('sessionStartTime', new Date().getTime().toString());
  }

  // Increment visit count
  let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
  visitCount++;
  localStorage.setItem('visitCount', visitCount.toString());

  // Track referring website URL
  const referrerURL = document.referrer;
  localStorage.setItem('referrerURL', referrerURL);

  // Track page visits and time on each page
  const pageVisits = JSON.parse(localStorage.getItem('pageVisits')) || [];
  const currentPage = window.location.href;
  const visitTime = new Date().getTime().toString();
  pageVisits.push({ page: currentPage, time: visitTime });
  localStorage.setItem('pageVisits', JSON.stringify(pageVisits));

  // Track user clicks event on elements
  const trackClickEvent = (event) => {
    const clickedElement = event.target.tagName;
    // Add your logic to track specific elements if needed
    console.log('Clicked Element:', clickedElement);
  };
  document.addEventListener('click', trackClickEvent);
}

// Function to send tracking data to backend URL
// Function to send tracking data to the backend URL
function sendDataToBackend() {
  const userID = localStorage.getItem('userID');
  const sessionStartTime = localStorage.getItem('sessionStartTime');
  const sessionEndTime = new Date().getTime().toString();
  const referrerURL = localStorage.getItem('referrerURL');
  const pageVisits = JSON.parse(localStorage.getItem('pageVisits'));
  const visitCount = localStorage.getItem('visitCount');

  const trackingData = {
    userID,
    sessionStartTime,
    sessionEndTime,
    referrerURL,
    pageVisits,
    visitCount
  };

  // Replace 'backend-url' with the AJAX endpoint provided by WordPress
  const ajaxUrl = '/wp-admin/admin-ajax.php';
  
  fetch(ajaxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'track_user_journey',
      tracking_data: JSON.stringify(trackingData)
    })
  })
    .then(response => {
      if (response.ok) {
        console.log('Tracking data sent successfully');
        // Clear the stored tracking data except for the visit count
        localStorage.removeItem('sessionStartTime');
        localStorage.removeItem('referrerURL');
        localStorage.removeItem('pageVisits');
      } else {
        throw new Error('Failed to send tracking data');
      }
    })
    .catch(error => {
      console.error('Error sending tracking data:', error);
    });
}

// Call the trackUserJourney function when the page loads
window.addEventListener('load', trackUserJourney);

// Call the sendDataToBackend function when the user leaves the page
window.addEventListener('beforeunload', sendDataToBackend);
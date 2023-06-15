jQuery(document).ready(function(){
  var isCookiesYesAccepted = false;

  jQuery('.cky-btn-reject').css({
    position: 'absolute',
    left: '0',
    border: 'none',
    bottom: '-3px',
    'font-size': '10px'
  });

  jQuery('.cky-consent-container .cky-consent-bar').css('padding', '10% 24px');


  jQuery('.cky-btn-reject').text('Reject');
  

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
    var randUniqueNumber = '';
    while (randUniqueNumber.length < 15) {
      randUniqueNumber += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }
    return randUniqueNumber;
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
      const clickedElement = {tagName: event.target.tagName, className: event.target.className, content: event.target.textContent }
      localStorage.setItem("eventClicked", JSON.stringify(clickedElement));
      // Add your logic to track specific elements if needed
      console.log('Clicked Element:', clickedElement);
      sendDataToBackend(); 
    };
    document.addEventListener('click', trackClickEvent);
    sendDataToBackend(); 
  }

  // Function to send tracking data to backend URL
  function sendDataToBackend() {

    if(!checkIfCookiesYesIsAccepted()) return false;

    const userID = localStorage.getItem('userID');
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    const sessionEndTime = localStorage.getItem('sessionEndTime')
    const referrerURL = localStorage.getItem('referrerURL');
    const pageVisits = JSON.parse(localStorage.getItem('pageVisits'));
    const visitCount = localStorage.getItem('visitCount');
    const eventClicked = localStorage.getItem("eventClicked");

    const trackingData = {
      userID,
      sessionStartTime,
      sessionEndTime,
      referrerURL,
      pageVisits,
      visitCount,
      eventClicked
    };

    // Replace 'backend-url' with the actual URL to which you want to send the data
    jQuery.ajax({
      url: ajax_object.ajax_url,
      type: 'POST',
      dataType: 'json',
      data: {
        action: 'custom_track_user_journey',
        trackingData: JSON.stringify(trackingData)
      },
      success: function(response) {
        console.log('Tracking data sent successfully');
        // Clear the stored tracking data except for the visit count
        // localStorage.removeItem('sessionStartTime');
        localStorage.removeItem('referrerURL');
        localStorage.removeItem('eventClicked');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error sending tracking data:', errorThrown);
      }
    });
  }

  function removeDataFromLocalStorage() {
    localStorage.setItem('sessionEndTime', new Date().getTime().toString())
    sendDataToBackend();
    localStorage.removeItem('sessionStartTime');
    localStorage.removeItem('pageVisits');
  } 

  // Call the trackUserJourney function when the page loads
  window.addEventListener('load', trackUserJourney);

  // Call the sendDataToBackend function when the user leaves the page
  //window.addEventListener('beforeunload', sendDataToBackend);
  // Call the sendDataToBackend function when the user leaves the page
  window.addEventListener('beforeunload', removeDataFromLocalStorage);
})


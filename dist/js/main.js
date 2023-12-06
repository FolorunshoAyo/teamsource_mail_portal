"use strict";

var _document$getElementB;
/* Aside & Navbar: dropdowns */

Array.from(document.getElementsByClassName('dropdown')).forEach(function (elA) {
  elA.addEventListener('click', function (e) {
    if (e.currentTarget.classList.contains('navbar-item')) {
      e.currentTarget.classList.toggle('active');
    } else {
      var dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1];
      e.currentTarget.parentNode.classList.toggle('active');
      dropdownIcon.classList.toggle('mdi-plus');
      dropdownIcon.classList.toggle('mdi-minus');
    }
  });
});

/* Aside Mobile toggle */

Array.from(document.getElementsByClassName('mobile-aside-button')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.documentElement.classList.toggle('aside-mobile-expanded');
    dropdownIcon.classList.toggle('mdi-forwardburger');
    dropdownIcon.classList.toggle('mdi-backburger');
  });
});

/* NavBar menu mobile toggle */

Array.from(document.getElementsByClassName('--jb-navbar-menu-toggle')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
    document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('active');
    dropdownIcon.classList.toggle('mdi-dots-vertical');
    dropdownIcon.classList.toggle('mdi-close');
  });
});

/* Modal: open */

Array.from(document.getElementsByClassName('--jb-modal')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    var modalTarget = e.currentTarget.getAttribute('data-target');
    document.getElementById(modalTarget).classList.add('active');
    document.documentElement.classList.add('clipped');
  });
});

/* Modal: close */

Array.from(document.getElementsByClassName('--jb-modal-close')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.modal').classList.remove('active');
    document.documentElement.classList.remove('is-clipped');
  });
});

/* Notification dismiss */

Array.from(document.getElementsByClassName('--jb-notification-dismiss')).forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.currentTarget.closest('.notification').classList.add('hidden');
  });
});

/* More report func. */
(_document$getElementB = document.getElementById("see-more-report")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("click", function (e) {
  var moreReportContainer = document.getElementById("more-report");
  var currTarget = e.currentTarget;
  moreReportContainer.classList.toggle("hidden");
  if (currTarget.lastElementChild.textContent.trim() === "see more") {
    currTarget.lastElementChild.textContent = "see less";
  } else {
    currTarget.lastElementChild.textContent = "see more";
  }
});

/* Multi Form Step Functionality*/
var stepsELs = document.querySelectorAll("form .step");
var progressEls = document.querySelectorAll("ol.progress li");
progressEls = Array.from(progressEls);
stepsELs = Array.from(stepsELs);
function step(step) {
  console.log("Active Step is: ".concat(step));
  var currStep = step - 1;

  // DISABLE ANY PROGRESS EL
  for (var i = 0; i < stepsELs.length; i++) {
    progressEls[i].classList.remove("active");
  }

  // Disable all active steps
  for (var _i = 0; _i < stepsELs.length; _i++) {
    stepsELs[_i].classList.remove("active");
  }

  //Set target step to active
  progressEls[currStep].classList.add("active");
  stepsELs[currStep].classList.add("active");
}
if (document.getElementById("campaign-datetime")) {
  var now = new Date();

  // Set the rounding intervals in minutes (30 for ':30', 60 for ':00')
  var roundingInterval30min = 30;
  var roundingInterval1hr = 60;

  // Calculate the difference to the next rounding interval
  var remainder30min = roundingInterval30min - now.getMinutes() % roundingInterval30min;
  var remainder1hr = roundingInterval1hr - now.getMinutes() % roundingInterval1hr;

  // Determine the appropriate rounding interval
  var roundingInterval = remainder30min < remainder1hr ? roundingInterval30min : roundingInterval1hr;

  // Add the remainder to the current time
  now.setMinutes(now.getMinutes() + remainder30min);
  if (now.getMinutes() === 0) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  }
  var minDate = now.toISOString().split('T')[0];
  var minTime = now.toISOString().slice(11, 16);
  console.log("MinDate: ", minDate);
  console.log("MinTime: ", minTime);

  /* Date and Time Picker Functionality */
  flatpickr("#campaign-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: minDate,
    minTime: minTime
  });
}

/* Tabs functionality */
Array.from(document.querySelectorAll('[id^="tab-"]')).forEach(function (elA) {
  var tabBtns = Array.from(elA.querySelectorAll(".tabs-section ul li a"));
  var tabContent = Array.from(elA.querySelectorAll(".tab-content div[data-tab-content]"));
  console.log(tabBtns);
  console.log(tabContent);
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function (el) {
      var tabBtn = el.currentTarget;
      //// Clear all active tab btns and content
      tabBtns.forEach(function (btn) {
        btn.classList.remove("active");
      });
      tabContent.forEach(function (content) {
        content.classList.remove("active");
      });
      var tabSelected = parseInt(tabBtn.dataset.tabTarget);
      tabBtn.classList.add("active");
      tabContent[tabSelected - 1].classList.add("active");
    });
  });
});
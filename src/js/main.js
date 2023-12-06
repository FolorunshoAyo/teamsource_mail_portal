/* Aside & Navbar: dropdowns */

Array.from(document.getElementsByClassName('dropdown')).forEach(elA => {
  elA.addEventListener('click', e => {
    if (e.currentTarget.classList.contains('navbar-item')) {
      e.currentTarget.classList.toggle('active')
    } else {
      const dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1]

      e.currentTarget.parentNode.classList.toggle('active')
      dropdownIcon.classList.toggle('mdi-plus')
      dropdownIcon.classList.toggle('mdi-minus')
    }
  })
})

/* Aside Mobile toggle */

Array.from(document.getElementsByClassName('mobile-aside-button')).forEach(el => {
  el.addEventListener('click', e => {
    const dropdownIcon = e.currentTarget
        .getElementsByClassName('icon')[0]
        .getElementsByClassName('mdi')[0]

    document.documentElement.classList.toggle('aside-mobile-expanded')
    dropdownIcon.classList.toggle('mdi-forwardburger')
    dropdownIcon.classList.toggle('mdi-backburger')
  })
})

/* NavBar menu mobile toggle */

Array.from(document.getElementsByClassName('--jb-navbar-menu-toggle')).forEach(el => {
  el.addEventListener('click', e => {
    const dropdownIcon = e.currentTarget
        .getElementsByClassName('icon')[0]
        .getElementsByClassName('mdi')[0]

    document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('active')
    dropdownIcon.classList.toggle('mdi-dots-vertical')
    dropdownIcon.classList.toggle('mdi-close')
  })
})

/* Modal: open */

Array.from(document.getElementsByClassName('--jb-modal')).forEach(el => {
  el.addEventListener('click', e => {
    const modalTarget = e.currentTarget.getAttribute('data-target')

    document.getElementById(modalTarget).classList.add('active')
    document.documentElement.classList.add('clipped')
  })
});

/* Modal: close */

Array.from(document.getElementsByClassName('--jb-modal-close')).forEach(el => {
  el.addEventListener('click', e => {
    e.currentTarget.closest('.modal').classList.remove('active')
    document.documentElement.classList.remove('is-clipped')
  })
})

/* Notification dismiss */

Array.from(document.getElementsByClassName('--jb-notification-dismiss')).forEach(el => {
  el.addEventListener('click', e => {
    e.currentTarget.closest('.notification').classList.add('hidden')
  })
})

/* More report func. */
document.getElementById("see-more-report")?.addEventListener("click", function (e){
  const moreReportContainer = document.getElementById("more-report");
  const currTarget = e.currentTarget;

  moreReportContainer.classList.toggle("hidden");

  if(currTarget.lastElementChild.textContent.trim() === "see more"){
    currTarget.lastElementChild.textContent = "see less";
  }else{
    currTarget.lastElementChild.textContent = "see more";
  }
})


/* Multi Form Step Functionality*/
let stepsELs = document.querySelectorAll("form .step");
let progressEls = document.querySelectorAll("ol.progress li");

progressEls = Array.from(progressEls);
stepsELs = Array.from(stepsELs);

function step(step){
  console.log(`Active Step is: ${step}`);

  let currStep = step - 1;

  // DISABLE ANY PROGRESS EL
  for(let i = 0; i < stepsELs.length; i++){
    progressEls[i].classList.remove("active");
  }

  // Disable all active steps
  for(let i = 0; i < stepsELs.length; i++){
    stepsELs[i].classList.remove("active");
  }

  //Set target step to active
  progressEls[currStep].classList.add("active");
  stepsELs[currStep].classList.add("active");
}

if(document.getElementById("campaign-datetime")){
  const now = new Date();

  // Set the rounding intervals in minutes (30 for ':30', 60 for ':00')
  const roundingInterval30min = 30;
  const roundingInterval1hr = 60;

  // Calculate the difference to the next rounding interval
  const remainder30min = roundingInterval30min - (now.getMinutes() % roundingInterval30min);
  const remainder1hr = roundingInterval1hr - (now.getMinutes() % roundingInterval1hr);

  // Determine the appropriate rounding interval
  const roundingInterval = (remainder30min < remainder1hr) ? roundingInterval30min : roundingInterval1hr;

  // Add the remainder to the current time
  now.setMinutes(now.getMinutes() + remainder30min);

  if (now.getMinutes() === 0) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  }

  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toISOString().slice(11, 16);

  console.log("MinDate: ", minDate);
  console.log("MinTime: ", minTime);

  /* Date and Time Picker Functionality */
  flatpickr("#campaign-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate,
    minTime
  });
}

/* Tabs functionality */
Array.from(document.querySelectorAll('[id^="tab-"]')).forEach(elA => {
  const tabBtns = Array.from(elA.querySelectorAll(".tabs-section ul li a"));
  const tabContent = Array.from(elA.querySelectorAll(".tab-content div[data-tab-content]"));

  console.log(tabBtns);
  console.log(tabContent);

  tabBtns.forEach(btn => {
    btn.addEventListener("click", function (el){
      const tabBtn = el.currentTarget;
      //// Clear all active tab btns and content
      tabBtns.forEach((btn) => {
        btn.classList.remove("active");
      });

      tabContent.forEach((content) => {
        content.classList.remove("active");
      });

      const tabSelected = parseInt(tabBtn.dataset.tabTarget);

      tabBtn.classList.add("active");
      tabContent[tabSelected - 1].classList.add("active");
    });
  });
})
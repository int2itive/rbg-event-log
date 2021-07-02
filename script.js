var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */
  let content = document.querySelectorAll(".content");
  let tabs = document.querySelectorAll(".tab");
  const triggers = document.querySelectorAll('label');
  const main = document.querySelector('.rbg-header');
  const [content2, tabs2, triggers2] = ['.content', '.tab', 'label']
    .map(nodes => document.querySelectorAll(nodes));

  const lookupName = "Griot Chinyere";
  var hiddenState = "-hidden", nav_dark = "page-header";
  var threshold = 30, position = 0, lastScroll = 0, n_event = 0;
  let ttlapps = 0;
  const apps = [], fullNameList = [], years_every = [];
  

  for (var l = 0; l < triggers.length; l++) {
    yearVal = triggers[l].querySelector('p').textContent;
    years_every[l] = yearVal;
  }
  
  window.addEventListener("scroll", function () {
    var position = window.scrollY || document.documentElement.scrollTop;
    
    if (position > threshold && position > lastScroll) {
      main.classList.add(hiddenState);
    } else {
      main.classList.remove(hiddenState);
      if (window.scrollY > 40) {
        main.classList.add(nav_dark);
      } else {
        main.classList.remove(nav_dark);
      }
    }

    lastScroll = position <= 0 ? 0 : position;

  });
  // returns undefined
  //const { lead_performer: lead } = perfdata; console.log(lead);

  perfdata.forEach(function(evnt) {
    var d = evnt.event_date.substr(6);
    const {lead_performer, guests} = evnt;
    const lineup = [lead_performer, ...guests];
      // Push each performer name into master appearance array
      for (var y = 0; y < lineup.length; y++) { 
        if (fullNameList.indexOf(lineup[y]) == -1) {
          fullNameList.push(lineup[y]);
        }
      }

    if (d == years_every[0]) { n_event += 1 }

    if (evnt.lead_performer == lookupName || evnt.guests.indexOf(lookupName) != -1) {
      var g = evnt.guests.indexOf(lookupName);
      ttlapps += 1;
      apps.push(`${evnt.month} ${evnt.event_date.substring(0,2)}, ${evnt.event_date.substr(6)}`);

      if (g == -1) {
        apps[ttlapps-1] += "*";
      }
    }
  });
  
  const {feature_story: {theme}, guests } = perfdata[1];
  const { length, 0: first, [length - 1]: last } = perfdata[1].guests;
  // Wes Bos alternative - const {theme} = perfdate[0].feature_story;
  console.log( `%c ${theme}`, 'font-size: 2em');
  console.log(`${first}, ${last}`);
  console.log("There were " + n_event + " Events in " + years_every[0]);
  console.log(lookupName + " Has Appeared " + ttlapps + " times.")
  console.log(`First Appeared: ${apps[0].substring(0,apps[0].indexOf("*"))} - Most Recent: ${apps[ttlapps-1]}`)
  console.log(apps);

  const ttl = 0;
  const val = 25;
  const ev_init = 4;

  console.log(`Lead performer at the ${perfdata[val].month}, ${perfdata[val].event_date.substr(6)} Event was ${perfdata[val].lead_performer}`);
  console.log(`    Event Date: ${perfdata[ev_init].month} ${perfdata[ev_init].event_date.substring(0,2)}, ${perfdata[val].event_date.substr(6)}
    Headline Act: ${perfdata[ev_init].lead_performer}
    Theme/Featured Story: ${perfdata[ev_init]["feature_story"]["theme"]}
    Guest Performers: ${perfdata[ev_init].guests.join(', ')}`);

  tabs[0].classList.add("active");

  triggers.forEach(function(tick) {
    tick.addEventListener('click', function(e) {
      var radio = tick.getAttribute('for');
      var n = parseInt(radio.substr(3));
      if (document.getElementById(radio).checked = true) {
        //console.log(radio + " is checked.");
        //console.log(n);
        content.forEach(function(elem) {
          var iter = [].indexOf.call(elem.parentElement.children, elem);
          if((iter+1) === n) {
            content[iter].style.display = "block";
            tabs[iter].classList.add("active");
          }
          else {
            content[iter].style.display = "none";
            tabs[iter].classList.remove("active");
          }
        })
      }
    }, false)    
  });

  const fromHere = document.createElement("div");
  const textinner = `<h4>Details of Event</h4>
  <div class="detail-container">
    <p><strong>Event Date: </strong>${perfdata[ttl].month} ${perfdata[ttl].event_date.substring(0,2)}, ${perfdata[ttl].event_date.substr(6)}</p>
  </div>
  <p><strong>Headline Act: </strong>${perfdata[ttl].lead_performer}</p>
  <p><strong>Theme/Featured Story: </strong>${perfdata[ttl].feature_story["theme"]}</p>
  <p><strong>Guest Performers: </strong>${perfdata[ttl].guests.join(', ')}</p>`;
  fromHere.classList.add('txt--reduced');

  const lstInner = `<h4>Details of Event</h4>
  <ul>
    <li><span><strong>Event Date: </strong></span>${perfdata[ev_init].month} ${perfdata[ev_init].event_date.substring(0,2)}, ${perfdata[val].event_date.substr(6)}</li>
    <li><span><strong>Headline Act: </strong></span>${perfdata[ev_init].lead_performer}</li>
    <li><span><strong>Theme/Featured Story: </strong></span>${perfdata[ev_init].feature_story.theme}</li>
    <li><span><strong>Guest Performers: </strong></span>${perfdata[ev_init].guests.join(', ')}</li>
  </ul>`;
  fromHere.innerHTML = textinner;
  //content[0].appendChild(fromHere);
  content[0].insertBefore(fromHere, content[0].querySelector('.rbg-event-details'));

  function rebirthEventbuild(rbgMember) {
    var evyear = rbgMember.event_date.substr(6);

    for (var l = 0; l < triggers.length; l++) {
      yearVal = triggers[l].querySelector('p').textContent;
      years_every[l] = yearVal;
    }

    if (evyear == "2018") { 
      return `<h4>Details of Event</h4>
  <p><strong>${rbgMember.month}: </strong>${rbgMember.month} ${rbgMember.event_date.substring(0,2)}, ${rbgMember.event_date.substr(6)}</p>
  <p><strong>Headline Act: </strong>${rbgMember.lead_performer}</p>
  <p><strong>Theme/Featured Story: </strong>${rbgMember.feature_story["theme"]}</p>
  <p><strong>Guest Performers: </strong>${rbgMember.guests.join(', ')}</p>`; 
    }

  }

  function rebirthBetabuild(rbgMember) {
    var evyear = rbgMember.event_date.substr(6);

    const guest_app = rbgMember["guests"];
    if (rbgMember.event_date.substr(6) === "2021") {
      //console.log(guest_app.length);
      //const {first_name, last_name} = rbg_master[0];
      //console.log(first_name+last_name);
      var lead = rbgMember.lead_performer;
      rbg_master.forEach(function (rbg) {
        const {first_name, last_name} = rbg;
        if (lead === first_name+last_name) {
          console.log(`${lead} - ${(rbg.previous_year[0].appearances.length > 0 ? rbg.image_ref : 'No Appearances')}`);
        }
      })

    }
    if (evyear == rbgMember.event_date.substr(6)) { 
    return `<h4>Event Details</h4>
  <div class="evt-date-detail">
    <p><strong>${rbgMember.month.toUpperCase()} </strong> </p>
    <p>${rbgMember.month} ${rbgMember.event_date.substring(0,2)}, ${rbgMember.event_date.substr(6)}</p>
  </div>
  <p><strong>Headline Act: </strong>${rbgMember.lead_performer}</p>
  <p><strong>Theme/Featured Story: </strong><br>${rbgMember.feature_story["theme"]}</p>
  <p><strong>Guest Appearances: </strong><br>${rbgMember["guests"].join(', ')}</p>`; 
    }
  }

  content[0].querySelector('.rbg-event-details').innerHTML = `
  <div><h4>Other Events in ${years_every[0]}</h4></div>
    ${perfdata.slice(1,n_event).map(rebirthEventbuild).join('')}
`;

  for (var i = 1; i < content.length; i++) {
    content[i].querySelector('.rbg-event-details').innerHTML = `
    <div><h4>Event Listings for ${years_every[i]}</h4></div>
    ${perfdata.filter(item => item.event_date.substr(6) == years_every[i])
      .map(rebirthBetabuild).join('')}
    `;
  }

});
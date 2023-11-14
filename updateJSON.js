ready = (callback) => {
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
      
  const lookupName = "Sheda of Holda Poetry";
  const mayRoster = ["Alim Kamara", "Yvonne Roberts", "Sheba Montserrat", "Akadi Sankofa", "Lady Esi", "Sola Story"];
  let hiddenState = "-hidden", nav_dark = "page-header";
  let ttlapps = 0;
  let apps = [],fullNameList = [], years_every = [];
  var incr = [];


  var threshold = 30,
      uBound = 7, 
      position = 0, 
      lastScroll = 0, 
      n_event = 0;


  tabs[0].classList.add("active");


function initialiseTabs() {
  for (var l = 0; l < triggers.length; l++) {
    yearVal = triggers[l].querySelector('p').textContent;
    years_every[l] = yearVal;
  }

  triggers.forEach(function(tick) {
    tick.addEventListener('click', function(e) {
      var radio = tick.getAttribute('for');
      var n = parseInt(radio.substr(3));
      if (document.getElementById(radio).checked = true) {
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
}

initialiseTabs();
  
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

  const getRandom = function() {
    var max = 15;
    var min = 1;
    var numRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(numRandom)
    return numRandom;
  }

  function in_array(array, el) {
    for(var i = 0 ; i < array.length; i++) 
      if(array[i] == el) return true;
    return false;
  }
  
  for (let i = 0; i < uBound; i++) {
    // Generate Random number between 1 - 15
    var num = getRandom(); //console.log("Counter "+i+" = : "+num);
    var flag = Array.isArray(incr) && !incr.length;
    // Add number to array if no elements exist
    if (flag) {
      console.log("Array is Empty");
      incr.push(num);
      continue;
    }

    var elemCount = incr.length;
    //console.log(elemCount);

    if(!in_array(incr, num)) {
       incr.push(num); 
       //return rand;
    } else {
      i--;
    }
  }

  // for(var i = 0; i < 9; i++) {
  //   console.log(get_rand(nums));
  // }

  console.log(incr);

  
  // returns undefined
  //const { lead_performer: lead } = perfdata; console.log(lead);
function tryThisAgain() {
  perfdata.forEach(function(evnt) {
    var d = evnt.date.substr(6);
    //var d2 = getInitialDate(evnt.event_date);
    //var d3 = new Date(Date.parse(d2));
    const d4 = new Date(Date.parse(getInitialDate(evnt.date)));
    var [ convertDay, convertMonth, convertYear ] = evnt.date.split("/");
    //var mm = new Date(`${convertYear}, ${convertMonth}, ${convertDay}`);
    //var dd = new Date(`${d2}`);
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // console.log(mm.toLocaleString('en-GB', options));
    // console.log(mm.toLocaleString('en-UK', { month: 'long' }));
    // console.log(mm.toLocaleString('en-UK', { weekday: 'long' }));
    //const {lead_performer, guests} = evnt;
    const { event: {headline, guests} } = evnt;
    const lineup = [headline, ...guests];
      // Push each performer name into master appearance array
      for (var y = 0; y < lineup.length; y++) { 
        if (fullNameList.indexOf(lineup[y]) == -1) {
          fullNameList.push(lineup[y]);
        }
      }

    if (d == years_every[0]) { n_event += 1 }

    if (headline == lookupName || guests.indexOf(lookupName) != -1) {
      var g = guests.indexOf(lookupName);
      ttlapps += 1;
      apps.push(`${evnt.month} ${evnt.date.substring(0,2)}, ${evnt.date.substr(6)}`);
      if (g == -1) {
        apps[ttlapps-1] += "*";
      }
    }
    
  })
}

tryThisAgain();

  mayRoster.forEach(function(artist) {
    const totalShows = perfdata.reduce((total, event) => {
      //console.log(event);
      total = event.event["headline"] == artist || event.event["guests"].indexOf(artist) !== -1 ? total += 1 : total;
      return total;
    }, 0);
    console.log(`${artist} has appeared ${totalShows} times. 
June will be the ${totalShows+1}th appearance.`)
  });

  // const copyToClipboard = (text) =>
    // navigator.clipboard?.writeText && navigator.clipboard.writeText(text);

let qualifiers = mayRoster.reduce(getQualifiers, {});

function getInitialDate(dtarg) {
  let dlarge = swapArrayElements(dtarg.split("/"), 0, 1).join("/");
  return dlarge;
}

/**
* Swap the elements in an array at indexes x and y.
*
* @param (a) The array.
* @param (x) The index of the first element to swap.
* @param (y) The index of the second element to swap.
* @return {Array} The input array with the elements swapped.
*/
function swapArrayElements(a, x, y) {
  if (a.length === 1) return a;
  a.splice(y, 1, a.splice(x, 1, a[y])[0]);
  return a;
};


function getQualifiers(q, qual) {
      let t = 0, sayHer = qual;
      const nameKey = qual.replace(/\s/g, "_");
      const tap = [];
      let tttl, first, last;

      perfdata.forEach(function(ev) {
        if (ev.event["headline"] == qual || ev.event.guests.indexOf(qual) != -1) {
          let guests = ev.event.guests.indexOf(qual);
          t += 1;
          tap.push(`${ev.month} ${ev.date.substring(0,2)}, ${ev.date.substr(6)}`);
          if (guests == -1) {
            tap[t-1] += "*";
          }
        }
      })
      console.log(nameKey);
      //console.log(tap);
      //q["name"] = sayHer;
      q[nameKey] = tap; 
      q[nameKey].name = sayHer;
      console.log(q[nameKey][0]);
      return q  
}

console.log(qualifiers);

for (let key of Object.keys(qualifiers)) {
  k = key.replace(/_/g, " ");;
  //console.log(key);
  console.log(k);
  let player = qualifiers[key]; 
  console.log(player[qualifiers[key].length-1]);
}

  const {event: { theme: title }, guests } = perfdata[1];
  // const {feature_story: {theme}, guests } = perfdata[1];
  // const { length, 0: first, [length - 1]: last } = perfdata[1].guests;
  const { length, 0: first, [length - 1]: last } = perfdata[1].event.guests;
  // Wes Bos alternative - const {theme} = perfdate[0].feature_story;
  console.log( `%c ${title}`, 'font-size: 1.5em; color: firebrick;');
  //console.log(`${first}, ${last}`);
  //console.log("There were " + n_event + " Events in " + years_every[0]);
  console.log(lookupName + " Has Appeared " + ttlapps + " times.")
    // Testing
  // copyToClipboard(`${lookupName} Has Appeared ${ttlapps } times.`);
  console.log(`First Appeared: ${apps[0].substring(0,apps[0].indexOf("*"))} - Most Recent: ${apps[ttlapps-2]}`)
  console.log(apps);

  const ttl = 0;
  const val = 25;
  const ev_init = 4;

  console.log(`Lead performer at the ${perfdata[val].month}, ${perfdata[val].date.substr(6)} Event was ${perfdata[val].lead_performer}`);
  console.log(`    Event Date: ${perfdata[ev_init].month} ${perfdata[ev_init].date.substring(0,2)}, ${perfdata[val].date.substr(6)}
    Headline Act: ${perfdata[ev_init].event["headline"]}
    Theme/Featured Story: ${perfdata[ev_init]["event"]["theme"]["title"]}
    Guest Performers: ${perfdata[ev_init].event.guests.join(', ')}`);

  const fromHere = document.createElement("div");
  const textinner = `<h4>Details of Event</h4>
  <div class="detail-container">
    <p class="rbg-datestring">${perfdata[ttl].month} ${perfdata[ttl].date.substring(0,2)}, ${perfdata[ttl].date.substr(6)}</p>
  </div>
  <p><strong>${perfdata[ttl].event["headline"]}</strong></p>
  <p><strong>Theme/Featured Story: </strong>${perfdata[ttl].event.theme["title"]}</p>
  <p><strong>Guest Performers: </strong>${perfdata[ttl].event.guests.join(', ')}</p>`;
  fromHere.classList.add('txt--reduced');

  const lstInner = `<h4>Details of Event</h4>
  <ul>
    <li>
      <span><strong>Event Date: </strong></span>${perfdata[ev_init].month} ${perfdata[ev_init].date.substring(0,2)}, ${perfdata[val].date.substr(6)}
    </li>
    <li>
      <span><strong>Headline Act: </strong></span>${perfdata[ev_init].event["headline"]}
    </li>
    <li>
      <span><strong>Theme/Featured Story: </strong></span>${perfdata[ev_init].event.theme["title"]}
    </li>
    <li>
      <span><strong>Guest Performers: </strong></span>${perfdata[ev_init].event.guests.join(', ')}
    </li>
  </ul>`;
  fromHere.innerHTML = textinner;
  //content[0].appendChild(fromHere);
  content[0].insertBefore(fromHere, content[0].querySelector('.rbg-event-details'));

  function rebirthEventbuild(rbgMember) {
    var evyear = rbgMember.date.substr(6);

    for (var l = 0; l < triggers.length; l++) {
      yearVal = triggers[l].querySelector('p').textContent;
      years_every[l] = yearVal;
    }

    if (evyear == "2018") { 
      return `<div class="rbg-month-detail">
  <p><strong> </strong><span class="rbg-datestring">${rbgMember.month} ${rbgMember.date.substring(0,2)}, ${rbgMember.date.substr(6)}</span></p>
  <p>Featured Artist: <strong>${rbgMember.event["headline"]}</strong></p>
  <p><strong>Theme/Featured Story: </strong>${rbgMember.event.theme["title"]}</p>
  <p><strong>Guest Performers: </strong>${rbgMember.event.guests.join(', ')}</p></div>`; 
    }

  }

  function rebirthBetabuild(rbgMember) {
    var evyear = rbgMember.date.substr(6);

    const guest_app = rbgMember["event"].guests;
    if (rbgMember.date.substr(6) === "2023") {
      //console.log(guest_app.length);
      //const {first_name, last_name} = rbg_master[0];
      //console.log(first_name+last_name);
      var lead = rbgMember.event["headline"];
      // rbg_master.forEach(function (rbg) {
      //   const {first_name, last_name} = rbg;
      //   if (lead === first_name+last_name) {
      //     console.log(`${lead} - ${(rbg.previous_year[0].appearances.length > 0 ? rbg.image_ref : 'No Appearances')}`);
      //   }
      // })

    }
    if (evyear == rbgMember.date.substr(6)) { 
    return `<div class="rbg-month-detail">
  <div class="evt-date-detail">
    <p><strong>${rbgMember.month.toUpperCase()} </strong> </p>
    <p>${rbgMember.month} ${rbgMember.date.substring(0,2)}, ${rbgMember.date.substr(6)}</p>
  </div>
  <div>
  <p><strong>Headline Act: </strong>${rbgMember.event["headline"]}</p>
  <p><strong>Theme/Featured Story: </strong><br>${rbgMember.event.theme["title"]}</p>
  <p><strong>Guest Appearances: </strong><br>${rbgMember.event.guests.join(', ')}</p>
  </div></div>
  `;
    }
  }

  content[0].querySelector('.rbg-event-details').innerHTML = `
  <div><h4>Other Events in ${years_every[0]}</h4></div>
    ${perfdata.slice(1,n_event).map(rebirthEventbuild).join('')}
`;

  for (var i = 1; i < content.length; i++) {
    content[i].querySelector('.rbg-event-details').innerHTML = `
    <div><h4>Event Listings for ${years_every[i]}</h4></div>
    ${perfdata.filter(item => item.date.substr(6) == years_every[i])
      .map(rebirthBetabuild).join('')}
    `;
  }


});

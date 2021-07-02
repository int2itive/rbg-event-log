var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */ 
  var cp = "current-project"

  const dropdownIcon = () => {
    const dropdown = document.createElement('span');
    dropdown.innerHTML = `<svg width="14px" height="7px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#CDCFD3" fill-rule="nonzero">
          <g id="Group-4" transform="translate(1360.000000, 29.000000)">
              <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
          </g>
      </g>
      </g>
    </svg>`;
    return dropdown;
  }

  const [sidebar, main, input, info] = ['.sidebar', '.rbg-feature', '.input', '.rbg-lead-info']
    .map(node => document.querySelector(node));

  const leaderList = [], apps = [];
  let ttlapps = 0;

  perfdata.forEach(function(evnt) {
    var d = evnt.event_date.substr(6);
    const {lead_performer, guests} = evnt;
    //const lineup = [lead_performer, ...guests];
    // Push each lead performer name into master appearance array
    if (leaderList.indexOf(lead_performer) == -1) {
      leaderList.push(lead_performer);
    }
  });

  //console.log({ leaderList });

  const dropdown = () => {

    //const cns = main.querySelectorAll('div');
    const iplace = createInput();
    const dropdown = showDropdown();
    document.querySelector('.input').appendChild(iplace);
    main.appendChild(dropdown);
  };

  const createInput = () => {
    // Creates the input outline
    //const input = document.createElement("div");
    // input.classList = "input";
    input.addEventListener("click", toggleDropdown);

    // Creates the input placeholder content
    const inputPlaceholder = document.createElement("div");
    inputPlaceholder.classList = "input__placeholder";

    const placeholder = document.createElement("p");
    placeholder.textContent = "Select artist";
    placeholder.classList.add('placeholder')

    // Appends the placeholder and chevron (stored in assets.js)
    inputPlaceholder.appendChild(placeholder);
    inputPlaceholder.appendChild(dropdownIcon());
    //input.appendChild(inputPlaceholder);

    return inputPlaceholder;
  };

  const showDropdown = () => {
    const structure = document.createElement("div");
    structure.classList.add("structure", "hide");

    for (var i = 0; i < leaderList.length; i++) {
      const leaderName = leaderList[i];
      // Following works tho commented out.
      //console.log(`Project Info: ${background_info}`)
      const option = document.createElement("div");
      option.addEventListener("click", () => selectOption(leaderName));
      // option.addEventListener("click", function(leaderName) {
      //   alert(leaderName);
      // });
      option.setAttribute("id", "id"+i);
      const n = document.createElement("h5");
      n.textContent = `${leaderName}`;

      option.appendChild(n);
      structure.appendChild(option);
    }
    
    return structure;
  };

  const toggleDropdown = () => {
    const dropdown = document.querySelector(".structure");
    dropdown.classList.toggle("hide");

    const input = document.querySelector(".input");
    input.classList.toggle("input__active");
  };

  const selectOption = (name) => {
    const text = document.querySelector('.placeholder');
    text.textContent = name;
    text.classList.add('input__selected')
    toggleDropdown();
    //displayFolder(name);
    displayLeader(name);
  };

  console.log(leaderList.length);

  dropdown();

  const displayLeader = (leader) => {

    if(info.querySelector('h3')) {
      // clear the existing information
      info.innerHTML = '';
      // empty the appearances array
      while (apps.length) { apps.pop(); };
      // reset appearances numerical values
      ttlapps = 0;
    }

    rbg_master.forEach(function (rbg) {
      const {first_name, last_name} = rbg;
      if (leader === first_name+last_name) {
        //console.log(`${lead} - ${(rbg.previous_year[0].appearances.length > 0 ? rbg.image_ref : 'No Appearances')}`);
        console.log(`${leader} Has been Selected.`);
        const h = document.createElement('h3');
        let headline = `Details for ${leader}`;
        h.textContent = headline;
        // get details from perfdata records
        perfdata.forEach(function(evnt) {
            var d = evnt.event_date.substr(6);
            const {lead_performer, guests} = evnt;

            if (evnt.lead_performer == leader || evnt.guests.indexOf(leader) != -1) {
              var g = evnt.guests.indexOf(leader);
              ttlapps += 1;
              apps.push(`${evnt.month} ${evnt.event_date.substring(0,2)}, ${evnt.event_date.substr(6)}`);

              if (g == -1) {
                apps[ttlapps-1] += "*";
              }
            }
          }); // end of records section
  console.log(leader + " Has Appeared " + ttlapps + " times.")
  console.log(`First Appeared: ${apps[0].substring(0,apps[0].indexOf("*"))} - Most Recent: ${apps[ttlapps-1]}`)
  console.log(apps);

        //const app_value = showApps(leader);
        //document.querySelector('.rbg-lead-info').appendChild(h);
        info.appendChild(h);

      }
    })
  }

  const showApps = (ln) => {

    if(rbg.previous_year) {
        const l = rbg.previous_year.length;
        const apps = [];
        for (var i = 0; i < l; i++) {
            if(rbg.previous_year[i].appearances !== null) {
                apps[i] = rbg.previous_year[i].appearances.length;    
            }   
        }
        console.log(apps);
        // console.log(apps.reduce(function(a,b){return a + b}));
        console.log(apps.reduce((a,b) => {return a + b}));
    }
  }
  //this from the rebirth card js file...

  // const displayFolder = (folderName) => {
  //    tp = input.querySelector('.placeholder');
  //    alert(folderName)
  //    var { title, description, background_info } = folders["folder"][`${folderName}`][0];
  //    console.log(title);
  // }
  
});

// Saved Client Data
// Faction Ship Types
const factionShips = {
  'Rebel Alliance': ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',
    'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',
    'YT-1300', 'YT-2400', 'Z-95 Headhunter'],
  'Galactic Empire': ['Firespray-31', 'Gozanti-class Cruiser', 'Lambda-class Shuttle', 'Raider-class Corvete', 'TIE Advanced',
    'TIE Aggressor', 'TIE Adv. Prototype', 'TIE Bomber', 'TIE Defender', 'TIE Fighter', 'TIE Interceptor', 'TIE Phantom',
    'TIE Punisher', 'TIE Striker', 'VT-49 Decimator'],
  'Scum and Villainy': ['Aggressor', 'C-ROC Cruiser', 'Firespray-31', 'G-1A Starfighter', 'HWK-290', 'JumpMaster 5000',
    'Kihraxz Fighter', 'Lancer-class Pursuit Craft', 'M3-A Interceptor', 'Protectorate Starfighter', 'Quadjumper',
    'Scurrg H-6 Bomber', 'StarViper', 'Y-wing', 'YV-666', 'Z-95 Headhunter'],
};

// Client Fields
let user;
let faction;
let squadronObj;
const currentPoints = 0;

// Save Squadron
const saveSquadron = async () => {
  const saveObj = {
    user: window.location.search.split('&')[0].split('=')[1],
    squadron: squadronObj,
  };

  const response = await fetch('/saveSquadron', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(saveObj),
  });

  handleResponse(response, 'save');
};

// Function for printing squadron's cards
const printSquadron = () => {
  document.querySelector('#stats').textContent = `Points: ${squadronObj.currentPoints}/${squadronObj.maxPoints}     
  Faction: ${squadronObj.faction}`;

  const squadron = document.querySelector('#squadron');
  squadron.innerHTML = '';
  for (const ship in squadronObj.ships) {
    for (let i = 0; i < squadronObj.ships[ship].count; i++) {
      const div = document.createElement('div');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');

      div.classList.add('ship');

      p1.textContent = `Pilot: ${squadronObj.ships[ship].name}`;
      p2.textContent = `Points: ${squadronObj.ships[ship].points}`

      const btn = document.createElement('button');
      btn.textContent = 'Remove From Squadron';
      btn.addEventListener('click', () => {
        squadronObj.currentPoints -= squadronObj.ships[ship].points;

        if (squadronObj.ships[ship].count > 1) {
          squadronObj.ships[ship].count--;
        } else {
          delete squadronObj.ships[ship];
        }

        printSquadron();
      });

      div.appendChild(p1);
      div.appendChild(p2)
      for (const url in squadronObj.ships[ship].image) {
        const img = document.createElement('img');
        img.src = `/getImage?path=${squadronObj.ships[ship].image[url]}`;
        div.appendChild(img);
      }
      div.appendChild(btn);

      squadron.appendChild(div);
    }
  }
};

// Adds a ship to the local squadron data
const addShip = (_name, _points, _image) => {
  if (!squadronObj.ships[_name]) {
    squadronObj.ships[_name] = {
      name: _name,
      points: _points,
      image: _image,
      count: 1,
    };
  } else {
    squadronObj.ships[_name].count++;
  }

  squadronObj.currentPoints += _points;
  return printSquadron();
};

const handleResponse = async (response, key) => {
  const { status } = response;
  switch (status) {
    // Working
    case 200:
      break;

    // Saving the squadron
    case 204:
      return;

    //
    case 400:
      break;

    case 404:
      break;

    default:
      break;
  }

  const resJSON = await response.json();
  if (status === 200) {
    if (key === 'squadron') {
      squadronObj = resJSON.content;
      faction = squadronObj.faction;
      document.querySelector('#squadronName').textContent += squadronObj.name;

      // Creates Tabs for Ships
      const pilots = document.querySelector('#pilots');
      pilots.innerHTML = '';

      // Info on how to create for in loops
      // https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript
      for (const ship in factionShips[faction]) {
        const div = document.createElement('div');
        const p = document.createElement('p');

        p.textContent = factionShips[faction][ship] + ' V';
        div.classList.add('tab');
        div.id = factionShips[faction][ship].replace(/ /g, '-');
        p.addEventListener('click', () => {
          let ships = div.getElementsByClassName('ship');

          for (let ship in ships){
            console.log(ship);

            if (ships[ship].hidden){
              ships[ship].hidden = false;
            } else {
              ships[ship].hidden = true;
            }
          }
        }); // Functionality for opening tabs of ships

        div.appendChild(p);
        pilots.appendChild(div);
      }

      // Prints the squadron to the screen
      printSquadron();

      // Loads in the faction's pilots if the squadron is loaded in
      const pilotResponse = await fetch(`/getFactionData?faction=${faction}`, {
        method: 'get',
        headers: {
          accept: 'application/json',
        },
      });

      handleResponse(pilotResponse, 'pilots');
    } else if (key === 'pilots') {
      console.log(resJSON.content);

      for (const ship in factionShips[faction]) {
        // Creates a tab reference
        // Info on how to replace all spaces in a string
        // https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match
        const tab = document.getElementById(`${factionShips[faction][ship].replace(/ /g, '-')}`);

        // Special creation function for creating the CR90 Corvette
        if (faction === 'Rebel Alliance' && factionShips[faction][ship] === 'CR90 Corvette') {
          // Creates the base data for the CR90 Corvette
          const div = document.createElement('div');
          div.id = 'CR90-Corvette';
          div.innerHTML = '<p>Ship: CR90 Corvette   Points: 90</p>';

          // Creates a button to add the card to the squadron
          const button = document.createElement('button');
          button.textContent = 'Add To Squadron';
          button.addEventListener('click', () => {
            // Checks if the card will bring the squadrons points above the maximum value
            if (squadronObj.currentPoints + 90 > squadronObj.maxPoints) {
              console.log('Cannot fit into squadron');
              return;
            }

            // Adds the ship to the client's side
            addShip('CR90 Corvette', 90, [resJSON.content[35].image, resJSON.content[36].image]);
          });

          const img1 = document.createElement('img');
          const img2 = document.createElement('img');
          img1.src = `/getImage?path=${resJSON.content[35].image}`;
          img2.src = `/getImage?path=${resJSON.content[36].image}`;

          // Added elements to div
          div.appendChild(button);
          div.appendChild(img1);
          div.appendChild(img2);

          // Adding class and hidden status
          div.classList.add('ship');
          div.hidden = true;

          // Add to the tab
          tab.appendChild(div);
        } else if (faction === 'Galactic Empire' && factionShips[faction][ship] === 'Raider-class Corvete') {
          // Creates the base data for the Raider-class Corvete
          const div = document.createElement('div');
          div.id = 'Raider-class-Corvete';
          const cost = resJSON.content[49].points + resJSON.content[50].points;
          div.innerHTML = `<p>Ship: Raider-class Corvete   Points: ${cost}</p>`;

          // Creates a button to add the card to the squadron
          const button = document.createElement('button');
          button.textContent = 'Add To Squadron';
          button.addEventListener('click', () => {
            // Checks if the card will bring the squadrons points above the maximum value
            if (squadronObj.currentPoints + cost > squadronObj.maxPoints) {
              console.log('Cannot fit into squadron');
              return;
            }

            // Adds the ship to the client's side
            addShip('Raider-class Corvete', cost, [resJSON.content[49].image, resJSON.content[50].image]);
          });

          const img1 = document.createElement('img');
          const img2 = document.createElement('img');
          img1.src = `/getImage?path=${resJSON.content[49].image}`;
          img2.src = `/getImage?path=${resJSON.content[50].image}`;

          // Adds children to the div
          div.appendChild(button);
          div.appendChild(img1);
          div.appendChild(img2);

          // Adds classes and hidden status
          div.classList.add('ship');
          div.hidden = true;

          // Appends to the tab
          tab.appendChild(div);
        } else {
          const filtered = resJSON.content.filter((x) => x.ship === factionShips[faction][ship]);
          for (const pilot in filtered) {
            const div = document.createElement('div');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');

            p1.textContent = `Pilot: ${filtered[pilot].name}`;
            p2.textContent = `Points: ${filtered[pilot].points}`;

            div.id = filtered[pilot].name;

            // Creates a button to add the card to the squadron
            const button = document.createElement('button');
            button.textContent = 'Add To Squadron';
            button.addEventListener('click', () => {
              // Checks if the card will bring the squadrons points above the maximum value
              if (squadronObj.currentPoints + filtered[pilot].points > squadronObj.maxPoints) {
                console.log('Cannot fit into squadron');
                return;
              }

              // Adds the ship to the client's side
              addShip(filtered[pilot].name, filtered[pilot].points, [filtered[pilot].image]);
            });

            const img = document.createElement('img');
            img.src = `/getImage?path=${filtered[pilot].image}`;

            // Add elements to the div
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(img);
            div.appendChild(button);

            // Add class and hidden status
            div.classList.add('ship');
            div.hidden = true;

            // Add div to the tab
            tab.appendChild(div);
          }
        }
      }
    }
  } else if (status === 201) {
    console.log(resJSON.message);
  } else if (status === 400) {
    console.log(resJSON.message);
  }
};

// Get Function To Return to the Homepage

const init = async () => {
  const squadronResponse = await fetch(`/getSquadronInfo${window.location.search}`, {
    method: 'get',
    headers: {
      'content-type': 'application:x-www-form-urlencoded',
      accept: 'application/json',
    },
  });

  document.querySelector('#save').addEventListener('click', saveSquadron);

  handleResponse(squadronResponse, 'squadron');

  // Set up Return to Homepage Button
  const returnBtn = document.querySelector('#home');
  returnBtn.addEventListener('click', () => { window.location.href = '/'; });
};

window.onload = init;

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/editorClient.js":
/*!********************************!*\
  !*** ./client/editorClient.js ***!
  \********************************/
/***/ (() => {

eval("// Saved Client Data\n// Faction Ship Types\nconst factionShips = {\n  'Rebel Alliance': ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',\n    'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',\n    'YT-1300', 'YT-2400', 'Z-95 Headhunter'],\n  'Galactic Empire': ['Firespray-31', 'Gozanti-class Cruiser', 'Lambda-class Shuttle', 'Raider-Class Corvete', 'TIE Advanced', \n    'TIE Aggressor', 'TIE Adv. Prototype', 'TIE Bomber', 'TIE Defender', 'TIE Fighter', 'TIE Interceptor', 'TIE Phantom',\n    'TIE Punisher', 'TIE Striker', 'TIE/fo Fighter', 'TIE/sf Fighter', 'Upsilon-class Shuttle', 'VT-49 Decimator'],\n  'Scum and Villainy': []\n}\n\n/*\nconst rebelShips = ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',\n  'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',\n  'YT-1300', 'YT-2400', 'Z-95 Headhunter'];\n*/\n\n// Client Fields\nlet user;\nlet faction;\nlet squadronObj;\nlet currentPoints = 0;\n\n// Save Squadron\nconst saveSquadron = async() => {\n  let saveObj = {\n    user: window.location.search.split('&')[0].split('=')[1],\n    squadron: squadronObj,\n  };\n\n  const response = await fetch('/saveSquadron', {\n    method: 'post',\n    headers: {\n      'content-type': 'application/json',\n      'accept': 'application/json'\n    },\n    body: JSON.stringify(saveObj)\n  });\n\n  handleResponse(response, 'save');\n};\n\n// Function for printing squadron's cards\nconst printSquadron = () => {\n  document.querySelector('#stats').textContent = `Points: ${squadronObj.currentPoints}/${squadronObj.maxPoints}     \n  Faction: ${squadronObj.faction}`;\n\n  const squadron = document.querySelector('#squadron');\n  squadron.innerHTML = '';\n  for(let ship in squadronObj['ships']){\n    for (let i = 0; i < squadronObj['ships'][ship]['count']; i++){\n      const div = document.createElement('div');\n      div.innerHTML = `<p>Pilot: ${squadronObj['ships'][ship].name}  \n          Points: ${squadronObj['ships'][ship].points}</p>`;\n\n      const btn = document.createElement('button');\n      btn.textContent = 'Remove From Squadron';\n      btn.addEventListener('click', () => {\n        squadronObj.currentPoints -= squadronObj['ships'][ship].points;\n\n        if (squadronObj['ships'][ship].count > 1){\n          squadronObj['ships'][ship].count--;\n        } else {\n          delete squadronObj['ships'][ship];\n        }\n\n        printSquadron();\n      });\n\n      div.appendChild(btn);\n      for (let url in squadronObj['ships'][ship]['image']){\n        console.log(url);\n        const img = document.createElement('img');\n        img.src = `/getImage?path=${squadronObj['ships'][ship]['image'][url]}`;\n        div.appendChild(img);\n      }      \n      squadron.appendChild(div);\n    } \n  }\n};\n\n// Adds a ship to the local squadron data\nconst addShip = (_name, _points, _image) => {\n    if (!squadronObj['ships'][_name]){\n      squadronObj['ships'][_name] = {\n        name: _name,\n        points: _points,\n        image: _image,\n        count: 1\n      }\n    } else {\n      squadronObj['ships'][_name]['count']++;\n    }\n\n    squadronObj.currentPoints += _points;\n    return printSquadron();\n};\n\nconst handleResponse = async (response, key) => {\n  const { status } = response;\n  switch (status) {\n    // Working\n    case 200:\n      break;\n\n    // Saving the squadron\n    case 204:\n      return;\n\n    // \n    case 400:\n      break;\n\n    case 404:\n      break;\n\n    default:\n      break;\n  }\n\n  const resJSON = await response.json();\n  if (status === 200) {\n    if (key === 'squadron') {\n        squadronObj = resJSON.content;\n        faction = squadronObj.faction;\n        document.querySelector('#squadronName').textContent += squadronObj.name;\n\n        // Creates Tabs for Ships\n        const pilots = document.querySelector('#pilots');\n        pilots.innerHTML = '';\n\n        // Info on how to create for in loops\n        // https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript\n        for (const ship in factionShips[faction]) {\n            const div = document.createElement('div');\n            div.textContent = factionShips[faction][ship];\n            div.id = factionShips[faction][ship].replace(/ /g, '-');\n            console.log(div.id);\n            div.addEventListener('click', () => {}); // Functionality for opening tabs of ships\n\n            pilots.appendChild(div);\n        }\n\n        // Prints the squadron to the screen\n        printSquadron();\n\n        // Loads in the faction's pilots if the squadron is loaded in\n        const pilotResponse = await fetch(`/getFactionData?faction=${faction}`, {\n            method: 'get',\n            headers: {\n            accept: 'application/json',\n            },\n        });\n\n        handleResponse(pilotResponse, 'pilots');\n    } else if (key === 'pilots') {\n      console.log(resJSON.content);\n\n      for (const ship in factionShips[faction]) {\n        // Creates a tab reference\n        // Info on how to replace all spaces in a string\n        // https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match\n        const tab = document.getElementById(`${factionShips[faction][ship].replace(/ /g, '-')}`);\n        \n        // Special creation function for creating the CR90 Corvette\n        if (faction === 'Rebel Alliance' && factionShips[faction][ship] === 'CR90 Corvette'){\n          console.log(factionShips[faction][ship]);\n\n          // Creates the base data for the CR90 Corvette\n          const div = document.createElement('div');\n          div.id = 'CR90-Corvette';\n          div.innerHTML = '<p>Ship: CR90 Corvette   Points: 90</p>';\n\n          // Creates a button to add the card to the squadron\n          const button = document.createElement('button');\n          button.textContent = 'Add To Squadron';\n          button.addEventListener('click', () => {\n            // Checks if the card will bring the squadrons points above the maximum value\n            if (squadronObj.currentPoints + 90 > squadronObj.maxPoints){\n              console.log('Cannot fit into squadron');\n              return;\n            }\n\n            // Adds the ship to the client's side\n            addShip('CR90 Corvette', 90, [resJSON.content[35].image, resJSON.content[36].image]);\n          });\n\n          const img1 = document.createElement('img');\n          const img2 = document.createElement('img');\n          img1.src = `/getImage?path=${resJSON.content[35].image}`;\n          img2.src = `/getImage?path=${resJSON.content[36].image}`;\n\n          div.appendChild(button);\n          div.appendChild(img1);\n          div.appendChild(img2);\n          tab.appendChild(div);\n        } else if (faction === \"Galactic Empire\" && factionShips[faction][ship] === 'Raider-Class Corvete') {\n\n        } else {\n          console.log(factionShips[faction][ship]);\n          const filtered = resJSON.content.filter((x) => x.ship === factionShips[faction][ship]); \n          console.log(filtered);      \n          for (const pilot in filtered) {\n            const div = document.createElement('div');\n            div.id = filtered[pilot].name;\n            div.innerHTML = `<p>Pilot: ${filtered[pilot].name}  Points: ${filtered[pilot].points}</p>`;\n\n            // Creates a button to add the card to the squadron\n            const button = document.createElement('button');\n            button.textContent = 'Add To Squadron';\n            button.addEventListener('click', () => {\n                // Checks if the card will bring the squadrons points above the maximum value\n                if (squadronObj.currentPoints + filtered[pilot].points > squadronObj.maxPoints){\n                    console.log('Cannot fit into squadron');\n                    return;\n                }\n\n                // Adds the ship to the client's side\n                addShip(filtered[pilot].name, filtered[pilot].points, [filtered[pilot].image]);\n            });\n\n            const img = document.createElement('img');\n            img.src = `/getImage?path=${filtered[pilot].image}`;\n\n            div.appendChild(button);\n            div.appendChild(img);\n            tab.appendChild(div);\n          }\n        }\n      }\n    }\n  } else if (status === 201) {\n    \n  } else if (status === 400) {\n    console.log(resJSON.message);\n  }\n};\n\nconst init = async () => {\n  const squadronResponse = await fetch(`/getSquadronInfo${window.location.search}`, {\n    method: 'get',\n    headers: {\n      'content-type': 'application:x-www-form-urlencoded',\n      accept: 'application/json',\n    },\n  });\n\n  document.querySelector('#save').addEventListener('click', saveSquadron);\n\n  handleResponse(squadronResponse, 'squadron');\n};\n\nwindow.onload = init;\n\n\n//# sourceURL=webpack://430project1/./client/editorClient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/editorClient.js"]();
/******/ 	
/******/ })()
;
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

eval("// Faction Ship Types\nconst rebelShips = ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',\n  'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',\n  'YT-1300', 'YT-2400', 'Z-95 Headhunter'];\n\nconst handleResponse = async (response, key) => {\n  const { status } = response;\n  switch (status) {\n    case 200:\n      break;\n\n    case 204:\n      return;\n\n    case 400:\n      break;\n\n    case 404:\n      break;\n\n    default:\n      break;\n  }\n\n  const resJSON = await response.json();\n  if (status === 200) {\n    if (key === 'squadron') {\n      document.querySelector('#squadronName').textContent += resJSON.content.name;\n      document.querySelector('#stats').textContent = `Points: 0/${resJSON.content.points}     Faction: ${resJSON.content.faction}`;\n\n      // Creates Tabs for Ships\n      const pilots = document.querySelector('#pilots');\n      pilots.innerHTML = '';\n\n      // Info on how to create for in loops\n      // https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript\n      for (const ship in rebelShips) {\n        const div = document.createElement('div');\n        div.textContent = rebelShips[ship];\n        div.id = rebelShips[ship].replace(/ /g, '-');\n        div.addEventListener('click', () => {});\n\n        pilots.appendChild(div);\n      }\n\n      // Loads in the faction's pilots if the squadron is loaded in\n      const pilotResponse = await fetch(`/getFactionData?faction=${resJSON.content.faction}`, {\n        method: 'get',\n        headers: {\n          accept: 'application/json',\n        },\n      });\n\n      handleResponse(pilotResponse, 'pilots');\n    } else if (key === 'pilots') {\n      console.log(resJSON.content);\n\n      for (const ship in rebelShips) {\n        const filtered = resJSON.content.filter((x) => x.ship === rebelShips[ship]);\n\n        // Info on how to replace all spaces in a string\n        // https://stackoverflow.com/questions/3214886/javascript-replace-only-replaces-first-match\n        const tab = document.querySelector(`#${rebelShips[ship].replace(/ /g, '-')}`);\n        for (const pilot in filtered) {\n          const div = document.createElement('div');\n          div.id = filtered[pilot].name;\n          div.innerHTML = `<p>Pilot: ${filtered[pilot].name}  Points: ${filtered[pilot].points}</p>`;\n\n          const img = document.createElement('img');\n          img.src = `/getImage?path=${filtered[pilot].image}`;\n\n          div.appendChild(img);\n          tab.appendChild(div);\n        }\n      }\n    }\n  } else if (status === 400) {\n    console.log(resJSON.message);\n  }\n};\n\nconst init = async () => {\n  const squadronResponse = await fetch(`/getSquadronInfo${window.location.search}`, {\n    method: 'get',\n    headers: {\n      'content-type': 'application:x-www-form-urlencoded',\n      accept: 'application/json',\n    },\n  });\n  handleResponse(squadronResponse, 'squadron');\n};\n\nwindow.onload = init;\n\n\n//# sourceURL=webpack://430project1/./client/editorClient.js?");

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
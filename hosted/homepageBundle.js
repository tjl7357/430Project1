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

/***/ "./client/homepageClient.js":
/*!**********************************!*\
  !*** ./client/homepageClient.js ***!
  \**********************************/
/***/ (() => {

eval("// Handles a response from the server\nconst handleResponse = async (response, method, user) => {\n  const content = document.querySelector('#content');\n  const message = document.querySelector('#messages');\n  const status = response.status;\n\n  switch (status) {\n    case 200:\n      message.innerHTML = '<h1>Success</h1>';\n      break;\n\n    case 201:\n      message.innerHTML = '<h1>Created</h1>';\n      break;\n\n    case 400:\n      message.innerHTML = '<h1>Bad Request: Check Console<h1>';\n      break;\n\n    case 404:\n      message.innerHTML = '<h1>Content Not Found</h1>';\n      break;\n\n    default:\n      message.innerHTML = '<h1>Status Code Not Implemented</h1>';\n      break;\n  }\n\n  // Gets the JSON response\n  const resJSON = await response.json();\n\n  if (status === 400) {\n    console.log(resJSON.message);\n  }\n\n  if (status === 200 || status === 201) {\n    // Clears the content section of the file\n    content.innerHTML = '';\n\n    // Removes the login System, shows the Squadron Creator System\n    // Info on how to hide elements\n    // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp\n    document.querySelector('#login').style.display = 'none';\n    document.querySelector('#squadronCreation').style.display = 'block';\n\n    // Loops through and prints out the squadrons the user has\n    for (const x in resJSON.content) {\n      const div = document.createElement('div');\n\n      // Information on how to modify classlists found here\n      // https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript\n      div.classList.add('squadron');\n\n      content.appendChild(document.createElement('hr'));\n\n      const name = document.createElement('h2');\n      const points = document.createElement('p');\n      const faction = document.createElement('p');\n      const btn = document.createElement('button');\n\n      name.textContent = `${resJSON.content[x].name}`;\n      points.textContent = `Points Max: ${resJSON.content[x].points}`;\n      faction.textContent = `Faction: ${resJSON.content[x].faction}`;\n\n      btn.textContent = 'Edit Squadron';\n      btn.addEventListener('click', async () => {\n        try {\n          // Need to figure out how to pass username and squadron name to the next page\n          window.location.href = `/editSquadron?user=${user}&name=${name.textContent}`;\n        } catch (err) {\n          console.log(err);\n        }\n      });\n\n      div.appendChild(name);\n      div.appendChild(points);\n      div.appendChild(faction);\n      div.appendChild(btn);\n\n      content.appendChild(div);\n    }\n  }\n};\n\n// Function to Get the User\nconst getUser = async (loginForm) => {\n  const method = loginForm.getAttribute('method');\n  const name = loginForm.querySelector('#userNameField').value;\n\n  const formData = `name=${name}`;\n\n  const response = await fetch('/getUser', {\n    method,\n    headers: {\n      'content-type': 'application/x-www-form-urlencoded',\n      accept: 'application/json',\n    },\n    body: formData,\n  });\n\n  handleResponse(response, method, name);\n};\n\n// Function to Create a Squadron\nconst createSquadron = async (squadronForm, loginForm) => {\n  const method = squadronForm.getAttribute('method');\n  const userName = loginForm.querySelector('#userNameField').value;\n  const name = squadronForm.querySelector('#squadronNameField').value;\n  const faction = squadronForm.querySelector('#factionSelect').value;\n  const points = squadronForm.querySelector('#pointsLimit').value;\n\n  const formData = `userName=${userName}&name=${name}&faction=${faction}&points=${points}`;\n\n  const response = await fetch('/createSquadron', {\n    method,\n    headers: {\n      'content-type': 'application/x-www-form-urlencoded',\n      accept: 'application/json',\n    },\n    body: formData,\n  });\n\n  handleResponse(response, method, userName);\n};\n\n// Init Function\nconst init = () => {\n  const loginForm = document.querySelector('#loginForm');\n  const squadronForm = document.querySelector('#squadronForm');\n\n  const login = (e) => {\n    e.preventDefault();\n    getUser(loginForm);\n    return false;\n  };\n\n  const create = (e) => {\n    e.preventDefault();\n    createSquadron(squadronForm, loginForm);\n    return false;\n  };\n\n  loginForm.addEventListener('submit', login);\n  squadronForm.addEventListener('submit', create);\n};\n\nwindow.onload = init;\n\n\n//# sourceURL=webpack://430project1/./client/homepageClient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/homepageClient.js"]();
/******/ 	
/******/ })()
;
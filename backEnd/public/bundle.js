/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontEnd/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontEnd/src/app.js":
/*!*****************************!*\
  !*** ./frontEnd/src/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const  userList= document.querySelector('.frinds-list');\nconst  addBtn= document.querySelector('.addBtn');\nconst  inp= document.querySelector('.inp');\nconst newName= document.getElementById('name')\n\nlet arr2=[]\nfunction reSort(){\n    arr2.sort(function (a, b) {\n          return b.value - a.value\n        });\n  }\n    \nconst getData= async ()=>{\n    const result= await fetch(\"/api\")\n    const data= await result.json()\n    const arr1= data.users\n    let nr=0\n\n    arr2.push(...data.users)\n    \n    reSort()\n    arr2.forEach(el => {\n        const div= document.createElement('div')\n        div.className=\"frind\"\n        nr++\n        div.innerHTML=`\n            <li id=\"delName${nr}\">${el.name}</li>\n            <div class=\"bar\">\n            <h4 id=\"value${nr}\">${el.value} </h4>\n            <button type=\"submit\" id=\"plusBtn${nr}\">+</button>\n            <button type=\"submit\" id=\"minusBtn${nr}\">-</button>\n            <button type=\"submit\" id=\"deleteBtn${nr}\">x</button>\n            <br><br>\n            </div>\n            `\n        userList.appendChild(div);\n        const deleteBtn= document.querySelector(`#deleteBtn${nr}`);\n        const delName= document.querySelector(`#delName${nr}`);\n        const value= document.querySelector(`#value${nr}`);\n        const minusBtn= document.querySelector(`#minusBtn${nr}`);\n        const plusBtn= document.querySelector(`#plusBtn${nr}`);\n        const name = delName.innerText\n        let val=value.innerText\n        deleteBtn.addEventListener('click', (e)=>{\n            e.target.parentElement.parentElement.remove()\n            fetch('/api'+'/'+name,{\n                method:'Delete'\n            })\n        }) \n        \n\n        minusBtn.addEventListener('click', ()=>{\n            --val     \n            value.innerHTML=val     \n            max(val) \n            fetch('/api/'+ name, {\n                method: 'PUT',\n                headers:{\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    value: val\n                })\n            })   \n        }); \n\n        plusBtn.addEventListener('click', ()=>{\n            ++val  \n            value.innerHTML=val  \n                      max(val)      \n            fetch('/api/'+ name, {\n                method: 'PUT',\n                headers:{\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    value: val\n                })\n            }) \n                \n        }); \n    })\n}\n\nfunction max(nr){\n      arr2.forEach(el=>{\n        if(el.value > nr){\n            location.reload()\n        }\n      })\n    }\n    \n    \ngetData();\n\naddBtn.addEventListener('click', ()=>{\n    let elem= false\n   \n        arr2.forEach(el=>{\n          if(el.name === newName.value){\n              elem = true\n          }\n        })\n       \n\n    if(newName.value === ''){\n            inp.innerHTML=`<h5 id=\"error\">Please put a name</h5>`\n        setTimeout(() => {\n            inp.parentNode.removeChild(inp)\n        }, 3000);\n    \n    }else if(elem){\n        inp.innerHTML=`<h5 id=\"error\">This name is a dublicate</h5>`\n        setTimeout(() => {\n            inp.parentNode.removeChild(inp)\n        }, 3000);\n    \n    }else{\n         fetch('/api',{\n        method:'POST',\n        headers:{\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n            name: `${newName.value}`,\n            value: 5\n        })\n    })\n     location.reload()  \n    }\n});\n\n\n\n//# sourceURL=webpack:///./frontEnd/src/app.js?");

/***/ })

/******/ });
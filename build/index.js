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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);




 // Available from global scope - need to use like this for Loco Translate plugin

const __ = wp.i18n.__;
wp.blocks.registerBlockType("ourplugin/featured-academic", {
  title: "Academic Callout",
  description: "Include a short description and link to an academic",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    academicId: {
      type: "string"
    }
  },
  edit: EditComponent,
  save: function () {
    return null;
  }
});

function EditComponent(props) {
  const [thePreview, setThePreview] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(""); // USE EFFECT - CHANGE OF ACADEMIC IN DROPDOWN

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    // Only run if an academic has been selected, i.e. blank if still on 'select an academic'
    if (props.attributes.academicId) {
      updateTheMeta();

      async function go() {
        const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
          // Assumes /wp-json at the start
          path: `/featuredAcademic/v1/getHTML?academicId=${props.attributes.academicId}`,
          method: "GET"
        });
        setThePreview(response);
      }

      go();
    }
  }, [props.attributes.academicId]); // USE EFFECT - BLOCK DELETED FROM EDIT SCREEN
  // Call updateTheMeta again to make sure db is updated

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    // Return a cleanup function
    return () => {
      updateTheMeta();
    };
  }, []); // META DATA FOR FEATURED ACADEMICS
  // Also need to register new meta in PHP

  function updateTheMeta() {
    // Returns a list of all blocks in the editor, then filter for our custom block type, then map to get array of post ID numbers
    // Filter again to ensure meta only saved once per academic i.e. check for duplicate values
    const academicsForMeta = wp.data.select("core/block-editor").getBlocks().filter(x => x.name == "ourplugin/featured-academic").map(x => x.attributes.academicId).filter((x, index, arr) => {
      return arr.indexOf(x) == index;
    });
    console.log(academicsForMeta);
    wp.data.dispatch("core/editor").editPost({
      meta: {
        featuredAcademic: academicsForMeta
      }
    });
  }

  const allAcademics = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(select => {
    // In console: wp.data.select("core").getEntityRecords("postType", "academic", {per_page: -1})
    // Returns an array of all academic post type posts - can use instead of GET request to api endpoint
    // Import useSelect above
    return select("core").getEntityRecords("postType", "academic", {
      per_page: -1
    });
  }); // console.log(allAcademics);

  if (allAcademics == undefined) return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, "Loading...");
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "featured-academic-wrapper"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "academic-select-container"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("select", {
    onChange: e => props.setAttributes({
      academicId: e.target.value
    })
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("option", {
    value: ""
  }, __("Select an academic", "featured-academic")), allAcademics.map(academic => {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("option", {
      value: academic.id,
      selected: props.attributes.academicId == academic.id
    }, academic.title.rendered);
  }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    dangerouslySetInnerHTML: {
      __html: thePreview
    }
  }));
}

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
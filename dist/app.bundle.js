webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _) {"use strict";

	var Application = __webpack_require__(5);
	var app = window.App = new Application();

	// --------------------------------------------------
	// On lance le chargement de l'application
	// --------------------------------------------------
	app.start();
	Backbone.history.start({ pushState: true });

	_.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g,
	  escape: /\{\{\-(.+?)\}\}/g,
	  evaluate: /\<\%(.+?)\%\>/gim
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Marionette) {var Router = __webpack_require__(8);
	var Layout = __webpack_require__(9)

	module.exports = Marionette.Application.extend({

	  region: 'body',

	  router: null,
	  layout: null,

	  onStart: function() {

	    this.router = new Router();
	    this.router.on('project:load', this.loadPlace.bind(this));

	    this.layout = new Layout({
	      el: this.region
	    });

	    this.layout.render();

	    return this;
	  },

	  cleanRedirect: function(url) {

	    this.router.navigate(url, true);
	    return this;
	  },

	  loadPlace: function(id) {

	    this.layout.renderPlace(id);
	    return this;
	  },

	  unloadPlace: function() {

	    if (this.layout) this.layout.unloadPlace();
	    return this;
	  },
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Marionette) {
	module.exports = Marionette.AppRouter.extend({

	  routes: {
	    '': 'main',
	    ':id': 'otherPlace',
	  },

	  main: function() {

	    return this.loadPlace('bordeaux');
	  },

	  otherPlace: function(id) {

	    return this.loadPlace(id);
	  },

	  loadPlace: function(id) {

	    this.trigger('project:load', id);
	    return this;
	  }
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, Marionette, $) {var isMobile = __webpack_require__(10);
	var Places = __webpack_require__(11);

	_.templateSettings = {
	  interpolate: /\{\{(.+?)\}\}/g,
	  escape: /\{\{\-(.+?)\}\}/g,
	  evaluate: /\<\%(.+?)\%\>/gim
	};

	module.exports = Marionette.View.extend({

	  events: {
	    'click .openDropdown': 'showDropdown',
	    'click header .scrollTo': 'scrollTo',
	    'click': 'hideDropdown',
	  },

	  initialize: function(params) {

	  },

	  scrollTo: function(e) {

	    var section = this.$el.find(e.currentTarget).data('scroll');
	    $('html, body').animate( { scrollTop: $('#'+section).offset().top }, 750 );
	    return this;
	  },

	  showDropdown: function(e) {

	    e.stopPropagation();
	    this.$el.find(e.currentTarget).toggleClass('open');
	    return this;
	  },

	  hideDropdown: function(e) {

	    this.$el.find('.openDropdown').removeClass('open');
	    return this;
	  },

	  applyCover: function(el, cover) {

	    el.css('background-image', 'url('+cover+')')
	    return this;
	  },

	  initMap: function(el, pos) {

	    var Google = window.google;

	    var map = new Google.maps.Map(el.get(0), {
	      center: pos,
	      scrollwheel: true,
	      zoom: 17
	    });

	    var marker = new Google.maps.Marker({
	      map: map,
	      position: pos
	    });

	    return this;
	  },

	  renderPlace: function(id) {

	    var place = Places[id];

	    if (!place) place = Places['bordeaux'];

	    var tpl = _.template($('#tpl-place').html());
	    var el = tpl({place: place, infos: place.infos})
	    el = $(el);

	    this.applyCover(el.find('#home'), place.cover);
	    this.initMap(el.find('#map'), place.pos);

	    this.$el.find('.view').empty().append(el);
	    return this;
	  },

	  render: function() {


	    var that = this;
	    return this;
	  },

	});



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(6), __webpack_require__(4)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(a){ return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {

	  'bordeaux': {
	    id: 'bordeaux',
	    name: 'Bordeaux',
	    cover: './img/bordeaux.jpg',
	    infos: {
	      phone: '05 56 94 15 31',
	      mail: 'hello-bordeaux@gec.fr',
	      address: {
	        alley: '5 place des Quinconces',
	        post: '33000 Bordeaux'
	      },
	    },
	    pos: {
	      lat: 44.8446338,
	      lng: -0.5755015
	    },
	  },


	  'biscarosse': {
	    id: 'biscarosse',
	    name: 'Biscarosse',
	    cover: './img/biscarosse.jpg',
	    infos: {
	      phone: '05 58 78 70 30',
	      mail: 'hello-biscarosse@gec.fr',
	      address: {
	        alley: '222 avenue du XIV Juillet',
	        post: '40600 Biscarrosse'
	      },
	    },
	    pos: {
	      lat: 44.396424,
	      lng: -1.166519
	    },
	  },


	  'sanguinet': {
	    id: 'sanguinet',
	    name: 'Sanguinet',
	    cover: './img/sanguinet.jpg',
	    infos: {
	      phone: '05 58 04 81 78',
	      mail: 'hello-sanguinet@gec.fr',
	      address: {
	        alley: '21 avenue du Stade',
	        post: '40460 Sanguinet'
	      },
	    },
	    pos: {
	      lat: 44.4801416,
	      lng: -1.0812954
	    },
	  },

	}


/***/ }
]);
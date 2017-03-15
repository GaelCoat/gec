var isMobile = require('../libs/isMobile');
var Appear = require('../libs/appear');
var Places = require('../places');

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
    'click .veil': 'closePopup',
  },

  currentPopup: null,
  currentPlace: null,

  initialize: function(params) {

  },

  setSizes: function() {

    var that = this;

    this.$el.find('.setSize').each(function() {

      $(this).height($(this).height());
    });

    return this;
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

  openPopup: function(e, id) {

    this.currentPopup = id;

    $('body').addClass('modal-open');
    this.$el.find(this.currentPopup).show(0).addClass('open');
    return this;
  },

  closePopup: function(e) {

    window.history.pushState(null, null, this.currentPlace);

    $('body').removeClass('modal-open');
    this.$el.find(this.currentPopup).hide(0).removeClass('open');

    this.currentPopup = null;
    return this;
  },

  applyCover: function(el, cover) {

    el.css('background-image', 'url('+cover+')');
    this.$el.css('background-image', 'url('+cover+')');
    return this;
  },

  initAppears: function() {

    $('.show-waves').appear();
    $('.show-waves').on('appear', function(event, $els) { $els.addClass('ready'); });

    return this;
  },

  initMap: function(el, pos) {

    var Google = window.google;
    var zoom = 17;

    if (isMobile) zoom = 20;

    var map = new Google.maps.Map(el.get(0), {
      center: pos,
      scrollwheel: false,
      zoom: zoom
    });

    var marker = new Google.maps.Marker({
      map: map,
      position: pos
    });

    return this;
  },

  renderPlace: function(id) {

    var that = this;

    window.onhashchange = function() {

      var hash = location.hash;
      if (that.currentPopup) that.closePopup();
      if (hash) that.openPopup(null, hash);
    }

    var place = Places[id];

    this.currentPlace = id;

    if (!place) place = Places['bordeaux'];

    var tpl = _.template($('#tpl-place').html());
    var el = tpl({place: place, infos: place.infos})
    el = $(el);

    this.applyCover(el.find('#home'), place.cover);
    this.initMap(el.find('#map'), place.pos);

    this.$el.find('.view').empty().append(el);

    if (isMobile) return this.setSizes();
    else return this.initAppears();
  },

  render: function() {


    var that = this;
    return this;
  },

});



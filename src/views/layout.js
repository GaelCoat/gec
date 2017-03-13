var isMobile = require('../libs/isMobile');
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



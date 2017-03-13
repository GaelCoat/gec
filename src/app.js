var Router = require('./router');
var Layout = require('./views/layout')

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

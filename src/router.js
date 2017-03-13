
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

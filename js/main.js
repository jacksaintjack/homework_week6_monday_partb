var App = {};
App.Models = {};
App.Collections = {};
App.Views = {};

//Model and Collection
App.Models.People = Backbone.Model.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/people',
  default: {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: ''
	},
});

App.Collections.People = Backbone.Collection.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/people',
  model: App.Models.People
})

//Views
App.Views.People = Backbone.View.extend({
  template: _.template($('#blogPost').html()),

  events: {
    'click #mrButton': 'clickHandler'
  },

  send: function(){
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var address = $('#address').val();
    var phoneNumber = $('#phoneNumber').val();
    if (firstName.trim() === '') {
      alert('Add Your First Name');
      return;
    }

    if (lastName.trim() === '') {
      alert('Add your last Name');
      return;
    }

    if (address.trim() === '') {
      alert('Add Your Address');
      return;
    }
    if (phoneNumber.trim() === '') {
      alert('Add Your Name');
      return;
    }
    if (phoneNumber.length >= 11 ) {
      alert('Not a phone number or remove dashes');
      return;
    }
    var newPost = new App.Models.People({
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber
    });
    newPost.save();
  },

  render: function(){
    var userData = this.collection.toJSON();
    this.$el.html(this.template({
      userData: userData
    }));
    return this;
  },

  clickHandler: function(event){
    event.preventDefault();
    this.send();
    console.log("I've been Clicked");
  }

});

// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': 'blog',
    'blogView': 'blowView'
  },

  blog: function(){
    var collection = new App.Collections.People();
    var view = new App.Views.People({
      collection: collection
    });

    collection.fetch({
      success: function(){
        view.render();
        $('#mainArea').html(view.$el);
      }
    })

  },
});

App.router = new App.Router();
Backbone.history.start();

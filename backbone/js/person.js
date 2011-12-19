(function($) {
  
  Person = Backbone.Model.extend();
  People = Backbone.Collection.extend({model: Person});

  window.people = new People();
    
  PersonView = Backbone.View.extend({
    tagName: "li",

    events: {
      "click .testButton" : "clickButton"
    },

    clickButton: function() {
      alert("button clicked");
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#person-template').html());      
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    }
  });

  PeopleView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.bind('add', this.render);
      this.template = _.template($('#people-template').html());
    },    

    render: function() {
      var collection = this.collection;
      $(this.el).html(this.template({}));

      collection.each(function(person) {
        var personView = new PersonView({model: person});
        $(".people").append(personView.render().el);        
      });
      
      return this;
    }
  });

  App = Backbone.Router.extend({
    routes: {
      '': 'home'
    },

    home: function() {      
      var peopleView = new PeopleView({collection: people});  
      $("#container").append(peopleView.render().el);
    }
  });

})(jQuery);

$('document').ready(function(){  
  window.app = new App();
  Backbone.history.start();

  person1 = new Person({name: "Fabio", gender: "Male"});
  person2 = new Person({name: "Zeh", gender: "Male"});
  people.add(person1);
  people.add(person2);
});
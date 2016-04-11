

var Group = Backbone.Model.extend({
  defaults: {
    name:    '',
    persons: []
  }
});

var Bill = {
	total:0,
	persons:[]
};



(function(){

var Person = Backbone.Model.extend({
  defaults: {
    name:    ''
  }
});


var Personlist = Backbone.Collection.extend({
  model: Person
});




var persons = new ServiceList([
		new Person({ name: 'teste1'}),
		new Person({ name: 'teste2'}),
		new Person({ name: 'teste3'}),
		new Person({ name: 'teste4'})
		// Add more here
]);


var ServiceView = Backbone.View.extend({
		
		tagName: 'li',

		events:{
			'click': 'toggleService'
		},

		initialize: function(){

			// Set up event listeners. The change backbone event
			// is raised when a property changes (like the checked field)

			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){

			// Create the HTML

			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
			this.$('input').prop('checked', this.model.get('checked'));

			// Returning the object is a good practice
			// that makes chaining possible
			return this;
		},

		toggleService: function(){
			this.model.toggle();
		}
		
});


window.App = {
	Models: {Person,Personlist},
	Collections: {Personlist,Bill},
	Views: {},
	Router: {}
};
App.Router = Backbone.Router.extend({
	
	routes: {
		'': 'index',
		'page11':'group',
		'page2':'bill',
		'page3':'history'
	},
	
	index: function(){
		//alert('index');
	},
	
	group:function(){
		//alert('group');
	},
	
	bill:function(){
		//alert('bill');
	},
	
	history:function(){
		//alert('history');
	}
	
});

new App.Router;
Backbone.history.start();

})();
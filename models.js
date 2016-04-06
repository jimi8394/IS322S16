var Person = Backbone.Model.extend({
  defaults: {
    name:    ''
  }
});
var Personlist = Backbone.Collection.extend({
  model: Person
});


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

function addPerson()
{
	if(typeof localStorage['persons'] == 'undefined'){
		localStorage['persons'] = '[]';
	}
	var name = $('#personName').val();
	person = new Person;
	person.name = name;
	var persons = JSON.parse(localStorage['persons']);
	persons.push(person);
	persons = JSON.stringify(persons);
	
	Personlist.add(person);
	
}


(function(){

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
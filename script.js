$(function(){
	
	 Person = Backbone.Model.extend({
		
		// Will contain three attributes.
		// These are their default values
		
		defaults:{
			title: 'Person',
		},
		
		// Helper function for checking/unchecking a service
		
	});
	
	 Bill = Backbone.Model.extend({
		
		defaults:{
			value: 0,
			sharepp:0,
			persons: []
		}
		
	});
	
	var Bills = Backbone.Collection.extend({

		model: Bill,

	});
	bills = new Bills;
	
	mainBill = new Bill;
	
	var BillsViewS = Backbone.View.extend({
		tagName: 'option',
		
		attributes: function(val) {
				return {
					value: val
				}
		},
		
		refresh:function(){
				
		},
		
		initialize: function()
		{
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function(i){
			//console.log(this.model.);
			this.attributes(i);
			this.$el.html( this.model.get('title') ).attr('value',i);
			
			return this;	
		}
		
	});
	
	
	
	
	
	
	// Create a collection of services
	var PersonList = Backbone.Collection.extend({
		
		// Will hold objects of the Service model
		model: Person,
		
		// Return an array only with the checked services
		
	});
	
	// Prefill the collection with a number of services.
    persons = new PersonList([
		new Person({ title: 'talles'}),
		new Person({ title: 'person2'}),
		new Person({ title: 'person3'}),
		new Person({ title: 'person4'})
		// Add more here
	]);
	
	// This view turns a Service model into HTML
	var PersonsView = Backbone.View.extend({
		tagName: 'li',
		
		refresh:function(){
			
		},
		
		initialize: function(){

			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function(i){
			
			this.$el.html( ' <ul  >'+this.model.get('title')+'<button onclick="App.prototype.remove('+i+')"  >remove</button></ul>' );
			
			return this;
		},
		
	});
	
	
	
	
	// The main view of the application
	App = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#persons'),
		list: $('#listppl'),
		initialize: function(){
			this.listenTo(persons, 'change', this.render);
			var i =0;
			persons.each(function(person){
				var view = new PersonsView({ model: person });
				this.list.append(view.render(i).el);
				i++;
			}, this);
			localStorage['persons'] = JSON.stringify(persons);
		},
		refresh: function(){
			$('#listppl').html('');
			var i =0;
			persons.each(function(person){
				
				var view = new PersonsView({ model: person });
				this.list.append(view.render(i).el);
				i++;
			}, this);
			localStorage['persons'] = JSON.stringify(persons);
		},
		remove:function(i)
		{
			persons.remove(persons.at(i));
			App.prototype.refresh();
		},
		render: function(){
			return this;
		}
	});
	
	
	App2 = Backbone.View.extend({
		
		el: $('#persons'),
		list: $('#selectPersonBill'),
		initialize: function(){
			this.listenTo(Bill, 'change', this.render);
			var i =0;
			
			persons.each(function(person){
				
				var view = new BillsViewS({ model: person });
				$('#selectPersonBill').append(view.render(i).el);
				//alert(view.render(i).el+'');
				console.log(view.render(i).el.outerHTML);
				i++;
				
			}, this);
		
		},
		addPerson: function(i)
		{
			
			mainBill.attributes.value = $('#totalbill').val();
			mainBill.attributes.sharepp = (mainBill.attributes.value/(mainBill.attributes.persons.length+1));
			$('#sharepptot').html(mainBill.attributes.sharepp);
			mainBill.attributes.persons.push( persons.at(i));
			
			$('#contentShare').html('');
			for(var i=0;i<=mainBill.attributes.persons.length;i++)
			{
				$('#contentShare').append(mainBill.attributes.persons[i].attributes.title+' Part:'+mainBill.attributes.sharepp+'<button onclick="App2.prototype.remove('+i+')">Remove</button></br>');
			}
			localStorage['bill'] = JSON.stringify(mainBill);
		},
		remove:function(aux){
			console.log(mainBill.attributes.persons);
			mainBill.attributes.persons.splice(aux, 1);
			mainBill.attributes.value = $('#totalbill').val();
			mainBill.attributes.sharepp = (mainBill.attributes.value/(mainBill.attributes.persons.length));
			$('#sharepptot').html(mainBill.attributes.sharepp);
			$('#contentShare').html('');
			for(var i=0;i<=mainBill.attributes.persons.length;i++)
			{
				$('#contentShare').append(
				mainBill.attributes.persons[i].attributes.title+' Part:'+mainBill.attributes.sharepp+'<button onclick="App2.prototype.remove('+i+')">Remove</button></br>');
			}
			localStorage['bill'] = JSON.stringify(mainBill);
		},
		save:function()
		{
			bills.push(mainBill);
			if(localStorage['bills'].length >= 0){
				var aux = (bills);
				var aux2 = JSON.parse(localStorage['bills']);
				console.log(aux);
				aux.push(aux2)
				localStorage['bills'] = JSON.stringify(aux);
				alert('Bill Saved');
			}else{
				localStorage['bills'] = JSON.stringify(bills);
				alert('Bill Saved');
			}
			
		},
		render: function(){
			return this;
		}
	});
	
	
	
	//new App2();
	
	var Aprouter = Backbone.Router.extend({
	
		routes: {
			'': 'index',
			'page11':'group',
			'page2':'bill',
			'page3':'history'
		},
		
		index: function(){
			//alert('here');
			//new App();
		},
		
		group:function(){
			//new App();
		},
		
		bill:function(){
			//alert('bill');
		
		},
		
		history:function(){
			//alert('here');
			PopulateHistory();
		}
		
	});
	
	
	
	new App();
	
	new Aprouter;
	Backbone.history.start();
	new App2();
});


function PopulateHistory(){
	var bills = JSON.parse( localStorage['bills'] );
	$('#bills').html('');
	
	for(var i=0;i<bills.length;i++)
	{
		var share = parseFloat(bills[i].value)/bills[i].persons.length;
		var total = 'Bill Total:'+bills[i].value;
		var dataa = '<div class="ui-block-a"><div>';
		var datab = '<div class="ui-block-a"><div>';
		console.log(bills[i]);
		console.log(bills[i].persons);
		console.log('-');
		$('#bills').append('<h3>Bill Total:</h3>'+bills[i].value);
		for(var ii=0;ii<bills[i].persons.length;ii++)
		{
			
			console.log('here');
			if(i%2 ==0)
			{
				dataax = '<div class="ui-bar ui-bar-a" style="margin-left: 2%;">'+dataa+bills[i].persons[ii].title+' '+share+'%<br />'+'</div>';
				$('#bills').append(dataax);
			}else{
				databx ='<div class="ui-bar ui-bar-a" style="margin-left: 2%;">'+datab+bills[i].persons[ii].title+' '+share+'%<br />'+'</div>';
				$('#bills').append(databx);
			}
		}
		
		$('#bills').append('</div>');
	}
}

function addPerson()
{
	persons.add({ title:$('#personName').val()});
	$('#personName').val('');
	App.prototype.refresh()
}



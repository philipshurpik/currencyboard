Template.orders.helpers({
	hideCompleted: function() {
		return Session.get('hideCompleted');
	},
	activeCount: function() {
		return Orders.find({checked: {$ne: true}}).count();
	},
	orders: function() {
		var hideCompleted = Session.get('hideCompleted');
		return hideCompleted ?
			Orders.find({checked: false}, {sort: {amount: -1, rate: -1}}) :
			Orders.find({}, {sort: {amount: -1, rate: -1}});
	},
});
Template.orders.events({
	'change .hide-completed input': function(event) {
		Session.set('hideCompleted', event.target.checked);
	}
});
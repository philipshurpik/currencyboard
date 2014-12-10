Router.configure({
	layoutTemplate: 'main',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [
			Meteor.subscribe('Orders')
		];
	}
});

Router.map(function() {
	this.route('/', { name:'board' });
	this.route('/orders/:_id', {
		name: 'orderPage',
		data: function() {
			return Orders.findOne(this.params._id);
		}
	});
	this.route('/create', { name:'newOrderPage' });
});

Router.onBeforeAction('loading');
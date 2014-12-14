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
	this.route('/', {
        name:'board'
    });
	this.route('/orders/:_id', {
		name: 'orderPage',
		data: function() {
			return Orders.findOne(this.params._id);
		}
	});
	this.route('/create', {
        name:'newOrderPage'
    });
    this.route('/signin', {
        name: 'signinPage'
    });
    this.route('/join', {
        name: 'joinPage'
    });
    this.route('/profile', {
        name: 'profilePage'
    });
    this.route('/statistics', {
        name: 'statisticsPage'
    });
});

if (Meteor.isClient) {
    Router.onBeforeAction('loading', {except: ['joinPage', 'signinPage']});
    Router.onBeforeAction(function() {
        Session.set('activePage', Router.current().route.getName());
        this.next();
    });
}


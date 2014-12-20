Template.newOrderPage.rendered = function() {
    Session.set('headerState', { text: "Новая заявка" });
};
Template.newOrderPage.events({
	'submit .new-order': function(event) {
		event.preventDefault();
		var form = event.target;
		var formData = {
			type: form.type.value,
			rate: form.rate.value,
			amount: form.amount.value,
			city: form.city.value
		};
        //Meteor.call('addOrder', {type:'buy', rate: 18.15, amount: 1000, phone: +380636067857});
		Meteor.call('addOrder', formData);
		form.amount.value = form.rate.value = form.phone.value = "";
		Router.go('board');
		return false;
	},
    'click .go-to-signin': function() {
        Router.go('signinPage');
    },
    'click .go-to-join': function() {
        Router.go('joinPage');
    }
});
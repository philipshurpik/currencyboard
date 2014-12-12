Template.newOrderPage.rendered = function() {
    Session.set('headerState', { text: "Create order", backPage: "board" });
};
Template.newOrderPage.events({
	'submit .new-order': function(event) {
		event.preventDefault();
		var form = event.target;
		var formData = {
			type: form.type.value,
			rate: form.rate.value,
			amount: form.amount.value,
			phone: form.phone.value
		};
		Meteor.call('addOrder', formData);
		form.amount.value = form.rate.value = form.phone.value = "";
		Router.go('board');
		return false;
	}
})
Template.newOrderPage.rendered = function() {
    Session.set('headerState', { text: "Новая заявка" });
};
Template.newOrderPage.events({
	'submit': function(event) {
		event.preventDefault();
        var form = event.target;
		var formData = {
			type: $('.filter-type').find('.active').data('id'),
            currency: $('.filter-currency').find('.active').data('id'),
			rate: form.rate.value,
			amount: form.amount.value,
			city: form.city.value,
            phone: Meteor.user().profile.phone,
            name: Meteor.user().profile.name,
            comment: form.comment.value,
		};
        Meteor.call('addOrder', formData);
		form.amount.value = form.rate.value = form.comment.value = "";
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
Template.newOrderPage.helpers({
    city: function() {
        return Meteor.user().profile.city;
    }
})
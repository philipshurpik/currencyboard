Template.newOrderPage.rendered = function() {
    Session.set('headerState', { text: "Новая заявка" });
    $("#rate").on('keyup', function(event) {
        var allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
        if (event.keyCode !== 8 && event.which !== 8) {
            var value = event.currentTarget.value;
            var newValue = "";
            for (var i = 0; i < value.length; i++) {
                if (allowedChars.indexOf(value[i]) !== -1) {
                    newValue += value[i];
                }
            }
            if (newValue.toString().length === 2) {
                newValue += ".";
            }
            event.currentTarget.value = newValue;
        }
    });
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
            isDrive: $('.new-order-drive').hasClass('active'),
            isBank: $('.new-order-bank').hasClass('active')
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
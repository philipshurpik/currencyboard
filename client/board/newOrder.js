Template.newOrder.events({
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
		return false;
	}
})
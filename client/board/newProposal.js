Template.newProposal.events({
	'submit .new-proposal': function(event) {
		event.preventDefault();
		var form = event.target;
		var formData = {
			type: form.type.value,
			rate: form.rate.value,
			amount: form.amount.value,
			phone: form.phone.value
		};
		Meteor.call('addProposal', formData);
		form.amount.value = form.rate.value = form.phone.value = "";
		return false;
	}
})
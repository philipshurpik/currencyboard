Template.proposals.helpers({
	hideCompleted: function() {
		return Session.get('hideCompleted');
	},
	activeCount: function() {
		return Proposals.find({checked: {$ne: true}}).count();
	},
	proposals: function() {
		var hideCompleted = Session.get('hideCompleted');
		return hideCompleted ?
			Proposals.find({checked: false}, {sort: {amount: -1, rate: -1}}) :
			Proposals.find({}, {sort: {amount: -1, rate: -1}});
	},
});
Template.proposals.events({
	'change .hide-completed input': function(event) {
		Session.set('hideCompleted', event.target.checked);
	}
});
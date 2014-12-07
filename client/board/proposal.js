Template.proposal.events({
	'click .check-proposal': function() {
		Meteor.call('checkProposal', this._id, !this.checked);
	},
	'click .delete-proposal': function() {
		Meteor.call('removeProposal', this._id);
	},
	'click .mark-private': function() {
		Meteor.call('setPrivate', this._id, !this.private);
	}
});
Template.proposal.helpers({
	isOwner: function() {
		return this.owner === Meteor.userId();
	}
});
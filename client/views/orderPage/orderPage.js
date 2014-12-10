Template.orderPage.events({
	'click .check-order': function() {
		Meteor.call('checkOrder', this._id, !this.checked);
	},
	'click .delete-order': function() {
		Meteor.call('removeOrder', this._id);
	},
	'click .mark-private': function() {
		Meteor.call('setPrivate', this._id, !this.private);
	}
});
Template.orderPage.helpers({
	isOwner: function() {
		return this.owner === Meteor.userId();
	}
});
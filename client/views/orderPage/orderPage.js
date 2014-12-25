Template.orderPage.rendered = function() {
    Session.set('headerState', { text: "Заявка", backPage: "board" });
};
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
	},
    showDrive: function() {
        return this.isDrive;
    },
    showBank: function() {
        return this.isBank;
    },
    type: function() {
        return this.type === "sell" ? "Покупка" : "Продажа";
    },
    amount: function() {
        return ("" + this.amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + " "; });
    }
});
Template.order.events({
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
Template.order.helpers({
	isOwner: function() {
		return this.owner === Meteor.userId();
	},
    time: function() {
        var hour = this.createdAt.getHours().toString();
        var minute = this.createdAt.getMinutes().toString();
        return (hour.length === 1 ? "0" + hour : hour) + ":" + (minute.length === 1 ? "0" + minute : minute);
    },
    amount: function() {
        return ("" + this.amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + " "; });
    },
    showIconDrive: function() {
        return !this.isDrive ? "display-none" : "";
    },
    showIconBank: function() {
        return !this.isBank ? "display-none" : "";
    },
    showCurrency: function() {
        return Session.get('activeBoardCurrency') !== "all" ? "display-none" : "";
    },
    showCity: function() {
        return "display-none";
    },
    showAdvancedRow: function() {
        return Session.get('boardShowMore') && 'show-advanced-row';
    }
});
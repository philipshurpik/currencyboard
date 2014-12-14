Orders = new Mongo.Collection("orders");

Meteor.methods({
	addOrder: function(formData) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("Fucking shit! Are you kidding me?")
		}
		formData = _.extend(formData, {
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
        for (var i = 0; i < 1000; i++) {
            Orders.insert(formData);
        }
	},
	removeOrder: function(id) {
		var order = Orders.findOne(id);
		if (order.private && order.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Orders.remove(id);
	},
	checkOrder: function(id, checked) {
		var order = Orders.findOne(id);
		if (order.private && order.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Orders.update(id, {$set: {checked: checked}});
	},
	setPrivate: function(id, isPrivate) {
		var order = Orders.findOne(id);
		if (order.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Orders.update(id, {$set: {private: isPrivate}});
	}
})
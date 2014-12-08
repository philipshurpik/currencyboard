Meteor.publish("Orders", function() {
	return Orders.find({
		$or: [
			{ private: { $ne: true } },
			{ owner: this.userId }
		]
	});
});
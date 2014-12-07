Meteor.publish("Proposals", function() {
	return Proposals.find({
		$or: [
			{ private: { $ne: true } },
			{ owner: this.userId }
		]
	});
});
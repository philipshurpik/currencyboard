Meteor.publish("Orders", function() {
	var currentDate = new Date();
    currentDate = currentDate.setDate(currentDate.getDate() - 1);
    return Orders.find({
		$or: [
			{ private: { $ne: true } },
			{ owner: this.userId }
		],
        createdAt: {
            $gte: new Date(currentDate)
        }
	});
});
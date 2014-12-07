Proposals = new Mongo.Collection("proposals");

Meteor.methods({
	addProposal: function(formData) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("Fucking shit! Are you kidding me?")
		}
		formData = _.extend(formData, {
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
		Proposals.insert(formData);
	},
	removeProposal: function(id) {
		var proposal = Proposals.findOne(id);
		if (proposal.private && proposal.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Proposals.remove(id);
	},
	checkProposal: function(id, checked) {
		var proposal = Proposals.findOne(id);
		if (proposal.private && proposal.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Proposals.update(id, {$set: {checked: checked}});
	},
	setPrivate: function(id, isPrivate) {
		var proposal = Proposals.findOne(id);
		if (proposal.owner !== Meteor.userId()) {
			throw new Meteor.Error("WTF!!! U, fucking nigga!");
		}
		Proposals.update(id, {$set: {private: isPrivate}});
	}
})
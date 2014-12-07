var Proposals = new Mongo.Collection("proposals");
createMethods();

if (Meteor.isClient) {
	Meteor.subscribe("Proposals");
	setDefaults();
	setTemplates();
}

if (Meteor.isServer) {
	Meteor.publish("Proposals", function() {
		return Proposals.find({
			$or: [
				{ private: { $ne: true } },
				{ owner: this.userId }
			]
		});
	});
}

function createMethods() {
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
}

function findBestRates() {
	var result = {
		bestBuy: Proposals.findOne({type:"buy", checked: {$ne: true}}, {sort: {rate: -1 }}).rate,
		bestSell: Proposals.findOne({type:"sell", checked: {$ne: true}}, {sort: {rate: 1 }}).rate
	}
	return result;
}

function setDefaults() {
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
}

function setTemplates() {
	Template.rateWidget.helpers({
		bestBuy: function() { return findBestRates().bestBuy },
		bestSell: function() { return findBestRates().bestSell }
	});
	//////////////////////
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
	})
	//////////////////////
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
	//////////////////////
	Template.addProposal.events({
		'submit .add-proposal': function(event) {
			event.preventDefault();
			var form = event.target;
			var formData = {
				type: form.type.value,
				rate: form.rate.value,
				amount: form.amount.value,
				phone: form.phone.value
			};
			Meteor.call('addProposal', formData);
			form.amount.value = form.rate.value = form.phone.value = "";
			return false;
		}
	})
}
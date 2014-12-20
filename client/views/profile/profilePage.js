Template.profilePage.rendered = function() {
    Session.set('headerState', { text: "Профиль" });
};
Template.profilePage.events({
    'submit': function(event) {
        event.preventDefault();

        return false;
    },
    'click .text-logout': function() {
        Meteor.logout();
        Router.go('board');
    }
});
Template.profilePage.helpers({
    name: function() {
       return Meteor.user().profile.name;
    },
    city: function() {
       return Meteor.user().profile.city;
    },
    phone: function() {
        return Meteor.user().profile.phone;
    },
    notifications: function() {
        return Meteor.user().profile.notifications && 'active';
    }
});
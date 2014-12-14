Template.profilePage.rendered = function() {
    Session.set('headerState', { text: "Profile" });
};
Template.profilePage.events({
    'click .logout': function() {
        Meteor.logout();
        Router.go('board');
    }
})
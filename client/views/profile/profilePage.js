Template.profilePage.rendered = function() {
    Session.set('headerState', { text: "Профиль" });
};
Template.profilePage.events({
    'click .text-logout': function() {
        Meteor.logout();
        Router.go('board');
    }
})
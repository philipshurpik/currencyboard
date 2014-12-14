Template.statisticsPage.rendered = function() {
    Session.set('headerState', { text: "Statistics" });
};
Template.statisticsPage.events({
    'click .logout': function() {
        Meteor.logout();
        Router.go('board');
    }
})
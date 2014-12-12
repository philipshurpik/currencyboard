Session.setDefault('menuOpen', false);
var header = {
    backButton: false,
    text: "Board"
};
Session.setDefault('headerState', header);

Template.main.helpers({
    menuOpen: function() {
        return Session.get('menuOpen') && 'menu-open';
    },
    cordova: function() {
        return Meteor.isCordova && 'cordova';
    },
    headerState: function() {
        return Session.get('headerState');
    }
});

Template.main.events({
    'click .btn-menu': function() {
        Session.set('menuOpen', !Session.get('menuOpen'));
    }
});
Session.setDefault('menuOpen', false);
var header = {
    backButton: false,
    text: "Board"
};
Session.setDefault('headerState', header);

Template.main.rendered = function() {
    this.find('#content')._uihooks = {
        insertElement: function(node) {
            var nodeEl = $(node).hasClass('page-base') ? $(node).prependTo('#content') : $(node).appendTo('#content')
            setTimeout(function() {
                nodeEl.addClass('page-current');
            }, 10);
        },
        removeElement: function(node) {
            $(node).removeClass('page-current');
            setTimeout(function() {
                $(node).remove();
            }, 600);
        }
    };
};

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
Session.setDefault('menuOpen', false);
var header = {
    back: false,
    backPage: "",
    text: "Board"
};
Session.setDefault('headerState', header);

Template.main.rendered = function() {
    this.find('#content')._uihooks = {
        insertElement: function(node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn(function () {});
        },
        removeElement: function(node) {
            $(node).fadeOut(function() {
                $(this).remove();
            });
        }
        /*insertElement: function(node) {
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
        }*/
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
    },
    activePageBoard: function() {
        var page = Session.get('activePage');
        return (page === 'board' || page === 'orderPage') && 'active';
    },
    activePageNewOrder: function() {
        return Session.get('activePage') === 'newOrderPage' && 'active';
    },
    activePageSignin: function() {
        var page = Session.get('activePage');
        return (page === 'signinPage' || page === 'joinPage') && 'active';
    },
    activePageProfile: function() {
        return Session.get('activePage') === 'profilePage' && 'active';
    }
});

Template.main.events({
    'click .pull-left': function() {
        var headerState = Session.get('headerState');
        if (!headerState.backPage && headerState.back === true) {
            history.back();
        }
    },
    'click .btn-menu': function() {
        Session.set('menuOpen', false/*!Session.get('menuOpen')*/);
    }
});
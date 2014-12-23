Session.setDefault('menuOpen', false);
Session.setDefault('headerState', { back: false, backPage: "", text: "Board" });
Session.setDefault('activeBoardType', "buy");
Session.setDefault('activeBoardCurrency', "usd");
Session.setDefault('boardShowMore', false);
Session.setDefault('showAllOrders', true);

Meteor.startup(function () {
    document.addEventListener("deviceready", function() {
        if (window.device && window.device.platform) {
            Session.set('platform', window.device.platform.toLowerCase());
        }
    });
});

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
    };
};

Template.main.helpers({
    cordova: function() {
        return Meteor.isCordova && 'cordova';
    },
    platform: function() {
        return Session.get('platform');
    },
    headerState: function() {
        return Session.get('headerState');
    },
    activePageBoard: function() {
        var page = Session.get('activePage');
        var allOrders = Session.get('showAllOrders');
        return (page === 'board' && allOrders || page === 'orderPage' && allOrders) && 'active';
    },
    activePageMyOrders: function() {
        var page = Session.get('activePage');
        var allOrders = Session.get('showAllOrders');
        return (page === 'board' && !allOrders || page === 'orderPage' && !allOrders) && 'active';
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
    },
    'click .pull-right': function() {
        Session.set('boardShowMore', !Session.get('boardShowMore'));
    }
});
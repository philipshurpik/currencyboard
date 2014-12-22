Template.board.rendered = function() {
    Session.set('headerState', { text: "Все заявки" });
};
Template.board.helpers({
    activeCount: function() {
        return Orders.find({checked: {$ne: true}}).count();
    },
    orders: function() {
        var hideCompleted = Session.get('hideCompleted');
        return hideCompleted ?
            Orders.find({checked: false}, {sort: {amount: -1, rate: -1}}) :
            Orders.find({}, {sort: {amount: -1, rate: -1}});
    }
});
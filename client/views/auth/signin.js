Template.signinPage.rendered = function() {
    Session.set('headerState', { text: "Sign in" });
};
Template.signinPage.events({
    'submit .signin': function(event) {
        event.preventDefault();
        var form = event.target;
        var phone = form.phone.value;
        var password = form.password.value;
        var error = "";
        if (!phone || !password) {
            error = "Please fill phone and password";
            Session.set('signinPageErrors', error);
            return;
        }
        Meteor.loginWithPassword(phone, password, function(error) {
            if (error) {
                return Session.set('signinPageErrors', error.reason);
            }
            Router.go('board');
        });
    }
});
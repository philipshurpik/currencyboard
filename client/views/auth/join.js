Template.joinPage.rendered = function() {
    Session.set('headerState', { text: "Регистрация", back: true });
};
Template.joinPage.events({
    'submit': function(event) {
        event.preventDefault();
        var form = event.target;
        var phone = form.phone.value;
        var password = form.password.value;
        var confirm = form.confirm.value;
        var error = "";
        if (!phone || phone.length < 7) {
            error = "Correct phone number is required";
            Session.set('joinPageErrors', error);
            return;
        }
        if (!password || password.length < 6 || password !== confirm) {
            error = "Password (at least 6 symbols) is required";
            Session.set('joinPageErrors', error);
            return;
        }
        Accounts.createUser({
            username: phone,
            password: password
        }, function(error) {
            if (error) {
                return Session.set('joinPageErrors', error.reason);
            }
            Router.go('board');
        });
    }
});
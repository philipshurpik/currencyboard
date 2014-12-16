getUserLanguage = function () {
    // Put here the logic for determining the user language

    return "ru";
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);
        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
            })
            .fail(function (error_message) {
                console.log(error_message);
            });
    });
}
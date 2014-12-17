getUserLanguage = function () {
    return Session.get("currentLanguage");
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("currentLanguage", "ru");
        TAPi18n.setLanguage("ru")
            .done(function (blabla) {
                console.log(blabla);
            })
            .fail(function (error_message) {
                console.log(error_message);
            });
    });
}
// get user data from Github API
var user = $('.js-entered-user').val();
var url = 'https://api.github.com/users/'+user;

$.getJSON(url, function(json) {

    var userData = json;

    if (userData.message != "Not Found") {
        // display data for user
        var name = userData.name;
        var login = userData.login;

        if (name == null) {
            name = login;
        }

        var img = userData.avatar_url;
        var githubLink = userData.html_url;
        var location = userData.location;
        var personalLink = userData.blog;
        var description = userData.bio;
        var repoNum = userData.public_repos;
        var repoUrl = userData.repos_url;
    } else {
        // user not found, display message
    }
});
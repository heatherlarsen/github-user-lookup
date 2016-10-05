var contributorsUrl = repoData[index].contributors_url;

$.getJSON(contributorsUrl, function(json) {

    var contributorData = json;

    if (contributorData.message != "Not Found") {
        // display contributors of this repo

        $.each(contributorData, function(index) {

            var login = contributorData[index].login;
            var githubUrl = contributorData[index].html_url;
            var img = contributorData[index].avatar_url;
            var noOfContributions = contributorData[index].contributions;

        });

    } else {
        // contributors not found, display message
    }

});
var repoUrl = userData.repos_url;

$.getJSON(repoUrl, function(json) {

    var repoData = json;

    if (repoData.length !== 0) {
        // display data for repos

        $.each(repoData, function(index) {

            var id = repoData[index].id;
            var name = repoData[index].name;
            var description = repoData[index].description;
            var createdOn = repoData[index].created_at;

            if (repoData[index].has_issues) {
                var issueCount = repoData[index].open_issues;
            }

            var watchers = repoData[index].watchers;
            var forks = repoData[index].forks;
            var contributorsUrl = repoData[index].contributors_url;
            var commitUrl = repoData[index].commit_url.split('{')[0];   // remove '{/sha}'
        });

    } else {
        // no public repos available, display message
    }

});
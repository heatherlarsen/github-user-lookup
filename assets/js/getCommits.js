var commitUrl = repoData[index].commit_url.split('{')[0];   // remove '{/sha}'

$.getJSON(commitUrl, function(json) {

    var commitData = json;

    if (commitData.message != "Not Found") {
        // display commits of this repo -- only 30 at a time

        $.each(commitData, function(index) {

            var committedOn = commitData[index].commit.committer.date;
            var committerName = commitData[index].commit.committer.name;
            var committerEmail = commitData[index].commit.committer.email;
            var authorName = commitData[index].commit.author.name;
            var authorEmail = commitData[index].commit.author.email;
            var message = commitData[index].commit.message;

        });

    } else {
        // commits not found, display message
    }

});
// user section
function userLookup(user) {

    // get user data from Github API
    var url = 'https://api.github.com/users/'+user;

    $.getJSON(url, function(json) {
        // display loader for 2 seconds
        setTimeout(function() {
            $('.js-content-loading').addClass('is-hidden');

            // show proper content
            showProperContent('data');

            displayUserData(json);
        }, 2000);
    });

    function displayUserData(json) {

        var userData = json;

        if (userData.message != "Not Found") {
            // user data was found, display data
            $('.js-user-notfound').addClass('is-hidden');
            $('.js-display-user-data').removeClass('is-hidden');

            // if no name provided, use login handle
            if (userData.name == null) {
                userData.name = userData.login;
            }
            $('.js-user-name').text(userData.name);

            // build user image
            if (userData.avatar_url != null) {
                var img = '<img src="'+userData.avatar_url+'" class="thumb">';
                $('.js-user-img').html(img);
            }

            // build user link -- should always have these values
            var userLink = '(<a href="'+userData.html_url+'" target="_blank">@'+userData.login+'</a>)';
            $('.js-user-handle').html(userLink);

            // build directions link
            if (userData.location != null) {
                var location = userData.location;
                var directionsLink = "https://www.google.com/maps?hl=en&daddr="+location;
                var locationLink = '<span class="glyphicon glyphicon-map-marker"></span><a href="'+directionsLink+'" target="_blank">'+location+'</a>';
                $('.js-user-location').html(locationLink);
            }

            // build website link
            if (userData.blog != null) {
                var personalUrl = '<span class="glyphicon glyphicon-globe"></span><a href="'+userData.blog+'" target="_blank">Website</a>';
                $('.js-user-website').html(personalUrl);
            }

            var id = userData.id;
            var repoBtn = '<a href="#" class="btn-generic js-view-repos-'+id+'">View Repositories</a>';
            $('.js-repo-btn').html(repoBtn);

            // build description section
            if (userData.bio != null) {
                $('.js-user-desc').text(userData.bio);
            }

            // start repo lookup
            var reposNum = userData.public_repos;

            var repoUrl = userData.repos_url;

            $('.js-view-repos-'+id).on('click', function(e) {
                e.preventDefault();

                repoLookup(repoUrl, reposNum);
            });
        } else {
            // not a proper user, display message
            $('.js-user-notfound').removeClass('is-hidden');
            $('.js-display-user-data').addClass('is-hidden');
        }
    }

}


// repo section
function repoLookup(url, count) {

    // show proper content
    showProperContent('repos');

    // always lookup first page on initial call
    getRepoDataByPage(url);

    // more than 1 page (30 results)?
    var howManyPages = Math.ceil(count / 30);

    if (howManyPages > 1) {
        // build simple pagination piece
        var pagination = '<div class="pagination-wrap">';
        for (var i = 1; i <= howManyPages; i++) {
            pagination += '<a href="#" class="page-num js-page-click" data-page="'+i+'">'+i+'</a>';
        }
        pagination += '</div>';
        $('.js-content-repos').append(pagination);
        $('[data-page=1]').addClass('is-active');  // add is-active to initial page

        $('.js-page-click').on('click', function(e) {
            e.preventDefault();

            // create new url with correct page
            var pageNum = $(this).attr('data-page');
            var newUrl = url + '?page=' + pageNum;

            // get repo data for the correct page
            getRepoDataByPage(newUrl);

            // adjust styles for active page link
            setActivePage(pageNum);
        });

    } else {
        // no pages because no results
        if ($('.pagination-wrap').length) {
            $('.pagination-wrap').remove();
        }
    }

    // additional step needed to look up by page
    function getRepoDataByPage(url) {

        // get repo data from the correct page
        $.getJSON(url, function(json) {
            displayRepoData(json);
        });
    }

    function displayRepoData(json) {

        var repoData = json;

        // empty any old contents -- only want 1 page at a time
        $('.js-display-repo-data').html("");

        var output = "";

        if (repoData.length !== 0 && repoData.message != "Not Found") {

            // display content
            $('.js-display-repo-data').removeClass('is-hidden');

            // hide not found message
            $('.js-repo-notfound').addClass('is-hidden');

            $.each(repoData, function(index) {

                // if repo doesn't allow issues, don't display issues line
                if (repoData[index].has_issues) {
                    var issues = '<div class="repo-issues"><strong>Open Issues: </strong>'+repoData[index].open_issues+'</div>';
                }

                // if repo doesn't have description, don't display
                if (repoData[index].description) {
                    var description = '<div class="repo-desc"><span class="sub-header">Description</span>'+repoData[index].description+'</div>';
                }

                var id = repoData[index].id;
                var commitUrl = repoData[index].commits_url.split('{')[0];

                var header = '<div class="repo-header js-show-more" data-id="'+id+'">'+
                                '<span class="glyphicon glyphicon-folder-close"></span>'+
                                repoData[index].name+
                                '<span class="glyphicon glyphicon-chevron-right"></span>'+
                             '</div>';

                output = '<div class="repo-content is-hidden">'+
                            '<div class="row">'+
                                '<div class="col-md-8">'+
                                    '<div class="repo-createdOn"><span class="sub-header">Created On </span>'+cleanDate(repoData[index].created_at)+'</div>';

                if (description) output += description;

                output +=       '</div>'+
                                '<div class="col-md-4">'+
                                    '<div class="repo-stats">'+
                                        '<span class="sub-header">Stats</span>';

                if (issues) output += issues;

                output +=               '<div class="repo-watchers"><strong>Watchers: </strong>'+repoData[index].watchers+'</div>'+
                                        '<div class="repo-forks"><strong>Forks: </strong>'+repoData[index].forks+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12">'+
                                    '<span class="js-contributors-url is-hidden">'+repoData[index].contributors_url+'</span>'+
                                    '<div class="js-repo-contributors-'+id+'"></div>'+
                                    '<span class="js-commit-url is-hidden">'+commitUrl+'</span>'+
                                    '<div class="commit-btn-wrap js-commit-btn-'+id+'"><a href="#" class="btn-generic js-view-commits">View Latest Commits</a></div>'+
                                    '<div class="js-commits-'+id+'"></div>'+
                                '</div>'+
                            '</div>'+
                         '</div>';

                output = header + output;

                $('.js-display-repo-data').append(output);
            });

            // open repo section when clicked
            $('.js-show-more').on('click', function(e) {
                e.preventDefault();

                openCloseSection($(this));

                // only lookup on open, not on close
                if (!$(this).next().hasClass('is-hidden')) {
                    var id = $(this).attr('data-id');

                    var contribUrl = $(this).next().find('.js-contributors-url').text();
                    contributorsLookup(contribUrl, id);

                    var commitUrl = $(this).next().find('.js-commit-url').text();
                    commitLookup(commitUrl, id);
                }

            });

        } else {
            // repos not found, display message: probably private account
            $('.pagination-wrap').remove();
            $('.js-repo-notfound').removeClass('is-hidden');
            $('.js-display-repo-data').addClass('is-hidden');
        }
    }

}


// contributors section
function contributorsLookup(url, id) {

    $.getJSON(url, function(json) {
        displayContributorsData(json);
    });

    function displayContributorsData(json) {

        var contributorData = json;

        if (contributorData.message != "Not Found") {

            var output = '<div class="repo-contributors"><span class="sub-header">Contributors</span>';

            $.each(contributorData, function(index) {
                output += '<div class="repo-contributor-icon">'+
                            '<a href="'+contributorData[index].html_url+'" target="_blank" title="'+contributorData[index].login+' - '+contributorData[index].contributions+' contributions">'+
                                '<img src="'+contributorData[index].avatar_url+'">'+
                            '</a>'+
                          '</div>';
            });

            output += '</div>';
        } else {
            var output = "No Contributors Found!";
        }

        $('.js-repo-contributors-'+id).html(output);
    }

}


// commits section
function commitLookup(url, id) {

    $.getJSON(url, function(json) {
        $('.js-view-commits').on('click', function(e) {
            e.preventDefault();

            displayCommitData(json);

            $('.js-commit-btn-'+id).addClass('is-hidden');
        });
    });

    function displayCommitData(json) {

        var commitData = json;

        if (commitData.message != "Not Found") {
            var output = '<div class="commits"><h3>Commits <span class="js-hide-commits">(close)</span></h3>';

            $.each(commitData, function(index) {
                var committedOn = cleanDate(commitData[index].commit.committer.date);
                var committerName = commitData[index].commit.committer.name;
                var committerEmail = commitData[index].commit.committer.email;
                var authorName = commitData[index].commit.author.name;
                var authorEmail = commitData[index].commit.author.email;
                var message = commitData[index].commit.message;

                output += '<div class="commit">'+
                            '<div class="row">'+
                                '<div class="col-md-8">'+
                                    '<span class="sub-header">Committer </span><a href="mailto: '+committerEmail+'">'+committerName+'</a><br/>'+
                                    '<span class="sub-header">Author </span><a href="mailto: '+authorEmail+'">'+authorName+'</a>'+
                                    '<span class="sub-header commit-message-header">Commit Message</span><p>'+message+'</p>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                    '<span class="sub-header commit-on-header">Committed On </span>'+committedOn+
                                '</div>'+
                            '</div>'+
                          '</div>';
            });

            output += '</div>';
        } else {
            var output = "No Commits Found!";
        }

        $('.js-commits-'+id).html(output);

        hideComments(id);
    }

}
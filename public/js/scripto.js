$(document).ready(function() {
    var sRelease = getReleaseData('omeka-s-modules/Scripto');
    var classicRelease = getReleaseData('omeka/plugin-Scripto');
    setReleaseVersion(sRelease, '#omeka-s .version');
    setReleaseVersion(classicRelease, '#omeka-classic .version');
    setReleaseUrl(sRelease, '#omeka-s .download');
    setReleaseUrl(classicRelease, '#omeka-classic .download');

    function getReleaseData(repo) {
        var response = null;
        $.ajax({
            async: false,
            method: 'GET',
            url: 'https://api.github.com/repos/' + repo + '/releases/latest',
            dataType: 'JSON'
        }).done(function(data) {
            response = data;
        });
        return response;
    };

    function setReleaseUrl(repoData, selector) {
        $(selector).attr('href', repoData['assets'][0]['browser_download_url']);
    };

    function setReleaseDate(repoData, selector) {
        var releaseDate = new Date(repoData['published_at']);
        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        $(selector).text(releaseDate.toLocaleDateString('en-US', dateOptions));
    };

    function setReleaseVersion(repoData, selector) {
        $(selector).text(repoData['tag_name']);
    };
});
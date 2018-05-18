$(document).ready(function () {
    let titles = [];
    let summary = [];
    let urls = [];

    $('.search-btn').click(() => {
        searchWiki();
    });

    $('.lucky-btn').click(() => {
        searchLucky();
    });

    
    function searchWiki() {
        let query = $('#search').val();
        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&limit=10&namespace=0&redirects=return&format=json&callback=?';
        $.getJSON(url)
            .done((data) => {
                console.log(data);
            })
            .fail((error) => {
                console.log('fail(): ' + error);
            })
    };

    function searchLucky() {
        let query = $("#search").val();
        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&limit=1&namespace=0&redirects=return&format=json&callback=?';
        let luckyUrl;
        $.getJSON(url)
            .done((data) => {
                luckyUrl = data[3];
                window.open(luckyUrl);
            })
            .fail((error) => {
                console.log('fail(): ' + error);
            })
    }






});
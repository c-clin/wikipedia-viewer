$(document).ready(function () {
    let titles = [];
    let summary = [];
    let urls = [];

    $('.search-btn').click(() => {
        searchWiki();
        $("#search").val("");
    });

    $('.lucky-btn').click(() => {
        searchLucky();
        $('#search').val('');
    });

    // search wiki that returns 10 results
    function searchWiki() {
        let query = $('#search').val();
        let numOfResults = 10;
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${numOfResults}&namespace=0&redirects=return&format=json&callback=?`;
        $.getJSON(url)
            .done((data) => {
                console.log(data);
                for(let i = 0; i < numOfResults; i++) {
                    titles[i] = data[1][i];
                    summary[i] = data[2][i];
                    urls[i] = data[3][i];
                }
            })
            .fail((error) => {
                alert('fail(): ' + error);
            })
    };

    // opens the first search on feeling lucky
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
                alert('fail(): ' + error);
            })
    }






});
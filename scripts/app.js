$(document).ready(function () {
    let titles = [];
    let summary = [];
    let urls = [];

    // listens for search btn click
    $('.search-btn').click(() => {
        if ($("#search").val()) {
            searchWiki();
            // clear search after clicked
            $("#search").val('');
        } else {
            alert("Please enter a valid input!");
        }
    });

    // allows search to start on enter
    $('#search').keypress(e => {
        if (e.keycode === 13 || e.which === 13) {
            searchWiki();
            $("#search").val('');
        }
    });

    // listens for feeling lucky click
    $('.lucky-btn').click(() => {
        if ($("#search").val()) {
            searchLucky();
            $("#search").val('');
        } else {
            alert('Please enter a valid input!');
        } 
    });

    // search wiki that returns 10 results
    function searchWiki() {
        let query = $('#search').val();
        let numOfResults = 8;
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${numOfResults}&namespace=0&redirects=return&format=json&callback=?`;
        let html;
        $(".wiki-results").empty();
        $.getJSON(url)
            .done((data) => {
                for(let i = 0; i < numOfResults; i++) {
                    titles[i] = data[1][i];
                    summary[i] = data[2][i];
                    urls[i] = data[3][i];
                    html = `<div class="wiki-item">
                                <a href="${urls[i]}" target="_blank">
                                    <h4>${titles[i]}</h4>
                                    <p>${summary[i]}</p>
                                </a>
                            </div>`;
                    $('.wiki-results').append(html);
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
    };
});
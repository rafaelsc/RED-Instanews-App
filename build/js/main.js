$(function () {
    var newsTemplate = $.templates("#news-item-template");
    var $menu = $("#sections");
    var $spin = $("#spin");
    var $news = $("#news");
    $spin.hide();
    setTimeout(function () {
        console.log("Debug...");
        $menu.val("world");
        $menu.change();
    }, 1000);
    $menu.change(function () {
        console.log("menu change");
        var val = $menu.val();
        if (!val) {
            $news.hide();
            return;
        }
        $spin.show();
        var url = "//api.nytimes.com/svc/topstories/v2/" + val + ".json";
        url += '?' + $.param({
            'api-key': "7dd8ef3de3434176a64908eb393d70db"
        });
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (result) {
            var data = result.results.filter(function (r) { return r.multimedia && r.multimedia.length > 0; })
                .slice(0, 12)
                .map(function (val) {
                var img = val.multimedia[0] && val.multimedia[0].url || null;
                var imgCap = val.multimedia[0] && val.multimedia[0].caption || null;
                return {
                    "title": val.title,
                    "linkUrl": val.short_url,
                    "img": img,
                    "imgCap": imgCap
                };
            });
            console.log(data);
            var htmlOutput = newsTemplate.render(data);
            $news.html(htmlOutput);
        }).fail(function (err) {
            throw err;
        }).always(function () { return $spin.hide(); });
    });
});

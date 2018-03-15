$(() => {
    const newsTemplate = $.templates("#news-item-template");
    const $menu = $("#sections");
    const $spin = $("#spin");
    const $news = $("#news");

    $spin.hide()

    //Debug
    setTimeout(()=>{
        console.log("Debug...");
        $menu.val("world");
        $menu.change();
    },1000)

    //

    $menu.change(() => {

        console.log("menu change");

        const val = $menu.val();
        if (!val) {
            $news.hide();
            return;
        }

        $spin.show();

        var url = "//api.nytimes.com/svc/topstories/v2/" + val + ".json";
        url += '?' + $.param({
            'api-key': "7dd8ef3de3434176a64908eb393d70db" //TODO Get a API Key
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done((result) => {
            // console.log(result);

            var data = result.results.filter( r => r.multimedia && r.multimedia.length > 0 )
                                     .slice(0, 12)
                                     .map((val) => {
                var img = val.multimedia[0] && val.multimedia[0].url || null;
                var imgCap = val.multimedia[0] && val.multimedia[0].caption || null;
                return {
                    "title": val.title,
                    "linkUrl" : val.short_url,
                    "img": img,
                    "imgCap": imgCap
                }
            });
            console.log(data);
            var htmlOutput = newsTemplate.render(data);
            $news.html(htmlOutput);
            // console.log(htmlOutput);

        }).fail((err) => {
            throw err;
        }).always(() => $spin.hide());
    });

});

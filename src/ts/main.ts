$(() => {
    const newsTemplate = $.templates("#news-item-template");
    const $header = $(".header");
    const $menu = $("#sections");
    const $spin = $("#spin");
    const $news = $("#news");

    $spin.hide()

    //Debug
    setTimeout(()=>{
        console.log("Debug...");
        $menu.val("home");
        $menu.change();
    },500)
    //

    $menu.change(() => {
        const val = $menu.val();
        if (!val) {
            $header.removeClass("dataLoaded");
            $news.hide()
                 .empty();
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
            // console. log(result);

            var data = result.results.filter(r => r.multimedia && r.multimedia.length > 0 )
                                     .slice(0, 12)
                                     .map((val) => {
                const img = val.multimedia.slice(0,6).reverse().slice(0,1)[0];
                // console.log(val);
                return {
                    "title": val.title,
                    "text": val.abstract,
                    "linkUrl" : val.short_url,
                    "img": img.url,
                    "imgCap": img.caption
                }
            });
            // console.log(data);
            var htmlOutput = newsTemplate.render(data);
            $news.html(htmlOutput);

            // console.log("To Samll");
            $header.addClass("dataLoaded");
            $news.show();
            // console.log("Done");

        }).fail((err) => {
            throw err;
        }).always(() => {
            $spin.hide()
        });
    });

});

$(() => {
    const newsTemplate = $.templates("#news-item-template");
    const $header = $(".header");
    const $menu = $("#sections");
    const $spin = $("#spin");
    const $news = $("#news");

    $spin.hide()

    $menu.selectric();

    //Debug
    // setTimeout(()=>{
    //     console.log("Debug...");
    //     $menu.val("home");
    //     $menu.change();
    // },1500)
    //

    $menu.change(() => {

        $spin.hide();
        $news.empty();

        const val = $menu.val();
        if (!val) {
            $header.removeClass("dataLoaded");
            $news.hide();
            return;
        }

        $header.addClass("dataLoaded");
        $spin.show();

        // return;

        var url = "//api.nytimes.com/svc/topstories/v2/" + val + ".json";
        url += '?' + $.param({
            'api-key': "7dd8ef3de3434176a64908eb393d70db"
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).done((result) => {
            // console. log(result);

            var data = result.results.filter(r => r.multimedia && r.multimedia.length > 0 )
                                     .slice(0, 12)
                                     .map((val) => {
                // console.log(val);
                const img = val.multimedia.slice(0).reverse()[0];
                // console.log(img.caption);
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
            $news.show();
            // console.log("Done");

        }).fail((err) => {
            throw err;
        }).always(() => {
            $spin.hide()
        });
    });

});

$(() => {
    const $menu = $("#sections");
    const $spin = $("#spin");

    $spin.hide()

    $menu.change(() => {

        console.log("menu change");

        const val = $menu.val();
        if (!val) {
            return;
        }

        var url = "https://api.nytimes.com/svc/topstories/v2/"+ val +".json";
        url += '?' + $.param({
            'api-key': "7dd8ef3de3434176a64908eb393d70db" //TODO Get a API Key
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
        }).fail(function (err) {
            throw err;
        });



        console.log("Done");

        $spin.show();
    });

});

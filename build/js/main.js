$(function () {
    var $menu = $("#sections");
    var $spin = $("#spin");
    $spin.hide();
    $menu.change(function () {
        console.log("menu change");
        var val = $menu.val();
        if (!val) {
            return;
        }
        console.log("Done");
        $spin.show();
    });
});

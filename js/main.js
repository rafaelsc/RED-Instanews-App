$(() => {

    const $menu = $("#sections");
    const $spin = $("#spin");

    $spin.hide()

    $menu.change(()=>{

        console.log("menu change");

        const val = $menu.val();
        if(!val){
            return;
        }

        console.log("Done");

        $spin.show();
    });

});

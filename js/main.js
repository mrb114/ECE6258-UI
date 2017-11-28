// $("#choose1").click(function() {
//     var $img = $("#option1").clone();
//     $("#main_photo").html($img);
// });

var background_clicked = false;
var background_image_id;
var face_selection = [];
var background_images = [];
var upload_url;
var face_id;
$('.background-option button').on('click', function() {
    console.log('clicked');
    var that = $(this);
    var img_id = that.parent().parent().find('img').attr('id');
    console.log(img_id)
    var img = that.parent().parent().find('img').clone();
    console.log(img)

    $.get("http://localhost:8000/select/image/" + img_id, function(response) {
        var data = $.parseJSON(response);
        console.log(data);

        $("#main_photo").html('<img src=' + data['boxed_faces'] +'>');

        /*$("#face-1").html(response.faces.get(1));
        $("#face-2").html(response.faces.get(2));
        $("#face-3").html(response.faces.get(3));
        $("#face-4").html(response.faces.get(4));*/

    });
    background_clicked = true;
});


$('.background-box').on('click', function() {
    face_id = $(this).attr('id');
    console.log('clicked');
    $.get('http://localhost:8000/select/face/' + face_id, function(response) {
        $.ajax({
            url: 'http://localhost:8000/select/face' + face_id,
            type: 'POST',
            data: face_id
        });
    });


});


$('.select-option button').on('click', function() {
    if (background_clicked == true) {
        console.log('clicked');
        var that = $(this);
        var face = that.parent().parent().find('img').clone();
        var image_id = that.attr('id');
        face_selection.push({
                key: face_id,
                value: image_id
            })
            //TODO: make call to backend to replace face here
        $.get("http://localhost:8000/backgroundimage", function(response) {

            $.ajax({
                url: "http://localhost:8000/select/face/" + face_selection,
                type: 'POST',
                data: face_selection,
                success: function(response) {
                    console.log(response)
                },
                error: function(error) {
                    console.log(error)
                }
            });
            $("#main_photo") = response.main_photo;
            var imagecount = 1;
            for (img in background_images) {
                var image_id = "#option" + imagecount;
                $(image_id).html(response.faces(imagecount));
                imagecount++;
            }



        });
    } else {
        $(this).attr('disabled');
    }
});


$("#uploadForm").on('submit', function(ev) {
    ev.preventDefault();
    $.LoadingOverlay("show");
    var formData = new FormData(this);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/upload',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(response) {
            var data = $.parseJSON(response);
            console.log(data);
            var uploaded_image = data['image_id'];
            var image_url = data['image_url'];
            //$("#"+uploaded_image).html('<img class="card-img-top"  alt="Load Image" src="'+ image_url +'">'); 
            $("#" + uploaded_image).attr('src', image_url);
            $.LoadingOverlay("hide");
        },
        error: function(error) {
            console.log(error)
        }
    });
});


$("#export").on('click', function() {
    $.LoadingOverlay("show");

    setTimeout(function() {
        $.LoadingOverlay("hide");

    }, 1000);

});
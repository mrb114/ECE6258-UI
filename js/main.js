// $("#choose1").click(function() {
//     var $img = $("#option1").clone();
//     $("#main_photo").html($img);
// });
//yours
var background_clicked = false;
var background_image_id;
var face_selection = [];
var background_images = [];
var upload_url;
var face_id;
//mine
var selected_img_dims; 
var face_boxes; 
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
        selected_img_dims = data['img_dims']; 
        face_boxes = data['faces'];
        $("#main_photo").html('<img src=' + data['boxed_faces'] +'>');
        setTimeout(function() {
		    resize_box();
		}, 25);
    });
});

$( window ).resize(function() {
  if(selected_img_dims && face_boxes){
  	resize_box();
  }
});

function resize_box() {
	var curr_width = $("#main_photo img").width(); 
  	var curr_height = $("#main_photo img").height();
  	$.each(face_boxes, function(face_id, dims) {
    	var y = dims[0];
    	var x = dims[1];
    	var h = dims[2];
    	var w = dims[3];
    	scaled_width = curr_width / selected_img_dims[1]; 
    	scaled_height = curr_height / selected_img_dims[0]; 
    	scaled_x = Math.floor(x*scaled_width); 
    	scaled_y = Math.floor(y*scaled_height); 
    	scaled_w = Math.floor(w*scaled_width); 
    	scaled_h = Math.floor(h*scaled_height); 
    	var box = $("#"+face_id);
    	if(!box.length){
    		box = $("<div>", {id: face_id, "class": "main_photo_faces"});
    	}
		$("#main_photo").append(box);	
    	box.height(scaled_h);
    	box.width(scaled_w);
    	box.parent().css({position: 'relative'});
		box.css({top: scaled_x, left: scaled_y, position:'absolute'});
	});
}

// get the true image width
// get the current parent conainer width
// find the relative ratio
// modify coordinates with that ratio
// draw box at new coordinates

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
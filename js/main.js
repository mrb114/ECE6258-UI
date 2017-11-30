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

$(document).ready(function() {
	$.ajaxSetup({cache: false}); 
	$.get("http://localhost:8000/restart", function(response) {
		console.log('restarted backend');
	}); 
}); 

$('.background-option button').on('click', function() {
    var that = $(this);
    var img_id = that.parent().parent().find('img').attr('id');
    var img = that.parent().parent().find('img').clone();

    $.get("http://localhost:8000/select/image/" + img_id, function(response) {
        var data = $.parseJSON(response);
        console.log(data); 
        selected_img_dims = data['img_dims']; 
        face_boxes = data['faces'];
        $("#main_photo").html('<img src=' + data['boxed_faces'] +'?dummy=' + $.now() + '>');
        setTimeout(function() {
		    resize_box();
		}, 150);
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

$('#main_photo').on('click', '.main_photo_faces', function(){
	face_id = $(this).attr('id');
	$.get('http://localhost:8000/select/face/' + face_id, function(response) {
		var data = $.parseJSON(response);
		console.log(data); 
        var image_ids = Object.keys(data); 
        var count = 0; 
        $('.select-option').each(function(i, obj) {
        	var img = $(this).find('img'); 
        	img.removeAttr('src'); 
        	if(count >= image_ids.length){
            	return true; 
            }
        	image_id = image_ids[count]; 
            img.attr('id', image_id + '-' + face_id);
            img.attr('src', data[image_id] +'?dummy=' + $.now());
            count++;
        });
	});
});

$('.select-option button').on('click', function() {
	$.LoadingOverlay("show");
	var that = $(this); 
	var img_face_id = that.parent().parent().find('img').attr('id').split('-'); 
	var img_id = img_face_id[0]; 
	var face_id = img_face_id[1]; 
	$.get('http://localhost:8000/swap/' + img_id + '/' + face_id, function(response) {
		var data = $.parseJSON(response); 
		$("#main_photo").html('<img src=' + data['result'] + '?dummy=' + $.now() +'>');
		setTimeout(function() {
		    resize_box();
		}, 150);
		$.LoadingOverlay("hide");
	}); 
}); 


$('input[type=file]').change(function() {
	$('#uploadForm').submit(); 
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
            var uploaded_image = data['image_id'];
            var image_url = data['image_url'];
            $("#" + uploaded_image).attr('src', image_url+'?dummy=' + $.now());
            $.LoadingOverlay("hide");
        },
        error: function(error) {
            console.log(error)
        }
    });
});


$("#export").on('click', function() {
    $.LoadingOverlay("show");
    var img_url = $("#main_photo").find('img').attr('src');
    console.log(img_url);
    var anchor = $("<a>", {"href":img_url, "download": "face_swapper_result.jpg"});
    console.log(anchor); 
    anchor[0].click(); 
    $.LoadingOverlay("hide");
});
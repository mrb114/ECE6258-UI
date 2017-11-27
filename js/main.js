
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
$('.background-option button').on('click', function () { 
	if($('#option1').data('clicked')) {
    	background_image_id=1;
    }
    else if($('#option2').data('clicked')){
    	background_image_id=2;
    }
    else if($('#option3').data('clicked')){
    	background_image_id=3;
    }
    else{
    	background_image_id=4;
    }
}
	console.log('clicked');
    var that = $(this);
    var img = that.parent().parent().find('img').clone(); 
    
    $.get("http://localhost:8000/selectimage", function (response) {
    	$.ajax({
    		url: "http://localhost:8000/background?imageid=" + background_image_id
    		type: 'PUT',
    		success: function (response) {
      			
    		}
});
    $("#main_photo").html(response.main_photo);
    $("#face-1").html(response.faces.get(1));
    $("#face-2").html(response.faces.get(2));
    $("#face-3").html(response.faces.get(3));
    $("#face-4").html(response.faces.get(4));
    
});
    background_clicked = true;
});


$('.background-box').on('click', function(){
	face_id = $(this).attr('id');
	console.log('clicked');

});


$('.select-option button').on('click', function(){
	if(background_clicked == true){
	console.log('clicked');
	var that = $(this);
	var face = that.parent().parent().find('img').clone();
	var image_id = that.attr('id');
	face_selection.push({
		key: face_id,
		value: image_id
	})
	//TODO: make call to backend to replace face here
	$.get("http://localhost:8000/backgroundimage", function (response) {
	    
	    $.ajax({
	    url: "http://localhost:8000/select?face=" + face_selection,
	    type: 'PUT',
	    success: function (response) {
	      
	    }
		});
	    $("#main_photo") = response.main_photo;
	    var imagecount = 1;
	    	for(img in background_images){
	    		var image_id = "#option"+imagecount;
	    		$(image_id).html(response.faces(imagecount));
	    		imagecount++;
	    	}


	    
	});
}
else{
	$(this).attr('disabled');
}
});


$("#upload").on('click', function(){
	$.LoadingOverlay("show");

	setTimeout(function(){
    $.LoadingOverlay("hide");
}, 3000);
	$.get("http://localhost:8000/backgroundimage", function (response) {
    
    $.ajax({
    url: "http://localhost:8000/upload?image=" + upload_url,
    type: 'PUT',
    success: function (response) {
      
    }
});
    background_images = response;
    var imagecount = 1;
    for(img in background_images){
    	var image_id = "#option"+imagecount;
    	$(image_id).html(img);
    	imagecount++;
    }


    
});
});

$("#export").on('click', function(){
	$.LoadingOverlay("show");

	setTimeout(function(){
    $.LoadingOverlay("hide");

}, 1000);
	
});

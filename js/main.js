
// $("#choose1").click(function() {
//     var $img = $("#option1").clone();
//     $("#main_photo").html($img);
// });

var background_clicked = false;

$('.background-option button').on('click', function () { 
	console.log('clicked');
    var that = $(this);
    var img = that.parent().parent().find('img').clone(); 
    $("#main_photo").html(img);
    background_clicked = true;
});
$('.select-option button').on('click', function(){
	if(background_clicked == true){
	console.log('clicked');
	var that = $(this);
	var face = that.parent().parent().find('img').clone();
	//TODO: make call to backend to replace face here
	$("#main_photo").html(face);
}
else{
	
}
});
$("#upload").on('click', function(){
	$.LoadingOverlay("show");

	setTimeout(function(){
    $.LoadingOverlay("hide");
}, 3000);
});

$("#export").on('click', function(){
	$.LoadingOverlay("show");

	setTimeout(function(){
    $.LoadingOverlay("hide");

}, 1000);
});

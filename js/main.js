
// $("#choose1").click(function() {
//     var $img = $("#option1").clone();
//     $("#main_photo").html($img);
// });

$('.background-option button').on('click', function () { 
	console.log('clicked');
    var that = $(this);
    var img = that.parent().parent().find('img').clone(); 
    $("#main_photo").html(img);
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

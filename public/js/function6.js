$(function(){
	$("#song").click(function() {
		var scrwidth = (screen.width-50 < 430?screen.width-50:430);
		var host='http://music.yayayouji.com';
		var pattern= /[0-9]+/;
		var link=$("#song_id").html().match(pattern)[0];
        $("#listen").html('<center><iframe src="'+host+'/xiamiplayer/'+link+'/" frameborder="0" scrolling="0" width="'+scrwidth+'" height="200" allowtransparency></iframe></center>');
        $("#listenpanel").modal();
	});
});

function listen() {
	alert("alkqwe");
}
window.onload = function() {
	if (!('ondeviceorientation' in window)) {
		alert("unsurpport!");
	} else {
		window.addEventListener('deviceorientation',handlerorientation, true);
	}
};
function handlerorientation(event){
	var alpha = event.alpha;
	document.getElementById('target').style.webkitTransform =
		document.getElementById('target').style.transform =
			'rotate(' + Math.round(alpha) + 'deg)';
}
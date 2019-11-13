//--------------------
// GET USER MEDIA CODE
//--------------------
// Global variables
let width = 500,
	height = 0,
	filter = 'none',
	streaming = false;

window.addEventListener('load', snapshot);

function snapshot() {
	// DOM elements
	const video = document.getElementById('video');
	const canvas = document.getElementById('canvas');
	const photos = document.getElementById('photos');
	const photoButton = document.getElementById('photo-button');
	const clearButton = document.getElementById('clear-button');
	const photoFilter = document.getElementById('photo-filter');
	const modal = document.getElementById('open-modal');
	const body = document.getElementById('body');

	// Get Media Stream
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(function(stream) {
			// Link to the video source
			video.srcObject = stream;
			// Play video
			video.play();
		})
		.catch(function(err) {
			console.log(`Error : ${err}`);
		});

	// Play when ready
	video.addEventListener('canplay', function (e) {
		if (!streaming) {
			// Set video canvas height
			height = video.videoHeight / (video.videoWidth / width);
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);

			streaming = true;
		}
	}, false);

	// Photo Button event
	photoButton.addEventListener('click', function(e) {
			modal.style.display = "block";
			takePicture();
			e.preventDefault();
	}, false);

	// Filter event
	photoFilter.addEventListener('change', function(e) {
		// Set filter to chosen option
		filter = e.target.value;
		// Set filter to video
		video.style.filter = filter;
		e.preventDefault();
	});

	// Clear event
	clearButton.addEventListener('click', function() {
		// Clear Photos
		photos.innerHTML = '';
		// Change filter to normal
		filter = 'none';
		video.style.filter = filter;
		// Reset select list
		photoFilter.selectedIndex = 0;
		modal.style.display = 'none';
	});
}

//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
function takePicture() {
	// Create canvas
	const context = canvas.getContext('2d');
	// Clear Photos
	photos.innerHTML = '';

	// Position overlay on image
	var e = document.querySelectorAll('.overlay');
	var el = e[0];
	if (e.length > 1) {
		var itm = document.querySelector('.bottom-container');
		var img = document.querySelector('#photos');
		itm.innerHTML = '';
		itm.appendChild(img);
	}
	var parentPos = document.querySelector('.video-container').getBoundingClientRect();
	var childPos = document.querySelector('.overlay').getBoundingClientRect();
	var relativePos = {};
	relativePos.top = childPos.top - parentPos.top,
	relativePos.right = childPos.right - parentPos.right,
	relativePos.bottom = childPos.bottom - parentPos.bottom,
	relativePos.left = childPos.left - parentPos.left;
	var d = document.querySelector('.bottom-container');
	var overlay = document.createElement("div");
	overlay.innerHTML = el.textContent.trim();
	overlay.classList.add("overlay");
	overlay.style.left = relativePos.top+'px';
	overlay.style.top = relativePos.left+'px';
	d.appendChild(overlay);

	if (width && height) {
		// Set canvas props
		canvas.width = width;
		canvas.height = height;
		// Draw an image of the video on the canvas
		context.drawImage(video, 0, 0, width, height);
		// Create an image from the canvas
		const imgUrl = canvas.toDataURL('image/png');
		// Create image element
		const image = document.createElement('img');
		// Set image source
		image.setAttribute('src', imgUrl);
		// Set image filter
		image.style.filter = filter;
		// Add image to photo id
		photos.appendChild(image);
	}
}

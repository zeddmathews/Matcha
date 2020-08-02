var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("card");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

///////////////////////////////////

// Get the image and insert it inside the modal - use its "alt" text as a caption
// var profile = document.getElementById("profile");
// var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");
function showProfile() {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
	var span = document.getElementsByClassName("close")[0];
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
		// Get the <span> element that closes the modal
	  modal.style.display = "none";
	}
	//   modalImg.src = this.src;
	//   captionText.innerHTML = this.alt;
}

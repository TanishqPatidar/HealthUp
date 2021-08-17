$(function () {
$('.list-group-item').on('click', function () {
$('.glyphicon', this)
.toggleClass('glyphicon-chevron-right')
.toggleClass('glyphicon-chevron-down');
});
});

function myFunction() {
var x = document.getElementById("myTopnav");
if (x.className === "topnav") {
x.className += " responsive";
} else {
x.className = "topnav";
}
}
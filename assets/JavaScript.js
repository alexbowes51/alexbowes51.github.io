function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

// Example event listener to change background color on button click
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('changeColorButton');
    button.addEventListener('click', function() {
        changeBackgroundColor('#f8f8f8');
    });
});
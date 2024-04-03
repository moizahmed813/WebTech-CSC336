document.addEventListener("DOMContentLoaded", function() {
    var images = document.querySelectorAll('.grid-item img');
    images.forEach(function(image) {
        image.addEventListener('mouseover', function() {
            var imageName = this.getAttribute('alt');
            document.getElementById('main-menu').getElementsByTagName('li')[0].innerText = imageName;
        });
        
        image.addEventListener('mouseout', function() {
            document.getElementById('main-menu').getElementsByTagName('li')[0].innerText = 'JavaScript Event Handler';
        });
    });
});

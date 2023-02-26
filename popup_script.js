var reset = document.getElementById('reset');
submitButton.addEventListener('click', function(event){
    localStorage.clear();
    location.reload();
});

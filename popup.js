var settings = document.getElementById('settings');
settings.addEventListener('click', function(event){
    chrome.tabs.create({url: "chrome://newtab/"});
    localStorage.removeItem("birthYear");
    localStorage.removeItem("birthMonth");
    localStorage.removeItem("birthDay");
});

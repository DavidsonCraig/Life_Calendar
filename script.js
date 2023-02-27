const WEEKSINYEAR = 52;
let years = 80;
setTheme(localStorage.theme);
checkStorage();

function checkStorage() {
    let birthYear = Number(localStorage.getItem("birthYear"));
    let birthMonth = Number(localStorage.getItem("birthMonth"));
    let birthDay = Number(localStorage.getItem("birthDay"));
    if (birthYear > 0) {
        let weeksOld = calculateWeeks(birthYear,birthMonth,birthDay);
        let clock = localStorage.getItem("clock");
        removeBirthdayEntry();
        generateCalendar(years,WEEKSINYEAR);
        fillCalendar(weeksOld);
        if (clock == "true") {
            setTime();
        } else {
            removeClock();
        }
        setTheme(localStorage.theme);
    } else {
        let birthdayBody = document.getElementById("birthdayBody");
        let clock = document.getElementById("clock");
        let submitButton = document.getElementById('birthdaySubmit');
        birthdayBody.style.opacity = "100%";
        clock.innerHTML = "Please enter your birthday";
        submitButton.addEventListener('click', function(event){
            submitBirthday();
        });
    }
}

function submitBirthday() {
    let currentDate = new Date;
    let birthdate = document.getElementById("birthdayInput");
    let theme = document.getElementById("themeCheckbox").checked;
    let clock = document.getElementById("clockCheckbox").checked;
    let birthYear = Number(birthdate.value.substring(0,4));
    let birthMonth = Number(birthdate.value.substring(5,7));
    let birthDay = Number(birthdate.value.substring(8,10));
    let weeksOld = calculateWeeks(birthYear,birthMonth,birthDay);
    if (currentDate.getFullYear() - birthYear > 79) {
        alert("This calendar currently only supports ages under 80 :(");
        return;
    }
    removeBirthdayEntry();
    generateCalendar(years,WEEKSINYEAR);
    fillCalendar(weeksOld);
    if (clock) {
        setTime();
    } else {
        removeClock();
    }
    window.localStorage.setItem("birthYear", birthYear);
    window.localStorage.setItem("birthMonth", birthMonth);
    window.localStorage.setItem("birthDay", birthDay);
    window.localStorage.setItem("theme", theme);
    window.localStorage.setItem("clock", clock);
    setTheme(localStorage.theme);
}

function calculateWeeks(years, months, days) {
    let d = new Date;
    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    let userDayCounter = 0;
    let currentDayCounter = 0;

    // Calculate number of days between user birthdate and 0/0/0000
    userDayCounter += days;
    for (let i = 1; i < months; i++) {
        userDayCounter += daysInMonth[i-1];
    }
    userDayCounter += (years * 364);

    // Calculate number of days between current day and 0/0/0000
    currentDayCounter += d.getDate();
    for (let i = 0; i < d.getMonth(); i++) {
        currentDayCounter += daysInMonth[i];
    }
    currentDayCounter += (d.getFullYear() * 364);

    // Calculate how many days old user is and convert to weeks
    return Math.floor((currentDayCounter-userDayCounter)/7);
}

function generateCalendar(years, weeks) {
    let decadeCount = 0;
    let weekCount = 0;
    let calanderBody = document.createElement("div");
    document.body.appendChild(calanderBody);
    calanderBody.setAttribute("id","calendarBody");
    for (i = 1; i < years + 1; i++) {
        for (j = 1; j < weeks + 1; j++) {
            weekCount++;
            let calanderBody = document.getElementById("calendarBody");
            let weekBox = document.createElement("div");
            let id = `W${weekCount}`;
            weekBox.setAttribute("id",id);
            weekBox.setAttribute("class","weekBox");
            calanderBody.appendChild(weekBox);
        }
        decadeCount++;
        if (decadeCount >= 20) {
            for (j = 1; j < weeks + 1; j++) {
                let calanderBody = document.getElementById("calendarBody");
                let weekBox = document.createElement("div");
                weekBox.setAttribute("class","weekBoxSpacer");
                calanderBody.appendChild(weekBox);
            }
            decadeCount = 0;
        }
    }
}

function setTime() {
    const d = new Date();
    let clock = document.getElementById("clock");
    let currentTime = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    clock.innerHTML = currentTime;
    setTimeout(setTime,1000);
}

function removeClock() {
    let clockBody = document.getElementById("clockBody");
    clockBody.remove();
    let x = document.getElementById("calendarBody");
    x.style.height = "90vh";
}

function removeBirthdayEntry() {
    let birthdayDiv = document.getElementById("birthdayBody");
    birthdayDiv.remove();
}

function fillCalendar(weeksOld) {
    for (i = 1; i <= weeksOld; i++) {
        document.getElementById(`W${i}`).setAttribute("class","weekBoxFilled");
    }
}

function setTheme(theme) {
    let root = document.documentElement;
    if (theme == "true") {
        root.style.setProperty("--backgroundColor", "#FFFFFF");
        root.style.setProperty("--textColor", "#555F70");
        root.style.setProperty("--clockColor", "#DEE1E6");
        root.style.setProperty("--birthdayInputColor", "#d3d4d5");
        root.style.setProperty("--weekBoxColor", "#DEE1E6");
        root.style.setProperty("--weekBoxFilled", "#555F70");
        root.style.setProperty("--opacity", "100%");
    } else {
        root.style.setProperty("--backgroundColor", "#202124");
        root.style.setProperty("--textColor", "#f8f8f8");
        root.style.setProperty("--clockColor", "#35363A");
        root.style.setProperty("--birthdayInputColor", "#d3d4d5");
        root.style.setProperty("--weekBoxColor", "#6e798b");
        root.style.setProperty("--weekBoxFilled", "#f8f8f8");
        root.style.setProperty("--opacity", "50%");
    }
}
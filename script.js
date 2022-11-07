const WEEKSINYEAR = 52;
let years = 80;
checkStorage();


function submitBirthday() {
    let currentDate = new Date;
    let birthdate = document.getElementById("birthdayInput");
    let birthYear = Number(birthdate.value.substring(0,4));
    let birthMonth = Number(birthdate.value.substring(5,7));
    let birthDay = Number(birthdate.value.substring(8,10));
    let weeksOld = calculateWeeks(birthYear,birthMonth,birthDay);
    if (currentDate.getFullYear() - birthYear > 79) {
        alert("This calendar currently only supports ages under 80 :(");
        return;
    }
    removeBirthdayEntry();
    setTime();
    generateCalendar(years,WEEKSINYEAR);
    fillCalendar(weeksOld);
    window.localStorage.setItem("weeksOld", weeksOld);
}

function removeBirthdayEntry() {
    let birthdayDiv = document.getElementById("birthdayBody");
    birthdayDiv.remove();
}

function calculateWeeks(years, months, days) {
    let d = new Date;
    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    let userDayCounter = 0;
    let currentDayCounter = 0;

    // Calculate user birthdate days since 0/0/0000
    userDayCounter += days;
    for (let i = 1; i < months; i++) {
        userDayCounter += daysInMonth[i-1];
    }
    userDayCounter += (years * 364);

    // Calculate current date days since 0/0/0000
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
    let currentTime = d.toLocaleDateString() + " " + d.toLocaleTimeString()
    clock.innerHTML = currentTime;
    setTimeout(setTime,1000);
}

function fillCalendar(weeksOld) {
    for (i = 1; i <= weeksOld; i++) {
        document.getElementById(`W${i}`).setAttribute("class","weekBoxFilled");
    }
}

function checkStorage() {
    let weeksOld = Number(localStorage.getItem("weeksOld"));
    if (weeksOld > 0) {
        removeBirthdayEntry();
        setTime();
        generateCalendar(years,WEEKSINYEAR);
        fillCalendar(weeksOld);
    } else {
        let birthdayBody = document.getElementById("birthdayBody");
        birthdayBody.style.opacity = "100%"
        let clock = document.getElementById("clock");
        clock.innerHTML = "Please enter your birthday";
    }
}


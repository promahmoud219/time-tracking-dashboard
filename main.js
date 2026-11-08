const timeTrackingDashboard = document.querySelector(".time-tracking-dashboard");


async function getAllActivities() {

    const response = await fetch("./data.json");
    
    if(!response.ok)
        throw new Error(`Failed to fetch activities: ${response.status}`);

    return await response.json();
}



const activityColors = {
    Work: "#FF8B64",
    Play: "#55C2E6",
    Study: "#FF5E7D",
    Social: "#7335D2",
    Exercise: "#4BCF82",
    "Self Care": "#F1C75B"
}

const activityIconSource = {
    Work: "./images/icon-work.svg",
    Play: "./images/icon-play.svg",
    Study: "./images/icon-study.svg",
    Social: "./images/icon-social.svg",
    Exercise: "./images/icon-exercise.svg",
    "Self Care": "./images/icon-self-care.svg"
}

function createActivityCard(activity) {
 
    const activityCard = document.createElement("article");
    
    const header = document.createElement("header");
    const icon = document.createElement("img");
    const body = document.createElement("div");
    
    const titleAndOptions = document.createElement("div");
    const title = document.createElement("h2");
    const options = document.createElement("button");
    
    const time = document.createElement("div");
    const currentTime = document.createElement("p");
    const previousTime = document.createElement("p");
    const optionsButtonImg = document.createElement("img");
     

    activityCard.classList.add("activity-card");
    header.classList.add("activity-card__header");
    icon.classList.add("activity-card__icon");

    icon.alt = "";
    
    body.classList.add("activity-card__body");
    titleAndOptions.classList.add("activity-card__title-and-options");
    title.classList.add("activity-card__title");
    
    options.classList.add("activity-card__options");
    options.type = "button";
    options.setAttribute("aria-label", "activity card options");

    time.classList.add("activity-card__time");
    currentTime.classList.add("activity-card__current-time");
    previousTime.classList.add("activity-card__previous-time");

    optionsButtonImg.src = "./images/icon-ellipsis.svg";
    optionsButtonImg.alt = "";
    

    activityCard.append(header, body);


    header.append(icon);

    body.append(titleAndOptions, time);

    titleAndOptions.append(title, options);
    
    

    options.append(optionsButtonImg);

    time.append(currentTime, previousTime);
    

    // changable part

    title.textContent = activity.title;
    
    icon.src = activityIconSource[activity.title];
    activityCard.style.backgroundColor = activityColors[activity.title];
    return activityCard;
}


async function renderActivities() {
    
    const activities = await getAllActivities();
    
    const fragment = document.createDocumentFragment();

    activities.forEach(activity => {
        fragment.append(createActivityCard(activity));
    });

    timeTrackingDashboard.append(fragment);  
}

renderActivities();

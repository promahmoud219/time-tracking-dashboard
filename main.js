const DEFAULT_TIMEFRAME = "weekly";
let selectedTimeframe = DEFAULT_TIMEFRAME;

const timeframeLabel = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month"
};

let activities = [];

async function init() {
    activities = await getAllActivities();

    renderActivities(activities);
}

init().catch(error => {
    console.error("Failed to initialize dashboard:", error);
});


const timeTrackingDashboard = document.querySelector(".time-tracking-dashboard");



async function getAllActivities() {

    const response = await fetch("./data.json");
    
    if(!response.ok)
        throw new Error(`Failed to fetch activities: ${response.status}`);

    return response.json();
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

    currentTime.textContent = `${activity.timeframes[selectedTimeframe].current}hrs` ;
    previousTime.textContent = `${timeframeLabel[selectedTimeframe]} - ${activity.timeframes[selectedTimeframe].previous}hrs`;

    icon.src = activityIconSource[activity.title];
    activityCard.style.backgroundColor = activityColors[activity.title];

    activityCard.setAttribute("data-activity", activity.title);

    return activityCard;
}


function renderActivities(activities) {
    
    const fragment = document.createDocumentFragment();

    activities.forEach(activity => {
        fragment.append(createActivityCard(activity));
    });

    timeTrackingDashboard.append(fragment);  
}


const filterTime = document.querySelector(".filter-time");

filterTime.addEventListener("click", (event) => {
    
    let button = event.target.closest("[data-period]");
    if(!button) return;
    selectedTimeframe = button.dataset.period;

    let activeButton = document.querySelector(".filter-time__button--active");

    activeButton.classList.remove("filter-time__button--active");
    activeButton.setAttribute("aria-pressed", "false");
    
    button.classList.add("filter-time__button--active"); 
    button.setAttribute("aria-pressed", "true");

    activities.forEach(activity => {
        filterTimeFunction(activity, selectedTimeframe);
    })

})


function updateActivityCardTimeframe(activity, selectedTimeframe){

    const activityCard = document.querySelector(`.activity-card[data-activity="${activity.title}"]`);

    const currentTime = activityCard.querySelector(".activity-card__current-time");
    const previousTime = activityCard.querySelector(".activity-card__previous-time");

    currentTime.textContent = `${activity.timeframes[selectedTimeframe].current}hrs` ;
    previousTime.textContent = `${timeframeLabel[selectedTimeframe]} - ${activity.timeframes[selectedTimeframe].previous}hrs`;
}


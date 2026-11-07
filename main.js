



console.log (getAllActivities());

async function getAllActivities() {

    const response = await fetch("./data.json");
    
    if(!response.ok)
        throw new Error("HTTP Error");

    return await response.json();
}
const htmlElements = {
    url : "https://www.boredapi.com/api/activity/",
    container : document.querySelector('.container'),
    button : document.querySelector('.generator')
    
}

async function getActivity(){
    const {activity} = await (await fetch(htmlElements.url)).json();
    return activity;
}

async function getActivities(){
    try{
        let activities = []
        await Promise.all([
            activities.push(await getActivity()),
            activities.push(await getActivity()),
            activities.push(await getActivity())
        ])
        return activities;
    }
    catch(e){
        return e.message;
    }
}

function clearActivities(){
    const activities = document.querySelectorAll('.card');
    if(activities.length !== 0){
        console.log(activities)
        activities.forEach((activity)=>{
            activity.remove();
        })
        document.querySelector('.cards').remove()
    }
}

async function displayActivities(){
    try{
        const activities = await getActivities(); 
        if(!Array.isArray(activities)){
            throw new Error('activities have not founded');
        }
        const [firstActivity, secondActivity, thirdActivity] = activities
        clearActivities();
        const cards = document.createElement('div')
        cards.classList.add('cards');
        cards.innerHTML = 
        `
        <div class="card"><div class="card__text">${firstActivity}</div></div>
        <div class="card"><div class="card__text">${secondActivity}</div></div>
        <div class="card"><div class="card__text">${thirdActivity}</div></div>
        `
        console.log(htmlElements.container)
        htmlElements.container.appendChild(cards);
    }
    catch(e){
        throw e;
    }
}

async function main(){
    try{
        displayActivities();
    }catch(e){
        console.log(e);
    }
}


//movement animation to happen
const card = document.querySelector('.card');
const container = document.querySelector('.container');

// items
const title = document.querySelector('.title');
const category = document.querySelector('.category');
// const contact = document.querySelector('.contact button');
const description = document.querySelector('.info h3');
const date = document.querySelector('.date');


//moving animation
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) /20 ;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
});
// animate in
container.addEventListener('mouseenter', (e) => {
    card.style.transition = "none";
    // pop out
    title.style.transform = "translateZ(150px)";
    description.style.transform = "translateZ(125px)";
    // social.style.transform = "translateZ(100px)";
    category.style.transform = "translateZ(75px)";
    date.style.transform = "translateZ(175px)";
});

//animate out
container.addEventListener('mouseleave', (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    // pop back
    title.style.transform = "translateZ(0px)";
    category.style.transform = "translateZ(0px)";
    description.style.transform = "translateZ(0px)";
    date.style.transform = "translateZ(0px)";
    // contact.style.transform = "translateZ(0px";
})
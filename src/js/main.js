import MenuHandler from "./Menu.js";
import { embedLink } from "../../data.js";
const btnIntro = document.querySelector(".btn-intro");
const videoIntro = document.querySelector("#videoIntro");
const menuFooter = document.querySelector("#menuFooter");
const room = document.querySelector(".room");
const introMain = document.querySelector(".introdution-main");
let i = 0;
let lenghth = Object.keys(embedLink).length - 1;
window.onload = function () {
    new MenuHandler("menuMain");
    btnIntro.addEventListener("click", () => {
        videoIntro.classList.add("show");
        videoIntro.play();
        const introdution = document.querySelector(".introduction");
        introdution.classList.add("hidden");
    }, false)
    videoIntro.addEventListener("ended", function () {
        videoIntro.classList.add("hidden");
        menuFooter.classList.add("show")
        room.classList.add("show")
        let timeInterval = setInterval(() => {
            if (i === lenghth) clearInterval(timeInterval);
            let key = Object.keys(embedLink)[i]
            let iframeRoom = document.querySelector(`#${key} iframe`)
            iframeRoom.setAttribute("src", embedLink[key])
            i++;
        }, 5000);
        videoIntro.remove();
        introMain.remove();
        const nav1Active = document.querySelector(".nav-item.active");
        nav1Active.click();
    }, false)

    handleClickAbout();
}


function handleClickAbout(){
    const aboutElm = document.querySelector(".header-about");
    const aboutUs = document.querySelector("#about-us");
    const buttonClose = document.querySelector("#about-us .buttonClose");


    aboutElm.addEventListener("click" , ()=> {
        aboutUs.classList.add("show");
    })

    buttonClose.addEventListener("click" , ()=>{
        aboutUs.classList.remove("show");
    })
}
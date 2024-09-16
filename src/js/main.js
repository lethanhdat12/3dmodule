
import ModuleLoader from "./SceneLoader.js";
import MenuHandler from "./Menu.js";
import { onLoadAbout } from "./index.js";

const menu = document.querySelector("#menuLeft");
const buttonClose = document.querySelector(".buttonClose");
const btnMenu = document.querySelector(".buttonShowMenu");
const btnIntro = document.querySelector(".btn-intro");
const videoIntro = document.querySelector("#videoIntro")
btnIntro.addEventListener("click", () => {


    const introdution = document.querySelector(".introduction");
    introdution.classList.add("hidden")

    videoIntro.play();

    videoIntro.addEventListener("ended", () => {
        const nav1Active = document.querySelector(".nav-item.active");
        nav1Active.click();
        videoIntro.classList.add("hidden")
    })
})


btnMenu.addEventListener("click", () => {
    menu.classList.toggle("show")
})


window.onload = function () {
    new MenuHandler("menuMain")
    new ModuleLoader()
    onLoadAbout();
}
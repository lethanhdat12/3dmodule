
import ModuleLoader from "./SceneLoader.js";
import MenuHandler from "./Menu.js";
import { onLoadAbout } from "./index.js";


const menu = document.querySelector("#menuLeft");
const buttonClose = document.querySelector(".buttonClose");
const btnMenu = document.querySelector(".buttonShowMenu");
const btnIntro = document.querySelector(".btn-intro");
const videoIntro = document.querySelector("#videoIntro");


window.onload = function () {
    new MenuHandler("menuMain");
    new ModuleLoader();

    btnIntro.addEventListener("click", () => {
        videoIntro.play();
        const introdution = document.querySelector(".introduction");
        introdution.classList.add("hidden");
    }, false)
    
    btnMenu.addEventListener("click", () => {
        menu.classList.toggle("show")
    })

    videoIntro.addEventListener("ended", function () {
        videoIntro.classList.add("hidden")
        videoIntro.remove();
        const nav1Active = document.querySelector(".nav-item.active");
        nav1Active.click();
        
    }, false)

    onLoadAbout();
}

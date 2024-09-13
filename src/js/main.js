
import ModuleLoader from "./SceneLoader.js";
import MenuHandler from "./Menu.js";
import { onLoadAbout } from "./index.js";

const menu = document.querySelector("#menuLeft");
const buttonClose = document.querySelector(".buttonClose");
const btnMenu = document.querySelector(".buttonShowMenu");
const btnIntro = document.querySelector(".btn-intro");

btnIntro.addEventListener("click" , () => {
    const nav1Active = document.querySelector(".nav-item.active");
    nav1Active.click();

    const introdution = document.querySelector(".introduction");
    introdution.classList.add("hidden")
})


btnMenu.addEventListener("click", () => {
    menu.classList.toggle("show")
})


window.onload = function () {
    new MenuHandler("menuMain")
    new ModuleLoader()
    onLoadAbout();
}
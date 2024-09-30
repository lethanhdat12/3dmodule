import { $$, $ } from "./index.js";
import ModuleLoader from "./SceneLoader.js";
import { dataJson , videoSrcs , srcVoidMC } from "../../data.js";
export default class MenuHandler {
    constructor(element) {
        this.element = element;
        this.modulesAddScene = [];
        this.first = true;
        this.langguague = "vi";
        this.initMenu();
        this.handleMenuHeader();
        this.handleClosePop();
        this.handleMultiLanguague();
        this.handleMenuMc();
        this.handleMuteVolume();
        this.moduleLoader = new ModuleLoader();
        this.moduleLoader.createScene();
        const moduleNames = dataJson.map((i) => i.name);
        this.muteState = true;
        this.mcState = true;
        setTimeout(() => {
          moduleNames.forEach(i => this.moduleLoader.loadModule(i))
        } , 150000)
        this.videoSrcs = {...videoSrcs}

        this.srcVoidMC = {...srcVoidMC}
    }

    initMenu() {
        this.menu = document.querySelector(`.${this.element}`);
        this.menuChild = this.menu.children;
        if (this.menuChild) {
            this.handleEvent();
        }
    }

    handleMenuHeader() {
        const menuHeader = $$(".nav-item");
        const roomItems = $$(".room-item");
        this.menuHeader = menuHeader;
        this.roomItems = roomItems;
        menuHeader.forEach((i) => {
            i.addEventListener("click", (event) => this.handleClickItem(i, event))
        })
    }

    handleClickItem(elm, evt) {
        this.menuHeader.forEach(i => i.classList.remove("active"));
        $$(".menuitem-box").forEach((i) => i.classList.remove("active"))
        elm.classList.add("active");
        let room = elm.getAttribute("data-room");
        if (room) {
            let videos = $$(".video-mc");
            videos.forEach((i) => {
                i.classList.add("hidden")
                i.pause()
            })
            const roomElm = $(`.${room}`);
            const videomc = $("#video-mc");
            videomc.load()
            const source = $("#video-mc source");

            if (this.first) {
                const btnShowMenuRight = $(".buttonShowMenuright");
                if(btnShowMenuRight){
                btnShowMenuRight.click();
                }
                this.first = false
            }

            const srcVideo = this.videoSrcs[room];
            const textMc = $(".content-mc-read p");
            textMc.innerHTML = this.srcVoidMC[room]
            source.setAttribute("src", srcVideo);
            source.setAttribute('type', 'video/webm');
            if (this.muteState && this.mcState) {
                videomc.play();
            }

            const about = $(".about");
            this.roomItems.forEach((i) => i.classList.add("hidden"))
            if(roomElm){
                roomElm.classList.add("show");
                roomElm.classList.remove("hidden");
            }
            about.classList.remove("show");


            // handle menu
            let menuItem = document.querySelector(`#${room}-menu`);
            menuItem.classList.add("active")
        }
    }


    handleEvent() {
        let length = this.menuChild.length;
        const popup = $("#popup");
        const descContentPopup = $(".descContentPopup");
        const module3dLoadTitle = $(".module3dLoad-title");

        for (let i = 0; i < length; i++) {
            const elm = this.menuChild[i];
            if (elm) {
                elm.addEventListener("click", (e) => {
                    let moduleName = e.target.getAttribute("data-name");
                    popup.classList.toggle("show");
                    this.loadModule(moduleName);
                    let desc = dataJson.find(i => i["name"] === moduleName)
                    descContentPopup.innerText = desc.detail[this.langguague]["desc"];
                    module3dLoadTitle.innerText = desc.detail[this.langguague]["title"];
                })
            }
        }
    }

    handleMultiLanguague() {
        const langs = $$(".icon-trans");
        langs.forEach((i) => {
            i.addEventListener("click", (e) => {
                let lang = i.getAttribute("data-languague");
                this.langguague = lang;
                this.forceUpdateLanguague(lang)
            })
        })
    }

    forceUpdateLanguague(lang) {
        let translate = document.querySelectorAll(".translation");
        translate.forEach((i) => {
            let text = i.getAttribute(`data-translate-${lang}`);
            i.innerText = text
        })
    }

    loadModule(moduleName) {
        const scene = this.moduleLoader.scene;
        let esxited = false;
        scene.children.forEach(i => {
            if (i.isObjectCustom) {
                i.visible = false;
            }
            if (i.nameObject && i.nameObject === moduleName) {
                i.visible = true;
                esxited = true;
            }
        })

        if (esxited) return;
        this.moduleLoader.loadModule(moduleName);
    }

    handleClosePop() {
        const btnClose = $(".buttonClose");
        const popup = $("#popup");
        btnClose.addEventListener("click", () => {
            popup.classList.toggle("show");
        })
    }

    handleMenuMc() {
        const btn = $(".buttonShowMenuright");
        const menuRight = $("#menu-right")
        btn.addEventListener("click", () => {
            let check = menuRight.classList.contains("hidden")
            const videomc = $("#video-mc");
            if (check) {
                this.mcState = true
                menuRight.classList.remove("hidden")
                if (this.muteState) {
                    videomc.play();
                }
            } else {
                this.mcState = false;
                menuRight.classList.add("hidden")
                if (this.muteState) {
                    videomc.pause();
                }
            }
        })
    }

    handleMuteVolume() {
        const btnVolume = $(".volume");
        btnVolume.addEventListener("click", () => {
            const videomc = $("#video-mc");
            const volumeIcon = $(".volume-icon");
            if (videomc.paused) {
                if (this.mcState) {
                    videomc.play();
                }
                volumeIcon.classList.remove("mute")
                volumeIcon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
                this.muteState = true;
            } else {
                if (this.mcState) {
                    videomc.pause();
                }
                volumeIcon.classList.add("mute")
                volumeIcon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
                this.muteState = false;
            }
        })
    }
}
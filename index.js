const electron = require('electron')
const { app, BrowserWindow } = electron
const { Menu, Tray } = electron // un exemple de fonctionnalit�s suppl�mentaires.
const ipc = electron.ipcMain

// notez que j'utilise un peu d'ES6 car Electron le permet
let home // je d�clare donc ma variable qui va pointer vers ma fen�tre

// une fois qu'Electron est pr�t, il va executer le callback que nous lui passons
// vous constaterez que nous utilisons un systeme d'event pour dire quoi faire
// � Electron.
app.on('ready', () => {

    // 'home' va pointer vers notre fen�tre
    home = new BrowserWindow({
        width: 950,
        height: 600,
        frame: false
    })

    // nous lui indiquons o� chercher notre fichier HTML
    // qui servira comme pointer d'entr� pour notre application
    // ( ne pas confondre le point d'entr� pour Electron, et pour le DOM
    // Electron fonctionne sous 2 process, le main process qui utilise ce code,
    // et le renderer process qui va utiliser notre index.html qui lui pourra
    // charger des scripts JS, du CSS, des images etc...
    home.loadURL(`file://${__dirname}/app/home/index.html`)

    // pour simplifier notre vie nous ouvrons la console
    home.webContents.openDevTools()

    home.on('closed', () => {
        home = null
    })

    // l�, nous d�clarons un event perso et lui disons quoi faire lorsque cet event
    // est d�clench�, �a sert de passerelle entre le renderer process et le main.
    ipc.on('home-reload', () => home.reload())
})

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin')
        app.quit()

})
var thing = document.querySelector("#thing");
    var container = document.querySelector("#container");

    container.addEventListener("click", getClickPosition , false);
    function getClickPosition(e){
        var xposition = e.clientX - (thing.offsetWidth /2);
        var yposition = e.clientY - (thing.offsetHeight /2);
        var translate3dValue = "translate3d("+ xposition + "px," + yposition + "px,0)";
        thing.style.transform = translate3dValue
    }

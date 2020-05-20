const electron = require('electron')
const { app, BrowserWindow } = electron
const { Menu, Tray } = electron // un exemple de fonctionnalités supplémentaires.
const ipc = electron.ipcMain

// notez que j'utilise un peu d'ES6 car Electron le permet
let home // je déclare donc ma variable qui va pointer vers ma fenêtre

// une fois qu'Electron est prêt, il va executer le callback que nous lui passons
// vous constaterez que nous utilisons un systeme d'event pour dire quoi faire
// à Electron.
app.on('ready', () => {

    // 'home' va pointer vers notre fenêtre
    home = new BrowserWindow({
        width: 950,
        height: 600,
        frame: false
    })

    // nous lui indiquons où chercher notre fichier HTML
    // qui servira comme pointer d'entré pour notre application
    // ( ne pas confondre le point d'entré pour Electron, et pour le DOM
    // Electron fonctionne sous 2 process, le main process qui utilise ce code,
    // et le renderer process qui va utiliser notre index.html qui lui pourra
    // charger des scripts JS, du CSS, des images etc...
    home.loadURL(`file://${__dirname}/app/home/index.html`)

    // pour simplifier notre vie nous ouvrons la console
    home.webContents.openDevTools()

    home.on('closed', () => {
        home = null
    })

    // là, nous déclarons un event perso et lui disons quoi faire lorsque cet event
    // est déclenché, ça sert de passerelle entre le renderer process et le main.
    ipc.on('home-reload', () => home.reload())
})

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin')
        app.quit()

})
import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { fetchInspectLinkFromSteam, fetchInspectDataFromAPI } from "./fetch.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});

    if (isDev()) {
        mainWindow.loadURL('http://localhost:9999/');
    } else {
        // Load initial file inside mainWindow
        // path helps configure Windows' \
        mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
    }

    // const itemName = "Charm%20%7C%20Lil'%20Zen";
    const itemName = "Charm%20%7C%20Pinch%20O'%20Salt";
    const pageCount = 1;


    async function temp() {
        const data = await fetchInspectLinkFromSteam(itemName, pageCount);
        // @ts-ignore
        fetchInspectDataFromAPI(data?.inspectLink);
    }

    setInterval(async () => {
        temp()
    }, 2000)
})
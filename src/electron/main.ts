import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { fetchSteamUrl, fetchCSFloatURL } from "./fetch.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});

    if (isDev()) {
        mainWindow.loadURL('http://localhost:9999/')
    } else {
        // Load initial file inside mainWindow
        // path helps configure Windows' \
        mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
    }

    // fetchSteamUrl();
    fetchCSFloatURL();
})
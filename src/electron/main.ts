import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { fetchInspectLinkFromSteam, fetchInspectDataFromAPI, fetchFromCSFloat } from "./fetch.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});

    if (isDev()) {
        mainWindow.loadURL('http://localhost:9999/');
    } else {
        // Load initial file inside mainWindow
        // path helps configure Windows' \
        mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
    }

    const itemName = "Charm%20%7C%20Lil'%20Zen";
    // const itemName = "Charm%20%7C%20Lil'%20Facelift";
    const pageCount = 10; // 1, 10

    async function temp() {
        const listingArray = await fetchInspectLinkFromSteam(itemName, pageCount);
        // @ts-ignore
        const arr = await fetchInspectDataFromAPI(listingArray);

        console.log(arr)


        // console.log("Charm: " + decodeURI(itemName))
        // console.log("Charm Price: $" + data?.priceConverted)
        // console.log("Charm Pattern: " + pattern)
        // console.log("Charm Location: " + data?.latestListingIndex + "\n")
    }

    temp()

    // setInterval(async () => {
    //     temp()
    // }, 15000)

    // const limit = 1;
    // const sort = "most_recent"
    // const type = "buy_now"
    // const hash = "Charm | Lil' Zen"
    // // @ts-ignore
    // fetchFromCSFloat(limit, sort, undefined, undefined, null, type, hash);
})
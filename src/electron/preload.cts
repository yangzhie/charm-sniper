// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

const API = {
	getStaticData: () => ipcRenderer.invoke("get-static-data"),
	startCharmPolling: (charmName) =>
		ipcRenderer.send("start-charm-polling", charmName),
	onCharmDataUpdate: (callback) =>
		ipcRenderer.on("charm-data-update", (_event, data) => callback(data)),
};

contextBridge.exposeInMainWorld("api", API);

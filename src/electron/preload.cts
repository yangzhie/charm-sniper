// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

const API = {
	getStaticData: () => ipcRenderer.invoke("get-static-data"),
	startCharmPolling: (charmName) =>
		ipcRenderer.send("start-charm-polling", charmName),
	onCharmDataUpdate: (callback) =>
		ipcRenderer.on("charm-data-update", (_event, data) => callback(data)),
	onError: (callback) =>
		ipcRenderer.on("error", (_event, error) => callback(error)),
	notify: (title, body) => ipcRenderer.send("notify", { title, body }),
	invokeCSFloatData: (charmName) =>
		ipcRenderer.invoke("csfloat-data", charmName),
	onCSFloatDataUpdate: (callback) =>
		ipcRenderer.on("csfloat-data-update", (_event, data) => callback(data)),
	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
};

contextBridge.exposeInMainWorld("api", API);

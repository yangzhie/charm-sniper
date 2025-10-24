import { contextBridge, ipcRenderer } from "electron";

console.log("Preload script loaded");

const API = {
	// @ts-ignore
	// Defines function, accepts msg, sends to backend
	sendMsg: (msg) => ipcRenderer.send("message", msg),
};

contextBridge.exposeInMainWorld("api", API);

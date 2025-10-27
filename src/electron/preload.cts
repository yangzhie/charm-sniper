import { contextBridge, ipcRenderer } from "electron";

const API = {
	getStaticData: () => ipcRenderer.invoke("get-static-data"),
};

contextBridge.exposeInMainWorld("api", API);

// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

const API = {
	getStaticData: () => ipcRenderer.invoke("get-static-data"),
	listenCharmName: (charmName) => {
		return ipcRenderer.invoke("listen-charm-name", charmName);
	},
};

contextBridge.exposeInMainWorld("api", API);

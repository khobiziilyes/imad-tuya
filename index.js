import { TuyaContext } from "@tuya/tuya-connector-nodejs";

const tuya = new TuyaContext({
	baseUrl: "https://openapi.tuyaeu.com",
	accessKey: "5qaj8wgkmmptrhdp8jrc",
	secretKey: "0c2d21d3c81347e2b6ae3ce7cd5a525b",
	version: "v2",
});

const device = await tuya.device.detail({
	device_id: "bf9ae1783ac42d4fd1ubpu",
});

tuya.device.console.log(device);

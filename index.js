import { TuyaContext } from "@tuya/tuya-connector-nodejs";

async function getProperty(device_id, code) {
	return await tuya
		.request({
			path: `/v2.0/cloud/thing/${device_id}/shadow/properties?codes=${code}`,
			method: "GET",
		})
		.then(res => res.result.properties[0].value);
}

async function setBrightness(device_id, value) {
	const commands = await tuya.request({
		path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
		method: "POST",
		body: {
			properties: JSON.stringify({ bright_value: value }),
		},
	});

	console.log("Executed command:", commands);
}

async function getBrightness(device_id) {
	return await getProperty(device_id, "bright_value");
}

async function setLed(device_id, value) {
	const commands = await tuya.request({
		path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
		method: "POST",
		body: {
			properties: JSON.stringify({ switch_led: value }),
		},
	});

	console.log("Executed command:", commands);
}

async function getLed(device_id) {
	return await getProperty(device_id, "switch_led");
}

async function switchLed(device_id) {
	const currVal = await getLed(device_id);
	await setLed(device_id, !currVal);
}

async function switchBrightness(device_id) {
	const currVal = await getBrightness(device_id);
	await setBrightness(device_id, currVal > 900 ? 10 : currVal + 200);
}

const tuya = new TuyaContext({
	baseUrl: "https://openapi.tuyaeu.com",
	accessKey: "5qaj8wgkmmptrhdp8jrc",
	secretKey: "0c2d21d3c81347e2b6ae3ce7cd5a525b",
	version: "v2",
});

const device = await tuya.device.detail({
	device_id: "bf3cf2aea410b79b46hqvt",
});

const {
	result: { id: device_id },
} = device;

console.log("Device ID:", device_id);

await switchBrightness(device_id);

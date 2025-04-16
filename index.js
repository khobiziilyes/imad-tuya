import { TuyaContext } from "@tuya/tuya-connector-nodejs";

async function switchLed(device_id, value) {
	const commands = await tuya.request({
		path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
		method: "POST",
		body: {
			properties: JSON.stringify({ switch_led: true }),
		},
	});

	console.log("Executed command:", commands);
}

async function getLed(device_id) {
	const commands = await tuya
		.request({
			path: `/v2.0/cloud/thing/${device_id}/shadow/properties?codes=switch_led`,
			method: "GET",
		})
		.then(res => res.result.properties[0].value);
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

// switchLed(device_id, true);
getLed(device_id);

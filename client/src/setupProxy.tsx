import { createProxyMiddleware } from "http-proxy-middleware";

const func = (app: any) => {
	const socketProxy = createProxyMiddleware("/socket", {
		target: "http://192.168.1.149:4000",
		changeOrigin: true,
		ws: true,
		logLevel: "debug",
	});

	app.use(socketProxy);
};

export default func;

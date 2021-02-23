import { createProxyMiddleware } from "http-proxy-middleware";

const func = (app: any) => {
	const socketProxy = createProxyMiddleware("/socket", {
		target: "http://localhost:4000",
		changeOrigin: true,
		ws: true,
		logLevel: "debug",
	});

	app.use(socketProxy);
};

export default func;

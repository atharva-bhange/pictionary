import { AxiosResponse } from "axios";

type AxiosResponseHandler = (res: AxiosResponse<any>) => void;

class apiHandler {
	axiosPromise: Promise<AxiosResponse<any>>;
	codeResponseMapper: { [key: number]: AxiosResponseHandler } = {};
	errorHandler: AxiosResponseHandler = () => {};

	constructor(axiosPromise: Promise<AxiosResponse<any>>) {
		this.axiosPromise = axiosPromise;
	}
	code = (resposeCode: number, handler: AxiosResponseHandler) => {
		this.codeResponseMapper[resposeCode] = handler;
		return this;
	};
	onError = (errorHandlerFunction: AxiosResponseHandler) => {
		this.errorHandler = errorHandlerFunction;
	};
	call = () => {
		this.axiosPromise
			.then((res) => {
				const actualResponseCode = res.status;
				const runner = this.codeResponseMapper[actualResponseCode];
				if (runner) runner(res);
			})
			.catch((err) => {
				const actualResponseCode = err.response.status;
				const runner = this.codeResponseMapper[actualResponseCode];
				if (runner) runner(err.response);
				this.errorHandler(err.response);
			});
	};
}

export default apiHandler;

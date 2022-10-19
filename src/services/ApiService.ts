import HttpService from "./HttpService";

export const getStats = () => HttpService.Get("/stats");

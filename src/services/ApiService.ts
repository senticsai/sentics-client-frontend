import HttpService from "./HttpService";

export const getDetailedAnalytics = (query: AnalyticsQuery) => HttpService.Post("/analytics/detailed", query);

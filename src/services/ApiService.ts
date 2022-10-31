import HttpService from "./HttpService";

export const getDetailedAnalytics = (query: AnalyticsQuery) => HttpService.Post("/analytics/detailed", query);

export const getHeatmap = (query: HeatmapQuery) => HttpService.Get(`/analytics/heatmap?detailLevel=${query.detailLevel}&startDateTime=${query.startDateTime}&endDateTime=${query.endDateTime}`);

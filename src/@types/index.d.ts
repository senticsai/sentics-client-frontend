export {};

declare global {
  interface EntitiesPayload {
    human: { [key: string]: Position };
    vehicle: { [key: string]: Position };
  }

  interface Position {
    x: number;
    y: number;
    heading: number;
    t: number;
  }

  interface NewPosition extends Position {
    kind: string
    id: string
  }

  interface AnalyticsQuery {
    analytics: 'safety' | 'efficiency';
    metric: 'safety score' | 'number of objects' | 'distance';
    aggregation: 'none' | 'avg' | 'min' | 'max';
    classes: 'human' | 'vehicle'[];
    minThreshold: number;
    maxThreshold: number;
    startDateTime: string;
    endDateTime: string;
  }

  interface HeatmapQuery {
    detailLevel: number;
    startDateTime: string;
    endDateTime: string;
  }
}

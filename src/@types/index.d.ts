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
}

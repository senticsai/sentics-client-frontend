export {};

declare global {
  interface PositionPayload {
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

export function getMiddlePoint(points) {
  const x = points.map(point => point[0]);
  const y = points.map(point => point[1]);

  return [(Math.max(...x) + Math.min(...x)) / 2, (Math.max(...y) + Math.min(...y)) / 2];
}

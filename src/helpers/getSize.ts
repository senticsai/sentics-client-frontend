export function getSize(points) {
  const x = points.map(point => point[0]);
  const y = points.map(point => point[1]);

  return [Math.max(...x) - Math.min(...x), Math.max(...y) - Math.min(...y)];
}

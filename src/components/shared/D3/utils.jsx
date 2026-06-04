export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function polygon(centerX, centerY, points, radius) {
  const degreeIncrement = 360 / points;
  const d = new Array(points).fill("_").map((p, i) => {
    const point = polarToCartesian(
      centerX,
      centerY,
      radius,
      degreeIncrement * i,
    );
    return `${point.x},${point.y}`;
  });
  return `M${d}Z`;
}

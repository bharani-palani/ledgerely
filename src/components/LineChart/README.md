# Custom LineChart Component

A modern, Vite-compatible React LineChart component that replaces the legacy `react-linechart` npm package.

## Features

- ✅ **Vite Compatible**: No DOM-global dependencies, works perfectly with Vite
- ✅ **Zero D3 Dependency**: Uses pure SVG rendering with simple math
- ✅ **React Hooks**: Modern functional component with hooks
- ✅ **Same API**: Drop-in replacement for `react-linechart` with same props
- ✅ **Responsive**: SVG-based, scales to any viewport
- ✅ **Customizable**: Full control over colors, labels, ticks, tooltips, and more

## Installation

Already included in the project at `src/components/LineChart/`

## Basic Usage

```jsx
import LineChart from "../LineChart";

const data = [
  {
    color: "steelblue",
    name: "Series 1",
    points: [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
      { x: 3, y: 15 }
    ]
  }
];

export default function MyChart() {
  return (
    <LineChart
      data={data}
      width={800}
      height={400}
      xLabel="Time"
      yLabel="Value"
    />
  );
}
```

## Props

### Required
- **data** (`Array<Object>`): Array of line objects with `color`, `name`, and `points` array

### Dimensions
- **width** (`Number|String`, default: `1024`): Chart width
- **height** (`Number|String`, default: `720`): Chart height
- **margins** (`Object`, default: `{ top: 50, right: 20, bottom: 50, left: 55 }`): Chart margins

### Axis Labels
- **xLabel** (`String`, default: `"X"`): X-axis label
- **yLabel** (`String`, default: `"Y"`): Y-axis label
- **hideXLabel** (`Boolean`, default: `false`): Hide X-axis label
- **hideYLabel** (`Boolean`, default: `false`): Hide Y-axis label
- **hideXAxis** (`Boolean`, default: `false`): Hide X-axis entirely
- **hideYAxis** (`Boolean`, default: `false`): Hide Y-axis entirely

### Data Scaling
- **xMin** (`String|Number`): Minimum X value (auto-detected if not provided)
- **xMax** (`String|Number`): Maximum X value (auto-detected if not provided)
- **yMin** (`String|Number`): Minimum Y value (auto-detected if not provided)
- **yMax** (`String|Number`): Maximum Y value (auto-detected if not provided)

### Date/Parsing
- **isDate** (`Boolean`, default: `false`): Treat X values as dates
- **xParser** (`Function`): Custom parser for X values
- **xDisplay** (`Function`): Custom display formatter for X-axis ticks
- **ticks** (`Number`, default: `10`): Number of ticks on both axes

### Rendering
- **hideLines** (`Boolean`, default: `false`): Don't draw lines (scatter plot mode)
- **hidePoints** (`Boolean`, default: `false`): Don't show point markers
- **pointRadius** (`Number`, default: `5`): Radius of point markers in pixels
- **interpolate** (`String`, default: `"cardinal"`): Line interpolation (currently uses straight lines)
- **strokeWidth** (`Number`, default: `2`): Line stroke width

### Callbacks
- **onPointClick** (`Function`): Called when clicking a point - `(event, point) => {}`
- **onPointHover** (`Function`): Called when hovering a point - returns HTML or string for tooltip
- **onTextClick** (`Function`): Called when clicking axis labels
- **onTextHover** (`Function`): Called when hovering axis labels

### Legend
- **showLegends** (`Boolean`, default: `false`): Show chart legend
- **legendPosition** (`String`, default: `"top-left"`): Position of legend - one of `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`

### CSS Classes
- **tooltipClass** (`String`, default: `"svg-line-chart-tooltip"`): CSS class for tooltips
- **pointClass** (`String`, default: `"svg-line-chart-point"`): CSS class for point markers
- **labelClass** (`String`, default: `"svg-line-chart-label"`): CSS class for labels
- **id** (`String`): Unique ID for the chart SVG element

## Data Format

Each line object should have:

```javascript
{
  id: "optional-unique-id",
  name: "Line Name",
  color: "#ff0000",  // hex, rgb, or named color
  points: [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 }
  ]
}
```

## Examples

### Date-based X Axis

```jsx
const data = [
  {
    color: "green",
    name: "Revenue",
    points: [
      { x: "2024-01-01", y: 1000 },
      { x: "2024-01-02", y: 1500 },
      { x: "2024-01-03", y: 1200 }
    ]
  }
];

<LineChart
  data={data}
  isDate={true}
  width={800}
  height={400}
/>
```

### With Tooltips

```jsx
const data = [
  {
    color: "blue",
    name: "Users",
    points: [
      { x: 1, y: 100 },
      { x: 2, y: 150 },
      { x: 3, y: 140 }
    ]
  }
];

<LineChart
  data={data}
  width={800}
  height={400}
  onPointHover={(point) => `Value: ${point.y}`}
  tooltipClass="custom-tooltip"
/>
```

### Scatter Plot

```jsx
<LineChart
  data={data}
  hideLines={true}
  showLegends={true}
  width={800}
  height={400}
/>
```

## Styling

The component uses CSS classes that can be customized:

```css
.linechart-container {
  /* Main container */
}

.linechart-svg {
  /* SVG element */
}

.svg-line-chart-point {
  /* Point markers */
}

.svg-line-chart-tooltip {
  /* Tooltip styling */
}

.svg-line-chart-label {
  /* Axis labels */
}

.linechart-legend {
  /* Legend container */
}
```

## Migration from react-linechart

Replace:
```jsx
import LineChart from "react-linechart";
import "react-linechart/dist/styles.css";
```

With:
```jsx
import LineChart from "../LineChart";
```

The props remain the same in most cases!

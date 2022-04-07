"use strict";

const grid_size = 67;
const x_axis_starting_point = {number: 1, suffix: ''};
const y_axis_starting_point = {number: 1, suffix: ''};

let canvas;
let ctx;
let canvas_width;
let canvas_height;

let point_number = 1;

let num_lines_x;
let num_lines_y;
let x_axis_distance_grid_lines;
let y_axis_distance_grid_lines;

window.addEventListener('load', function () {
  canvas = document.getElementById("axes");
  ctx = canvas.getContext("2d");

  canvas_width = canvas.offsetWidth;
  canvas_height = canvas.offsetHeight;

  canvas.setAttribute('width', canvas_width.toString());
  canvas.setAttribute('height', canvas_height.toString());

  const result_table_body = document.getElementById("result-table").getElementsByTagName('tbody')[0];
  const result_table_head = document.getElementById("result-table").getElementsByTagName('thead')[0];
  const tbody_height = canvas_height - result_table_head.offsetHeight;
  console.log(result_table_head.offsetHeight);
  result_table_body.setAttribute('height', tbody_height.toString());

  num_lines_x = Math.floor(canvas_height / grid_size);
  num_lines_y = Math.floor(canvas_width / grid_size);
  x_axis_distance_grid_lines = Math.floor(num_lines_x / 2);
  y_axis_distance_grid_lines = Math.floor(num_lines_y / 2);

  update(2);
})

function draw_axes() {
  // Draw grid lines along X-axis
  let i;
  for (i = 0; i <= num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if (i === x_axis_distance_grid_lines)
      ctx.strokeStyle = "#000000";
    else
      ctx.strokeStyle = "#e9e9e9";

    if (i === num_lines_x) {
      ctx.moveTo(0, grid_size * i);
      ctx.lineTo(canvas_width, grid_size * i);
    } else {
      ctx.moveTo(0, grid_size * i + 0.5);
      ctx.lineTo(canvas_width, grid_size * i + 0.5);
    }
    ctx.stroke();
  }

  // Draw grid lines along Y-axis
  for (i = 0; i <= num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if (i === y_axis_distance_grid_lines)
      ctx.strokeStyle = "#000000";
    else
      ctx.strokeStyle = "#e9e9e9";

    if (i === num_lines_y) {
      ctx.moveTo(grid_size * i, 0);
      ctx.lineTo(grid_size * i, canvas_height);
    } else {
      ctx.moveTo(grid_size * i + 0.5, 0);
      ctx.lineTo(grid_size * i + 0.5, canvas_height);
    }
    ctx.stroke();
  }
}

function draw_area(r) {
  ctx.translate(y_axis_distance_grid_lines * grid_size,
      x_axis_distance_grid_lines * grid_size);

  ctx.fillStyle = "rgba(2,126,255,0.5)";

  // First quarter
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(r * grid_size / 2,0);
  ctx.lineTo(0, -r * grid_size / 2);
  ctx.fill();

  // Second quarter
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r * grid_size, -Math.PI / 2, Math.PI, true);
  ctx.fill();

  // Third quarter
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-r * grid_size / 2, 0);
  ctx.lineTo(-r * grid_size / 2, r * grid_size);
  ctx.lineTo(0, r * grid_size);
  // ctx.lineTo(0, 0);
  ctx.fill();

  ctx.translate(-y_axis_distance_grid_lines * grid_size,
      -x_axis_distance_grid_lines * grid_size);
}

function draw_labels() {
  // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  ctx.translate(y_axis_distance_grid_lines * grid_size,
      x_axis_distance_grid_lines * grid_size);

  ctx.fillStyle = "#000000";

  // Ticks marks along the positive X-axis
  for (let i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(grid_size * i + 0.5, -3);
    ctx.lineTo(grid_size * i + 0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(
        x_axis_starting_point.number * i + x_axis_starting_point.suffix,
        grid_size * i - 2, 15);
  }

  // Ticks marks along the negative X-axis
  for (let i = 1; i < y_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-grid_size * i + 0.5, -3);
    ctx.lineTo(-grid_size * i + 0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(
        -x_axis_starting_point.number * i + x_axis_starting_point.suffix,
        -grid_size * i + 3, 15);
  }

  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for (let i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, grid_size * i + 0.5);
    ctx.lineTo(3, grid_size * i + 0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(
        -y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8,
        grid_size * i + 3);
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for (let i = 1; i < x_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -grid_size * i + 0.5);
    ctx.lineTo(3, -grid_size * i + 0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(
        y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8,
        -grid_size * i + 3);
  }

  ctx.translate(-y_axis_distance_grid_lines * grid_size,
      -x_axis_distance_grid_lines * grid_size);
}

function update(r) {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  draw_axes();
  draw_labels();
  draw_area(r);
}

function draw_point(x, y, r) {
  update(r);

  ctx.translate(y_axis_distance_grid_lines * grid_size,
      x_axis_distance_grid_lines * grid_size);

  y *= -1;
  ctx.fillStyle = "rgb(255,89,122)"
  ctx.beginPath();
  ctx.arc(x * grid_size, y * grid_size, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.font = '8pt Calibri';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(point_number.toString(), x * grid_size, y * grid_size + 3);
  point_number++;

  ctx.translate(-y_axis_distance_grid_lines * grid_size,
      -x_axis_distance_grid_lines * grid_size);
}

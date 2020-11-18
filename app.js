window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const tools = document.querySelector(".tools");
  var BrushSize = document.querySelector("#brush-size");
  var EraserSize = document.querySelector("#eraser-size");
  var linecap = document.querySelectorAll(".btn");

  //color picker
  ej.base.enableRipple = true;

  var colorPicker = new ej.inputs.ColorPicker(
    {
      value: "#344aae",
      cssClass: "e-custom-picker",
      modeSwitcher: false,
      open: function (args) {
        args.element.querySelector(".e-handler").classList.add("e-icons");
      },
    },
    "#element"
  );

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth - tools.clientWidth;

  let painting = false;

  function startpos(e) {
    painting = true;
    draw(e);
  }
  function endpos() {
    painting = false;
    ctx.beginPath();
  }
  function draw(e) {
    if (!painting) return;

    ctx.lineWidth = BrushSize.value;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - tools.clientWidth, e.clientY);
    ctx.strokeStyle = colorPicker.value;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - tools.clientWidth, e.clientY);
  }

  canvas.addEventListener("mousedown", startpos);
  canvas.addEventListener("mouseup", endpos);
  canvas.addEventListener("mousemove", draw);
});

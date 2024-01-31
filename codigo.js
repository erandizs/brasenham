var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
var dibujandoCirculo,dibujandoLinea=false;
// coordenadas del mouse
var startX, startY, endX, endY;
//listener para el boton de circulo
document.getElementById('dibujarCirculoBtn').addEventListener('click', function() {
    dibujandoCirculo = true;
    dibujandoLinea = false; // no se dibuje una línea
});
//listener boton linea
document.getElementById('dibujarLineaBtn').addEventListener('click', function() {
    dibujandoLinea = true;
    dibujandoCirculo = false; //  no se dibuje un círculo
});
// agarrar las coordenadas del mouse cuqando hace clic
canvas.addEventListener('mousedown', function(event) {
    if(dibujandoCirculo || dibujandoLinea){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
    }
   
});

// cordenadas al soltar el mouse
canvas.addEventListener('mouseup', function(event) {
    endX = event.clientX - canvas.getBoundingClientRect().left; // x
    endY = event.clientY - canvas.getBoundingClientRect().top;   // y
    if(dibujandoCirculo){
       
        //calcular centro del circulo
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        
    //  dibujarLinea(startX,startY,endX,endY);
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2;
        dibujarCirculo(centerX,centerY,radius);
     
    }else if(dibujandoLinea){
        dibujarLinea(startX,startY,endX,endY);
    }
    
});
  

  function dibujarLinea(x0, y0, x1, y1) {
      // diferencia entre x y y
      let dx = x1 - x0;
      let dy = y1 - y0;

      //direccion en x y y
      let sx = (dx > 0) ? 1 : (dx < 0) ? -1 : 0; // 1 positivo, -1  negativo, 0 si es cero
      let sy = (dy > 0) ? 1 : (dy < 0) ? -1 : 0;

      dx = Math.abs(dx); // valor absoluto
      dy = Math.abs(dy);
      
      // el error es la dferencia del valor calculado y el que se quiere
      //en y
      let err = dx - dy;

      
      while (true) {
          //  píxel en la posición actual le mandio el color
          drawPixel(x0, y0, [0, 0, 0]);

          // se termina si son iguiales
          if (x0 === x1 && y0 === y1) break;

          
          let e2 = 2 * err;//se calcula para ver cuando cambiar a x o y
          

          // se actualiza la posicion
          if (e2 > -dy) {
              err -= dy;
              x0 += sx;
          }
          if (e2 < dx) {
              err += dx;
              y0 += sy;
          }
      }
  }

  function dibujarCirculo(x0, y0, radius) {
      let x = radius;
      let y = 0;
      let err = 0;

      while (x >= y) {
          drawPixel(x0 + x, y0 + y, [0, 0, 0]);
          drawPixel(x0 + y, y0 + x, [0, 0, 0]);
          drawPixel(x0 - y, y0 + x, [0, 0, 0]);
          drawPixel(x0 - x, y0 + y, [0, 0, 0]);
          drawPixel(x0 - x, y0 - y, [0, 0, 0]);
          drawPixel(x0 - y, y0 - x, [0, 0, 0]);
          drawPixel(x0 + y, y0 - x, [0, 0, 0]);
          drawPixel(x0 + x, y0 - y, [0, 0, 0]);

          if (err <= 0) {
              y += 1;
              err += 2 * y + 1;
          } else {
              x -= 1;
              err -= 2 * x + 1;
          }
      }
  }

  function drawPixel(x, y, color) {
       //  datos de píxeles del canvas
      var imageData = contexto.createImageData(1, 1);
      var data = imageData.data;

      //color del píxel
      data[0] = color[0];   // rojo
      data[1] = color[1];   // verde
      data[2] = color[2];   // azul
      data[3] = 255;        // opacidad

      // dibuja pixel
      contexto.putImageData(imageData, x, y);
  }
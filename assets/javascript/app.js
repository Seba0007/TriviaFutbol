$(document).ready(function () {

  const futbol = [
    {
    pregunta: "Cuantas copas del mundo tiene Brazil?",
    opciones: ["1 copa", "3 copas", "12 copas", "5 copas"],
    respuesta: 3,
    foto: "assets/images/brasilcopa.webp"
    },
    {
    pregunta: "cuantos goles hizo Bastituta en la fiorentina?",
    opciones: ["102 goles", "56 goles", "207 goles", "196 goles"],
    respuesta: 2,
    foto: "assets/images/bati.webp"
    },
    {
    pregunta: "cuantos goles hizo gallardo con river?",
    opciones: ["50 goles", "62 goles", "89 goles", "70 goles"],
    respuesta: 3,
    foto: "assets/images/Gallardo.webp"
    },
    {
    pregunta: "Cuantas copas america tiene Uruguay", 
    opciones: ["9 copa", "22 copas", "12 copas", "15 copas"],
    respuesta: 3,
    foto: "assets/images/Uruguay.webp"
    }
  ];

  var correctas = 0;
  var incorrectas = 0;
  var timer = 10;
  var timing = false;
  var intervalId;
  var propDelObjRdm;
  var propDelObjActual;
  var eleccionDelUsuario;
  var futbolHolder = [];
  var total = futbol.length;
  $(".reset").hide();

  $(".reset").on("click", function(){
  $(".reset").hide();
  $(".pregunta").empty();
  $(".respuesta").empty();

  for (let i = 0; i < futbolHolder.length; i++) {
    futbol.push(futbolHolder[i]);   
  }
    tiempoDeJuego();
    displayPregunta();
  })

  $(".start").on("click", function(){
    $(".start").hide();
    displayPregunta();
    tiempoDeJuego();
    for (let i = 0; i < futbol.length; i++) {
    futbolHolder.push(futbol[i]);          
  }
  })

  function decrement(){
    $(".tiempo").html("<h3 id='timer'> " + timer + "</h3>")
    timer--;
    if (timer===0) {
      incorrectas++;
      stop()
      $(".respuesta").html("<h6>Tiempo cumplido!!! La respuesta es  " + propDelObjActual.opciones[propDelObjActual.respuesta] + "</h6>"); 
      mostrarFoto()
    }
  };

  function tiempoDeJuego() {
    if (!timing) {
      intervalId = setInterval(decrement, 1000);
      timing = true;
    }
  };

  function stop() {
    timing = false;
    clearInterval(intervalId);
  };

  function displayPregunta() {
    propDelObjRdm = Math.floor(Math.random()*futbol.length);
    propDelObjActual = futbol[propDelObjRdm];
    $(".pregunta").html(`<h5> ${propDelObjActual.pregunta} </h5>`);

    for (let i = 0; i < propDelObjActual.opciones.length; i++) {
      let opciones = $("<div>");
      opciones.addClass("opciones");
      opciones.html(propDelObjActual.opciones[i]);
      opciones.attr("valor", i);
      $(".respuesta").append(opciones);
    }

    $(".opciones").on("click", function(){
      eleccionDelUsuario = parseInt($(this).attr("valor"));

      if (eleccionDelUsuario === propDelObjActual.respuesta) {
        correctas++;
        stop();
        $(".respuesta").html("<h5>Correcto</h5>");
        eleccionDelUsuario = "";
        mostrarFoto();
      }
      else{
        stop();
        incorrectas++;
        eleccionDelUsuario = "";
        $(".respuesta").html("<h5>Incorrecto! La Respuesta Correcta es " + propDelObjActual.opciones[propDelObjActual.respuesta] + "</h5>");
        mostrarFoto();
      }
    });
  }
  function mostrarFoto() {
    $(".respuesta").append("<img src= " + propDelObjActual.foto + ">");
    futbol.splice(propDelObjRdm, 1);

    setTimeout(function(){
      $(".respuesta").empty();
      timer = 10;
  
      if (correctas + incorrectas === total) {
        $(".pregunta").empty()
        $(".pregunta").html("<h4> JUEGO TERMINADO </h4>");
        $(".respuesta").append(`<h5> CORRECTAS: ${correctas} </h5>`);
        $(".respuesta").append(`<h5> INCORRECTAS: ${incorrectas} </h5>`);
        $(".reset").show();
        correctas = 0;
        incorrectas = 0;
      }
      else{
        displayPregunta();
        tiempoDeJuego();
      }
    }, 3000);
  }
  






});


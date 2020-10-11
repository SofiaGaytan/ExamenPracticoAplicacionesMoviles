function desactivarBoton() {
    var boton = document.getElementById("buscarB")
    boton.disabled=true;
    buscar()
}

function buscar() {
    var condicion = document.getElementById('condicion');
    var salida = document.getElementById('salida')
    
    condicion.innerHTML = ""
    estado = isDay()
    var ciudad = document.getElementById('ciudad')
    var ciudadNombre = document.getElementById('ciudad').value
    ciudad.disabled = true
    console.log(ciudadNombre)
    if (ciudadNombre != "") {
        var API = "http://api.openweathermap.org/data/2.5/weather?q=" + String(ciudadNombre) + ",mx&appid=74701570d748aeb44df4de011473e87e"
        console.log(API)
        var request = new XMLHttpRequest();
        console.log(request)
        request.open('GET', API, true); 
        request.send();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.response;
                var MyData = JSON.parse(data);
                console.log(MyData)
                var temperatura = document.getElementById('temperatura');
                temperatura.innerHTML = "<h1 class=\"display-2\" style=\"text-align:center\">" + String(parseInt(MyData.main.temp - 273.315)) + "°C</h1>"
                temperatura.innerHTML = temperatura.innerHTML + "<br><h5>Temperatura Maxima: " + String(parseInt(MyData.main.temp_max - 273.315)) + " °C</h5>"
                temperatura.innerHTML = temperatura.innerHTML + "<h5>Temperatura Minima: " + String(parseInt(MyData.main.temp_min - 273.315)) + " °C</h5>"
                var nombre = document.getElementById('Nombre')
                nombre.innerHTML = "<h3>"+ciudadNombre.toUpperCase()+"</h3>"
                aparecerImagen(estado, condicion, MyData)
                aparecer()
                salida.style.display = "inline"
            } else {
                if (this.status == 404 && this.readyState==4) {
                    var alerta2 = document.getElementById('alerta2');
                    alerta2.style.display = "inline";
                    salida.style.display = "inline"
                }
            }
        }
    } else {
        var alerta = document.getElementById('alerta');
        alerta.style.display = "inline";
        salida.style.display = "inline"
    }
}

function aparecer() {
    resultados = document.getElementById('resultados')
    resultados.style.display = "inline"
}

function isDay() {
    var fecha = new Date();
    var hora = fecha.getHours()
    if (hora >= 20 || hora < 8) {
        return false
    } else {
        return true
    }
}

function aparecerImagen(estado, condicion, datos) {
    var imagen = "";
    var descripcion = "";
    datos.weather.forEach(e => {
        console.log(e.main)
        switch (e.main) {
            case 'Clear':
                if (estado == true) {
                    imagen = "sun.png"
                } else {
                    imagen = "moon.png"
                }
                descripcion = "Despejado"
                break;
            case 'Clouds':
                imagen = "clouds.png"
                descripcion = "Nublado"
                break;
            case 'Rain':
                imagen = "lluvia.png"
                descripcion = "Lluvioso"
                break;
            case 'Thunderstorm':
                imagen = "tormenta.png"
                descripcion = "Tormenta Electrica"
                break;
            case 'Drizzle':
                imagen = "lluvia(1).png"
                descripcion = "Llovizna"
                break;
            case 'Squall':
                imagen = "lluvia(2).png"
                descripcion = "Chubasco"
                break;
            case 'Snow':
                imagen = "nevando.png"
                descripcion = "Nevando"
                break;
            case 'Mist':
            case 'Fog':
                imagen = "neblina.png"
                descripcion = "Niebla"
                break;
            case 'Humo':
                imagen = "neblina.png"
                descripcion = "Humo"
                break;
            case 'Haze':
                imagen = "neblina.png"
                descripcion = "Calina"
                break;
            case 'Sand':
                imagen = "neblina.png"
                descripcion = "Arena"
                break;
            case 'Dust':
                imagen = "neblina.png"
                descripcion = "Polvo"
                break;
            case 'Ash':
                imagen = "neblina.png"
                descripcion = "Ceniza"
                break;
            case 'Tornado':
                imagen = "tornado.png"
                descripcion = "Tornado"
                break;
        }
        condicion.innerHTML = "<br>" +
            "<div class=\"text-center\">" +
            "<img src=\"imagenes/" + imagen + "\" style=\"weidht:height: 100px; width: 100px\">" +
            "<br><h1 class=\"display-4\">" + descripcion + "</h1>" +
            "</div>"
    }
    )
}

function salir(){
    var salida = document.getElementById('salida')
    var alerta = document.getElementById('alerta')
    var alerta2 = document.getElementById('alerta2')
    var busqueda = document.getElementById('buscarB')
    var entrada = document.getElementById('ciudad')
    var resultados = document.getElementById('resultados')
    var ciudad = document.getElementById('ciudad')
    var temperatura = document.getElementById('temperatura')
    var condicion = document.getElementById('condicion')
    temperatura.innerHTML = ""
    condicion.innerHTML = ""
    alerta.style.display="none"
    alerta2.style.display="none"
    resultados.style.display="none"
    entrada.value = ""
    salida.style.display = "none"
    ciudad.disabled = false
    busqueda.disabled = false;
}

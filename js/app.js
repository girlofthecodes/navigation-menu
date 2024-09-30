/* 
TODO Hace alusion de la seccion que se esta diseñando 
? Define la variable creada 
! Define que hace el callback de una funcion  
& Define los cambios que afectaran los estilos
* Define el proposito de la funcion o del evento 
^ Define la funcion en el DOMLoaded
~ Define que hace cierto bloque
*/

//Todo: Edita el icono que corresponde al menu de navegación
const iconoMenu = document.querySelector('#icono-menu'), menu = document.querySelector('#menu');
iconoMenu.addEventListener('click', (e) => {
    menu.classList.toggle('active'); 
    document.body.classList.toggle('opacity');

    //& Cambia el icono de hamburguesa por uno de cierre
    const classActual  = e.target.getAttribute('class');
    if(classActual == 'fa-solid fa-bars fa-xl'){
        e.target.setAttribute('class', 'fa-solid fa-rectangle-xmark fa-xl');
    } else {
        e.target.setAttribute('class', 'fa-solid fa-bars fa-xl');
    }
});  

//Todo: Controla el "Hazte cliente" 
const client = document.querySelector('.client');
const btnClient = document.querySelector('#btn-client');

//*Controla el color de ciertos elementos 
client.addEventListener('mouseover', () => {
    client.style.color = 'var(--text)';
    btnClient.style.color = 'var(--text)';
});

client.addEventListener('mouseout', () => {
    client.style.color = 'var(--button-third-text)';
    btnClient.style.color = 'var(--button-third-text)';
});

//Todo: Control del contenedor de busqueda
const searchActive = document.querySelector('.search'), search = document.querySelector('#search'); 
searchActive.addEventListener('click', (e) => {
    if(search.classList.contains('activeSearch')){
        search.classList.remove('activeSearch');
        search.classList.add('inactiveSearch');
    } else {
        search.classList.remove('inactiveSearch');
        search.classList.add('activeSearch');
    }
});

//Todo: Control del contenedor access
const access = document.querySelector('.access'), container_access = document.querySelector('.container-access');
access.addEventListener('click', (e) => {
    container_access.classList.toggle('activeAccess'); 
    if(container_access.classList.contains('activeAccess')){
        container_access.style.height = '0'; 
    } else {
        container_access.style.height = '90vh';
    }
}); 

//Todo: Control del numero de tarjeta 
const sendNumber = document.querySelector('#continue'); 
const cardNumber = document.querySelector('#card-number'); //? Input donde se ingresa el numero de tarjeta
const containerCardNumber = document.querySelector(".card-number"); //? Contenedor que maneja el numero de tarjeta
const textColor = document.querySelector("#text-color"); //? Texco mensaje de error
const message_error = document.querySelector('.message-error'); //? Contenedor que maneja el mensaje de error
const password = document.querySelector('.password'); //? Contenedor donde se ingresa la contraseña
const cardNumberCopy = document.querySelector('#hidden-card-number'); 
const important = document.querySelector('.information-important'); //? Conteneiodr que maneja la informacion importante

//* Controla y valida lo que sucede al dar click en cierto elemento 
sendNumber.addEventListener('click', (e) => {
    let card_number = cardNumber.value; 
    console.log("input send: " + card_number);
    if(/^\d*$/.test(card_number)){
        password.style.display = 'flex';
    } else {
        containerCardNumber.style.backgroundColor = 'rgba(225, 97, 98, 0.4)';
        containerCardNumber.style.borderBottom = '1px solid rgb(225, 97, 98)';
        textColor.style.color = 'rgb(225, 97, 98)';  
        message_error.style.display = 'flex'; 
        important.style.marginTop = '80px';
    }
}); 


//* Controla el input del numero de cliente, pero es un dato sensible, asi que se reemplazan con *
cardNumber.addEventListener('input', (e) =>{
    const realValue = cardNumber.value; 
    // const maskedValue = realValue.length > 0
    //     ? '*'.repeat(realValue.length - 1) + (realValue[realValue.length - 1] || '')
    //     : '';
    // cardNumber.value = maskedValue;
}); 

//Todo: Controla el carrousel de informacion
let info_carrousel = [
    {
        "url":"/img/card-1.png", 
        "title":"<em>Aplazar</em> el miedo no es <br>posible, pero sí <em>el curso</em><br>para vencerlo", 
        "paragraph": "Ahora con tu Tarjeta de Débito <span>Manejo Total</span> también puedes diferir tus gastos."
    }, 
    {
        "url":"/img/credit-card-2.png", 
        "title":"<em>¡Buenas noticias!</em> Todo lo <br>que necesitas lo puedes encontrar en tu tarjeta <em>MT Credit Card</em>.", 
        "paragraph": ""
    }, 
    {
        "url":"/img/phone-app-card-2.png", 
        "title":"Compres lo que compres, <br>hazlo con <em>estilo</em>: sigue <br>pagando con tus tarjetas <br>MT porque es <em>fácil</em>, <br><em>seguro</em> y<em> sin contacto</em>", 
        "paragraph": ""
    }
]

const prev = document.querySelector('#prev'); //? Boton <
const next = document.querySelector('#next'); //? Boton >
const image = document.querySelector('.images'); //? Contenedor de la imagen
const img = document.querySelector('#img') //? Imagen
const title = document.querySelector('#title'); //? Elemento <h2></h2>
const paragraph = document.querySelector('#paragraph'); //? Elemento <p></p>
const boton = document.querySelector('#more'); //? Habilita y deshabilita el boton
const points = document.querySelectorAll('.points i');

const containerCarrousel = document.querySelector('.container'); //? Contenedor de todo el carrousel
let currentIndex = 0; 
const interval = 30000; 
let autoSlideInterval; //? Run/Stop el carrousel automatico

//Todo: Controla el Carrousel
//* Actualiza la informacion del carrousel a partir del arreglo
function updateDescription(){
    const currentItem = info_carrousel[currentIndex]; 

    //& Muestra el boton segun la posicion del carrousel
    boton.style.display = (currentIndex === 0 || currentIndex === 2) ? 'block' : 'none'; 

    //& Actualiza los elementos del carrousel segun la posicion en que vaya  
    img.src = `${currentItem.url}`; 
    title.innerHTML = currentItem.title; 
    paragraph.innerHTML = currentItem.paragraph; 

    //& Modifica las medidas de las imagenes 
    if(currentIndex == 1){
        img.style.height = '60%';
        image.style.display = 'flex';
        image.style.justifyContent = 'center';
        image.style.alignItems = 'center';
    }else if(currentIndex == 2){
        img.style.width = '100%';
        image.style.display = 'flex';
        image.style.justifyContent = 'center';
        image.style.alignItems = 'center';
    } else {
        img.style.width = '100%';
        img.style.height = '100%';
    }
    
    //! Actualiza los puntos del carrousel dependiendo el indice en que se encuentre
    positionCarrousel(currentIndex);    
}; 

//* Controla el punto relleno y sin relleno
function positionCarrousel(currentIndex){
    points.forEach((point, i) => {
        if(i == currentIndex){
            point.classList.remove("fa-regular", "fa-circle")
            point.classList.add("fa-solid", "fa-circle")
        } else if(i != currentIndex && point.classList.contains("fa-solid")){
            point.classList.replace("fa-solid", "fa-regular")
        }
    });
};

//* Controla el evento al hacer click en <
prev.addEventListener('click', () => {
    stopAutoSlide(); //~ Detiene el slide automático
    if (currentIndex === 0) {
        currentIndex = 2; 
    } else {
        currentIndex--; 
    }
    updateDescription(); 
});

//* Controla el evento al hacer click en >
next.addEventListener('click', () => {
    stopAutoSlide(); //~ Detiene el slide automático
    currentIndex = (currentIndex + 1) % info_carrousel.length;
    updateDescription();  
}); 

//* Maneja el movimiento segun el indice automaticamente
function moveToNextSlide(){
    currentIndex = (currentIndex + 1) % info_carrousel.length;
    updateDescription();
}

//* Función para iniciar el intervalo de automatización
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveToNextSlide();
    }, interval); //~ Cambia cada 3 segundos, ajusta según necesites
}

//* Detiene el intervalo automatico del carrousel
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

//* Controla los puntos del carrousel, desde POINTS 
function pointsCarrousel(){
    const pointsContainer = document.querySelector('#points'); //?Puntos del carrousel
    const points = pointsContainer.querySelectorAll('i'); 
    points.forEach((point, index) => {
        point.addEventListener("click", () => {
            currentIndex = index;
            updateDescription(); //! Actualiza los elementos del carrousel dependiendo el indice cuando se haga click en los puntos
        });
    });
}

//Todo: Controla el carrusel de las herramientas disponibles en la empresa
const tools = document.querySelectorAll('.tools_list li'); //? Items que representan las herramientas
const prevBtn = document.getElementById('btn_prev'); //? Boton >
const nextBtn = document.getElementById('btn_next'); //? Boton <

let currentStartIndex = 0; //? Mantiene que indice sera el primero en mostrar
const itemsPerPage = 6; //? Elementos que mostrara en un incio de la lista 

//* Gestiona la visualización de los elementos, asegurando que el rango correcto de elementos se muestre basado en CurrentStartIndex
function updateList(){
    tools.forEach((item, index) =>{
        if(index >= currentStartIndex && index < currentStartIndex + itemsPerPage){
            item.classList.add('active_list');
        }
    }); 

    //~ Controla el color de < > dependiendo currentStartIndex 
    prevBtn.style.color = currentStartIndex === 0 ? 'var(--button-first)':'var(--button-third)';
    nextBtn.style.color = currentStartIndex + itemsPerPage === tools.length ? 'var(--button-first)':'var(--button-third)';

    //~ Ajusta la posición del ul para el efecto de desplazamiento
    const ul = document.querySelector('.tools_list ul');
    ul.style.transform = `translateX(-${currentStartIndex * 190}px)`; //~ Ajusta que el desplazamiento suceda a 190px para que asi se oculte el elemento y muestre el nuevo
};

//* Funcionamiento de boton <
prevBtn.addEventListener('click', () => {
    if (currentStartIndex > 0) {
        currentStartIndex --; //~ Retroceder
        updateList(); 
    }
});

//* Funcionamiento de boton >
nextBtn.addEventListener('click', () => {
    if (currentStartIndex + itemsPerPage < tools.length) {
        currentStartIndex ++; //~ Avanzar
        updateList();
    }
});

//Todo: Controla lo que sucede al dar click en el boton > del menu de navegación
const btnViewMenu = document.querySelectorAll('#according-view'); //? Obtiene el total de elementos con el ID 
const nav = document.querySelector('.nav'); //? Maneja el contenedor <nav></nav>

//* Maneja el evento que sucedera al hacer click en los botones de la barra de navegacion >
btnViewMenu.forEach(btn => {
    btn.addEventListener('click', (e) => { 
        e.preventDefault();

        //~ Encuentra el according-list más cercano al botón que fue clikeado
        const accordingView = btn.closest('li').querySelector('.according-list');
        const transparent = document.querySelector('#transparent'); 
        //~  Alterna la visibilidad de according-list
        if (accordingView.style.display === 'none' || accordingView.style.display === '') {
            document.querySelectorAll('.according-list').forEach(item => {
                if (item !== accordingView) {
                    item.style.display = 'none';
                }
            });
            accordingView.style.display = 'block'; 
            transparent.style.display = 'block';
        } else {
            accordingView.style.display = 'none';
            transparent.style.display = 'none';
        }
    });
});

//Todo: Controla el carrousel que contiene el menu de navegación
const itemsNav = document.querySelectorAll('.items li'); //? items del carrusel del menu de navegacion
const prevBtnNav = document.getElementById('carrousel-menu-prev'); //? Boton nav <
const nextBtnNav = document.getElementById('carrousel-menu-next'); //? Boton nav >

let currentStartIndexNav = 0; //? Mantiene el valor del indice que aparecera en el primer lugar
const itemsPerPageNav = 3; //? Elementos maximos que se visualizaran en un inicio 

//* Gestiona la visualización de los elementos
function carrouselMenuNav(){
    itemsNav.forEach((item, index) => {
        item.classList.remove('active_item_nav');
        if(index >= currentStartIndexNav && index < currentStartIndexNav + itemsPerPageNav){
            item.classList.add('active_item_nav'); 
        }
    });

    //~ Contorla el color de < > dependiendo currentStartIndexNav
    prevBtnNav.style.color = currentStartIndexNav === 0 ? 'var(--button-first)': 'var(--button-fourth-text)';  
    prevBtnNav.style.backgroundColor = currentStartIndexNav === 0 ? 'var(--button-five)':'var(--button-six)';

    nextBtnNav.style.color = currentStartIndexNav + itemsPerPageNav === itemsNav.length ? 'var(--button-first)': 'var(--button-fourth-text)';
    nextBtnNav.style.backgroundColor = currentStartIndexNav + itemsPerPageNav === itemsNav.length ? 'var(--button-five)':'var(--button-six)';

    const ul = document.querySelector('.items ul'); 
    ul.style.transform = `traslateY(-${currentStartIndexNav * 200}px)`;

    positionCarrouselMenuNav(currentStartIndexNav) //! Actualiza los puntos del carrosuel
};

//* Gestiona el boton < del menu de navegacion
prevBtnNav.addEventListener('click', () => {
    if(currentStartIndexNav > 0){
        currentStartIndexNav--;
        carrouselMenuNav();
    }
});

//* Gestiona el boton > del menu de navegación
nextBtnNav.addEventListener('click', () => {
    if(currentStartIndexNav + itemsPerPageNav < itemsNav.length){
        currentStartIndexNav++;
        carrouselMenuNav();
    }
});

//* Controla los puntos del carrousel del menu de navegación
const pointsContainer = document.querySelector('.menu-nav-points'); //? Contenedor de los puntos en el menu de navegación
const pointsNav = pointsContainer.querySelectorAll('i'); //? Recupera cada . del contendor principal 
pointsNav.forEach((point, index) => {
    point.addEventListener('click', () => {
        currentStartIndexNav = index;
        carrouselMenuNav();
    }); 
}); 

//* Controla el punto relleno y sin relleno
function positionCarrouselMenuNav(currentStartIndexNav){
    pointsNav.forEach((point, index) => {
        if(index == currentStartIndexNav){
            point.classList.remove("fa-regular", "fa-circle")
            point.classList.add("fa-solid", "fa-circle")
        } else if(index != currentStartIndexNav && point.classList.contains("fa-solid")){
            point.classList.replace("fa-solid", "fa-regular")
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    updateDescription(currentIndex); //^ Actualiza la informacion del carrousel
    pointsCarrousel(); //^ Controla los puntos del carrousel
    startAutoSlide(); //^ Inicia el slide automático

    updateList(); //^ Gestiona el carrousel de herramientas de la empresa 
    
    carrouselMenuNav(); 
});


// Шапка уменьшается при прокрутке
const hd = document.getElementById("header")

window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY
    if(scrollPos>90) {
        hd.classList.add("small_header")
    }else{
        hd.classList.remove("small_header")
    }
})

// Кнопка-бургер открывает и закрывает меню на телефоне
const burger = document.getElementById("burger")
const nav = document.getElementById("nav")
burger.addEventListener("click", function() {
    nav.classList.toggle("open")
})

// Когда нажали на пункт меню, меню закрывается
const navLinks = document.querySelectorAll(".nav_link")
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        nav.classList.remove("open")
    })
})

// Блоки "Доработки в текущей версии" раскрываются по клику
const moreHeaders = document.querySelectorAll(".more_header")
moreHeaders.forEach(header => {
    header.addEventListener("click", function() {
        // this - это кнопка, parentElement - блок .more, внутри которого она лежит
        this.parentElement.classList.toggle("open")
    })
})

// Видео
let currentYoutubeUrl = "";
let currentRutubeUrl = "";
const cards = document.querySelectorAll(".video_card");
cards.forEach(card => {
    card.addEventListener('click', function() {
        currentYoutubeUrl = this.getAttribute("data-video-url-youtube");
        currentRutubeUrl = this.getAttribute("data-video-url-rutube");
        const videoPlayer = document.querySelector(".iframe");
        videoPlayer.setAttribute('src', currentYoutubeUrl);
        document.querySelector(".modal").classList.add("open");
    })
})

const closeButton = document.querySelector(".modal_box_button");
closeButton.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("open");
    const videoPlayer = document.querySelector(".iframe");
    videoPlayer.setAttribute("src", "");
    switchButtonRutube.classList.remove("active_button_rutube")
    switchButtonYoutube.classList.add("active_button_youtube")
})

// Закрытие видео по клавише Escape
document.addEventListener("keydown", function(event) {
    if(event.key === "Escape") {
        closeButton.click()
    }
})

const switchButtonYoutube = document.querySelector(".modal_switch_button_youtube");
switchButtonYoutube.addEventListener("click", function() {
    const videoPlayer = document.querySelector(".iframe");
    videoPlayer.setAttribute("src", "");
    videoPlayer.setAttribute('src', currentYoutubeUrl);
    switchButtonRutube.classList.remove("active_button_rutube")
    switchButtonYoutube.classList.add("active_button_youtube")
})
const switchButtonRutube = document.querySelector(".modal_switch_button_rutube");
switchButtonRutube.addEventListener("click", function() {
    const videoPlayer = document.querySelector(".iframe");
    videoPlayer.setAttribute("src", "");
    videoPlayer.setAttribute('src', currentRutubeUrl);
    switchButtonYoutube.classList.remove("active_button_youtube")
    switchButtonRutube.classList.add("active_button_rutube")
})

// Копирование реквизитов
const elementToCopy = document.querySelectorAll(".copy_inf");
elementToCopy.forEach(element => {
    element.addEventListener('click', async () => {
        try {
            const textSpan = element.querySelector('.bank_details_mini_card_inf_number');
            const textCopy = textSpan.innerText;
            await navigator.clipboard.writeText(textCopy);
            element.classList.add("copied");
            setTimeout(() => {
                element.classList.remove('copied');
            }, 1200);
        } catch (err) {
            console.error('erorr', err);
        }
    })
})

//Выбор нужной услуги в форме
const inputService = document.getElementById("input_service")
const serviceButtons = document.querySelectorAll("[data-service]")
serviceButtons.forEach(button => {
    button.addEventListener("click", function() {
        inputService.value = this.getAttribute("data-service")
    })
})

// Форма заявки
const inputName = document.getElementById("input_name")
const inputPhone = document.getElementById("input_phone")
const inputEmail = document.getElementById("input_email")
const inputText = document.getElementById("input_text")
const orderButton = document.getElementById("order_button")
const orderError = document.getElementById("order_error")

orderButton.addEventListener("click", function() {
    inputName.classList.remove("input_error")
    inputService.classList.remove("input_error")
    inputEmail.classList.remove("input_error")
    orderError.innerText = ""

    if(inputName.value.trim() === "") {
        inputName.classList.add("input_error")
        orderError.innerText = "Укажите, как вас зовут"
        return
    }
    if(inputService.value === "") {
        inputService.classList.add("input_error")
        orderError.innerText = "Выберите услугу"
        return
    }
    if(inputEmail.value.includes("@") === false) {
        inputEmail.classList.add("input_error")
        orderError.innerText = "Укажите корректную электронную почту"
        return
    }
// Тестовый вариант
    const subject = "Заявка с сайта LiftStend: " + inputService.value
    const body = "Имя: " + inputName.value + "\n" +
        "Услуга: " + inputService.value + "\n" +
        "Телефон: " + inputPhone.value + "\n" +
        "Почта: " + inputEmail.value + "\n\n" +
        inputText.value

    window.location.href = "mailto:stend@liftstend.ru?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)
})

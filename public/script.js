const cards = document.querySelectorAll(".card")
const recipes = document.querySelectorAll(".uniq_recipe_content")
const content = document.getElementById("content")
const botton1 = document.getElementById("botton_change1")
const botton2 = document.getElementById("botton_change2")
const botton3 = document.getElementById("botton_change3")


for (let card of cards) {
    card.addEventListener("click", function() {
        
        const urlID = card.getAttribute("number")

        window.location.href = `/recipes/${urlID}`
    });
};

botton1.addEventListener("click", function() {
    if (content1.style.display === "none") {
        content1.style.display = "block";
        document.getElementById("botton_change1").innerHTML = "Esconder";
        } else {
        content1.style.display = "none";
        document.getElementById("botton_change1").innerHTML = "Mostrar";
        }
})

botton2.addEventListener("click", function() {
    if (content2.style.display === "none") {
        content2.style.display = "block";
        document.getElementById("botton_change2").innerHTML = "Esconder";
        } else {
        content2.style.display = "none";
        document.getElementById("botton_change2").innerHTML = "Mostrar";
        }
})

botton3.addEventListener("click", function() {
    if (content3.style.display === "none") {
        content3.style.display = "block";
        document.getElementById("botton_change3").innerHTML = "Esconder";
        } else {
        content3.style.display = "none";
        document.getElementById("botton_change3").innerHTML = "Mostrar";
        }
})



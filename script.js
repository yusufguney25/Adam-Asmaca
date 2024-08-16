const word_el =document.getElementById('word');
const popup=document.getElementById('popup-container');
const message_el =document.getElementById('success-message');
const wrongLetters_el= document.getElementById('wrong-letters');
const items_el = document.querySelectorAll('.item')
const message2_el= document.getElementById('message');
const againPlay_btn=document.getElementById('play-again');
function getRandomWord(){
    const words = ["javascript", "java","python","css","html","angular"];

    return words[Math.floor(Math.random() * words.length)];
   
}
const correctLetters =[];//Dogru harfler
const wrongLetters =[];//yanlış harfler
let selectedWord = getRandomWord(); //Global düzeyde word


//Rastgele kelimeleri ekranda gösterme kısmı
function displayWord(){
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter=> `
            <div class= "letter">
                ${correctLetters.includes(letter) ? letter :''}
            </div>
        
        `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g,'')
    if(w===selectedWord){
        popup.style.display='flex';
        message_el.innerText='TEBRİKLER KAZANDINIZ!'
    }
}
//Hatalı harfleri güncelle
function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0 ? '<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=>`<span>${letter}<span>`)} 
    `;
    //Adamı yanlışlara göre güncelleme kısmı
    items_el.forEach((item,index) => {
        const errorCount = wrongLetters.length

        if(index<errorCount){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    });
    if(wrongLetters.length===items_el.length){
        popup.style.display='flex';
        message_el.innerText='Kaybettiniz!'
    }
}
//mesajları ekrana gösterme 
function displayMessage(){
    message2_el.classList.add('show');

    setTimeout(function(){
        message2_el.classList.remove('show');
    },2000)
}
//Butona tekrar oynama eventi ekleme 
againPlay_btn.addEventListener('click', function(){
    //listeleri sıfırlama işlemi
    correctLetters.splice(0);
    wrongLetters.splice(0);
    //yeni kelime 
    selectedWord=getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display='none'



});
//klavyeden harf alma işlemleri keydown
window.addEventListener('keydown',function(e){
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key
        //Seçili kelimede bastıpım harf var mı kontolü ve kelime harfleri listesinde letter harfi bir adet var mı 
        //yok mu kontolü ile correntLetter a ekleme yaptım doğru harfi seçtiysem
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
   
});
displayWord();
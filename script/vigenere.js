var alfabeto = new Array();
var charBypass = " ";
var button_share_show = false

var al = "abcdefghijklmnopqrstuvwxyzòàèéù "

for (let i = 0; i < al.length; i++) {
    alfabeto[i] = al.charAt(i)
}

function vigenere(frase, chiave, direzione) {
    var j = 0; //indice che scorre la chiave
    var lettera_frase = "";
    var lettera_chiave = "";
    
    var frase_criptata = "";
    for (let i = 0; i < frase.length; i++) {
        lettera_frase = frase.charAt(i);
        lettera_chiave = chiave.charAt(j).toLowerCase();

        var lettera_criptata = lettera_frase; // inizializzare

//        console.log("" + lettera_frase);
    //    if (!(charBypass.includes(lettera_frase))) {
      //      lettera_criptata = somma(lettera_frase, lettera_chiave, direzione);
         if ((al.includes(lettera_frase))) {
            lettera_criptata = somma(lettera_frase, lettera_chiave, direzione);

            j++;
            if (j == chiave.length) {
                j = 0;

            }
        }
        frase_criptata += lettera_criptata;
    }
    return frase_criptata;
}

function somma(l, k, d) {
    var n_somma = alfabeto.indexOf(l) + (alfabeto.indexOf(k) * d);
    n_somma += alfabeto.length // per evitare numeri negativi (l'eccess viene tagliato dopo)
    n_somma = n_somma % (alfabeto.length); // resto della divisione -> se è sorpassa il limite ricomincia

//    console.log(n_somma)
    return alfabeto[n_somma]
}



const vigenere_in = document.getElementById("vigenere_in");
const vigenere_chiave = document.getElementById("vigenere_chiave");
// const vigenere_out = document.getElementById("vigenere_out");

// vigenere_in.addEventListener("input", crypt);
// vigenere_chiave.addEventListener("input", decrypt);
// vigenere_out.addEventListener("input", decrypt);

vigenere_chiave.addEventListener("input", decrypt2);
vigenere_in.addEventListener("input", record);

function crypt() {
    let f = vigenere_in.value;
    let k = vigenere_chiave.value;
    vigenere_out.value = vigenere(f, k, 1)
}
function decrypt() {
    let o = vigenere_out.value;
    let k = vigenere_chiave.value;
    vigenere_in.value = vigenere(o, k, -1)
}
var vigenere_in_string = "";

function record(){
    
    let f = vigenere_in.value;
    let k = vigenere_chiave.value;
    if(f != ""){

    vigenere_in_string = vigenere(f, k, 1)
    button_share_show = true

    generate_link()

    vigenere_chiave.placeholder = "Inserisci la chiave"

    vigenere_in.classList.remove("text_vuoto")

    }
    else{
        vigenere_in_string = ""
    button_share_show = false
    generate_link()
    vigenere_chiave.placeholder = "Chiave"
    
    vigenere_in.classList.add("text_vuoto")

    }
    
}

function decrypt2() {

    let f = vigenere_in.value;
    let o = vigenere_in_string;
    let k = vigenere_chiave.value;
    vigenere_in.value = vigenere(o, k, -1)
    autosize(vigenere_in);
    autosize(vigenere_chiave);
    generate_link()

     if(f == ""){
        vigenere_in.placeholder = "Inserisci il messaggio da criptare, poi cancella la chiave"
     }
     
  

     
     if(k == ""){
        vigenere_chiave.classList.add("text_vuoto")


        vigenere_in.placeholder = "Cifrare:\ninserisci la chiave e poi il messaggio.\n\nDecifrare:\n inserisci il messaggio e poi la chiave"
     }
     else{
        vigenere_chiave.classList.remove("text_vuoto")

     }
}



// from link
function generate_link(){
    let f = vigenere_in_string;
    console.log(f)
    f = encodeURI(f);
    console.log(f)
    let url_sito = document.URL.split("?",1)
    let url_chiave = document.URL.split(url_sito,1)

    document.getElementById("link").href = url_sito + "?" + f
    document.getElementById("link").hidden = !button_share_show;
}

function open_link() {
    console.log(document.URL)

    let url_sito = document.URL.split("?",1)
    // uso il nome del sito per splittare
    let url_chiave_encoded = document.URL.split(url_sito)[1] 
    // la prima char è ancora "?", va rimosso 
    url_chiave_encoded = url_chiave_encoded.replace("?","")

    return decodeURI(url_chiave_encoded)
    
}

if (document.URL.split("?")[1]) {


    vigenere_in_string = open_link();
    vigenere_in.value = vigenere_in_string;
    autosize(vigenere_in);
    autosize(vigenere_chiave);
    decrypt2()
}

decrypt2();
record();


document.getElementById("version_p").innerHTML = "0.5";
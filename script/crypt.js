var keys = "qwertyuiopasdfghjklzxcvbnm "
var a = {q:1, w:2, e:3, r:4, t:5, y:6, u:7, i:8, o:9, p:10, a:11, s:12, d:13, f:14, g:15, h:16, j:17, k:18, l:19, z:20, x:21, c:22, v:23, b:24, n:25, m:26, $:27
}

var al = " abcdefghijklmnopqrstuvxyz";
var bob = {}
var frase = "il mio gatto è scemo"
var key = 3;

function cesare(f,k) {
    k = k%26;
    cl("entro in crypt ")
    let n;
    var out = "";
    f = f.toLowerCase();
    f = f.replaceAll(" ", "$");
    f = f.replaceAll("?", "=");

    for (let i = 0; i < f.length; i++) {

        if(checkchar(f.charAt(i))){
      
        n = f.charCodeAt(i); //codice ascii della lettera 
        n = inrange(n+k)
        out += String.fromCharCode(n)

        }
        else{
            out += f.charAt(i);
        }

    }
    return out;
}

function inrange(n) {
    // da "a"(97) a "z"(122)
    if(n > 122){
        n = (n - 122) + 97  -1
    }
    else if(n < 97){
        n = (n + 124) - 97  -1
        
    }
    return Number(n)
}


function unCesare(f, k) {


    var o = cesare(f, -k);
    o = o.replaceAll("$", " ");
    o = o.replaceAll("=", "?");
    return o;
}

function cl(params) {
    console.log(params)
}

function checkchar(a) {
    var o = true;
    var p = "! ?$=";
    // if(a == "!" || a == " " || a == "?"  || a == "$" || a == "£"){
    //    o = false;    
    // }
    if(p.includes(a)){
        o = false;

    }

    return o;
}

document.getElementById("input").addEventListener("input", refresh)

document.getElementById("key").addEventListener("input", refresh)

function refresh() {

    let k = Number(document.getElementById("key").value)
    let v = document.getElementById("input").value
    // cl("chiave = "+k,"frase= "+v )
    let f =    cesare(v,k) ;
    document.getElementById("output").innerHTML = f;
    // cl(v)
    document.getElementById("link_output").innerHTML = "Link";
    document.getElementById("link_output").href = "";
    document.getElementById("link_output").href = sito[0] + "?"+k+"?"+f;

}

var url = document.URL;
var sito = url.split("?");
const text = document.getElementById("text")
const div = document.getElementById("crypt")

// var sito = "http://127.0.0.1:5500/"
if (sito.length>2) {
    cl("ci siamo")
    // ci siamo
    let k = Number(sito[1]);
    let f = sito[2];
    cl("k" + k + " " + f);
    cl(unCesare(f,k));

    text.innerHTML = unCesare(f,k)
    div.hidden = true;

}





function Question(text,choices,answer,src){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.src = src;
    }

//Cevap kontrolü
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

//Soruları getirme
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

//Bitme kontrolü
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}


Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();
    var element = document.getElementById("isTrue");
    var True = document.getElementById("True");
    
    if(question.checkAnswer(answer)){
        element.style.color="green";
        element.innerHTML= 'Doğru Cevap';
        this.score++;
    }else{
        element.style.color="red";
        element.innerHTML ='Yanlış Cevap.<br>';
        True.style.color="green";
        True.innerHTML="Cevap = " + question.answer;
    }

    this.questionIndex++;
}



var q1 = new Question("Aşağıdakilerden hangisi Dünya'nın en iyi takımıdır ?",["Galatasaray","Real Madrid","Barcelona","Kastamonuspor"],"Galatasaray","img1.jpg");

var q2 = new Question("Dünya'nın şekli aşağıdakilerden hangisidir ?",["Düz","Geoit","Kare","Üçgen"],"Geoit","img2.jpg");

var q3 = new Question("Doktorunuz size 3 hap verir ve bunları yarımşar saat arayla almanızı tavsiye ederse, ilaçların tamamını bitirmeniz ne kadar sürer?",["1","1,5","2","3"],"1","img3.jpg");

var q4 = new Question("Galatasaray Uefa Kupası'nı hangi yıl kazanmıştır?",["2005","1996","2000","1905"],"2000","img4.jpg");

var questions=[q1,q2,q3,q4];



//Başla


var quiz = new Quiz(questions);
        
loadQuestion();

function loadQuestion(){
    var reset = document.getElementById("refresh");
    reset.style.display = 'none';
    var element = document.getElementById("isTrue");
    var True = document.getElementById("True");
    var img = document.getElementById("imgs");
    
    
    element.innerHTML ="";
    True.innerHTML ="";

    if(quiz.isFinish()){
        img.src="";
        reset.style.display = '';
        showScore();
        document.getElementById("time").innerHTML  = ""; 
        
    }else{
        

        var question = quiz.getQuestion();  
        var choices = question.choices;
       
       img.src  = "img/"+question.src;
        
        document.querySelector('#question')
        .textContent = question.text;
        
        for(var i= 0;i<choices.length;i++){
            var element = document.querySelector('#choice'+i)
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }
        
    }
}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        setTimeout(loadQuestion, 1500);
        
    }
}


function showScore(){
    document.querySelector('.card-body').style.color="green";
    document.querySelector('.card-body').innerHTML = "Skorunuz : "+quiz.score;
    
}
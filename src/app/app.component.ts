import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  question: object;
  questionNr: number;
  notAnsweredAllQuestions: boolean;
  numberOfCorrectAnswers: number;
  finished: boolean;
  score: number;

  questions = [
      {
          question:'Which identifiers are valid?',
          choices:[
              {text:'<code>private</code>', value:false, answer:false},
              {text:'<code>last-name</code>', value:false, answer:false},
              {text:'<code>7lastName</code>', value:false, answer:false},
              {text:'<code>$lastname</code>', value:true, answer:false},
              {text:'<code>__lastName</code>', value:true, answer:false},
              {text:'<code>_</code> &nbsp;&nbsp;&nbsp;<i>(since Java 9)</i>', value:false, answer:false},
              {text:'<code>last_name</code>', value:true, answer:false}
          ]
      },
      {
          question:'<code>public class MyClass {<br><br>&nbsp&nbspprivate Integer number;<br><br>&nbsp&nbsppublic Integer' +
      ' getNumber() {<br>&nbsp&nbsp&nbsp&nbspreturn number;<br>&nbsp&nbsp}<br><br>}<br></code><br><br>Which statements are true?',
          choices:[
              {text:'<code>number</code> is a class member', value:true, answer:false},
              {text:'<code>getNumber</code> is a class member', value:true, answer:false},
              {text:'<code>number</code> is a field', value:true, answer:false},
              {text:'<code>number</code> is a method', value:false, answer:false}
              ]
      },
      {
          question:'Which expressions are valid?',
          choices:[
              {text:'<code>double value = 1_000_000.00_;</code>', value:false, answer:false},
              {text:'<code>double value = 1_000_000.00;</code>', value:true, answer:false},
              {text:'<code>double value = 1_0__00000.0_0;</code>', value:true, answer:false},
              {text:'<code>double value = 1_000_000._00;</code>', value:false, answer:false},
              {text:'<code>double value = 1_000_000_.00;</code>', value:false, answer:false}
          ]
      }
    ];

  constructor() {
    this.questionNr = 0;
    this.question = this.questions[this.questionNr];
    this.notAnsweredAllQuestions = false;
  }

  navigate(direction: number) {
      console.log(this.questionNr);
      this.questionNr += direction;
      console.log(this.questionNr);
      this.notAnsweredAllQuestions =
          (this.questionNr === this.questions.length - 1) &&
          this.questions[this.questionNr].choices.reduce((answered, current) => answered && !current.answer, true);
      this.question = this.questions[this.questionNr];
  }

  finish() {
      this.numberOfCorrectAnswers = 0;
      for (let question of this.questions) {
          if (question.choices.reduce((passed, current) => passed && (current.value == current.answer), true)) {
              this.numberOfCorrectAnswers++;
          }
      }
      this.score = Math.round(this.numberOfCorrectAnswers * 100 / this.questions.length);
      this.finished = true;
  }
}

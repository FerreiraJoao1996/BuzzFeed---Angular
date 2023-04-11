import { Component, OnInit } from '@angular/core';

import quizQuestions from '../../../assets/data/quizQuestions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  titulo:string = '';

  questao: any
  questaoSelecionada:any

  respostas: string[] = []
  respostaSelecionada:string = ''

  questaoIndex:number = 0
  questaoMaxIndex:number = 0

  finalizado:boolean = false

  constructor(){

  }

  ngOnInit(): void {
    if(quizQuestions){
      this.finalizado = false;
      this.titulo = quizQuestions.title;

      this.questao = quizQuestions.questions;
      this.questaoSelecionada = this.questao[this.questaoIndex];

      this.questaoIndex = 0
      this.questaoMaxIndex = this.questao.length
    }
  }

  opcaoSelecionada(valor:string){
    this.respostas.push(valor)
    this.proximoPasso();

  }

  async proximoPasso(){
    this.questaoIndex++
    if(this.questaoMaxIndex > this.questaoIndex){
      this.questaoSelecionada = this.questao[this.questaoIndex]
    }else{
      const respostaFinal:string = await this.checarResultados(this.respostas);
      this.finalizado = true;
      this.respostaSelecionada = quizQuestions.results[respostaFinal as
      keyof typeof quizQuestions.results]
    }
  }

  async checarResultados(respostas:string[]){
    const resultado = respostas.reduce((previous, current,i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
        ){
         return previous 
      }else{
        return current 
      }
    }) 
    return resultado;
  }
}

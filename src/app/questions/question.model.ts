import {Answers} from './answers.model';

export interface Question {
  quesid: string;
  questype: string;
  quesCat: string;
  quesSubCat: string;
  question: string;
  quesFormatted: string;
  quesAnswers: Answers[];
}


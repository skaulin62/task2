export interface Comment {
  id: number;
  author: string;
  content: string;
}
export interface SelectCard {
  item: Card;
  columnId: number;
}
export interface Card {
  id: number;
  name: string;
  author: string;
  descr: string;
  comments: Comment[];
  countComments: number;
}

export interface Cards {
  id: number;
  title: string;
  item: Card[];
}

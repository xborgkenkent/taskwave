export type Board = {
  lists: List[];
};

export type Card = {
  dateAdded: Date;
  description: string;
  id: string;
  labels: CardLabel[];
  title: string;
};

export type CardLabel = {
  color: string;
  id: string;
  name: string;
};

export type List = {
  cards: Card[];
  id: string;
  title: string;
};

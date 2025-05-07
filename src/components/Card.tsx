import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

import { CardLabel, Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  index: number;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, index, onClick }) => {
  const handleClick = () => {
    onClick(card);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick(card);
    }
  };

  const primaryLabel = card.labels.length > 0 ? card.labels[0] : null;

  const formatDate = (date: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          aria-label={`Card: ${card.title}`}
          className="border-b border-[#3b3b4d] cursor-pointer hover:bg-[#3b3b4d] p-2 overflow-hidden"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="flex items-start">
            {primaryLabel && (
              <div
                className=" h-full self-stretch rounded-sm flex-shrink-0"
                style={{ backgroundColor: primaryLabel.color }}
              />
            )}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">{card.title}</h3>
              {card.description && (
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {card.description}
                </p>
              )}

              {card.dateAdded && (
                <p className="text-xs text-gray-400 mt-1 flex items-center">
                  <span className="mr-1">📅</span> {formatDate(card.dateAdded)}
                </p>
              )}

              {card.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.labels.map((label: CardLabel) => (
                    <span
                      className="px-2 py-0.5 text-xs rounded-sm text-white"
                      key={label.id}
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;

import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

import { CardLabel, Card as CardType, List as ListType } from '../types';

interface CardModalProps {
  card: CardType;
  listID: null | string;
  listName: string;
  onClose: () => void;
  onCreateLabel: (name: string, color: string) => CardLabel;
  onUpdateCard: (card: CardType) => void;
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

const LABEL_COLORS = [
  '#61bd4f', // green
  '#f2d600', // yellow
  '#ff9f1a', // orange
  '#eb5a46', // red
  '#c377e0', // purple
  '#0079bf', // blue
  '#00c2e0', // light blue
  '#51e898', // light green
  '#ff78cb', // pink
  '#344563', // dark blue
];

const CardModal: React.FC<CardModalProps> = ({
  card,
  listID,
  listName,
  onClose,
  onCreateLabel,
  onUpdateCard,
  setLists,
}) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [selectedColor, setSelectedColor] = useState(LABEL_COLORS[0]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }

    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
  }, [isEditingTitle, isEditingDescription]);

  const handleTitleSave = () => {
    if (title.trim() !== '') {
      onUpdateCard({ ...card, title: title.trim() });
    } else {
      setTitle(card.title);
    }
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    onUpdateCard({ ...card, description: description.trim() });
    setIsEditingDescription(false);
  };

  const handleLabelAdd = () => {
    if (newLabelName.trim()) {
      const newLabel = onCreateLabel(newLabelName.trim(), selectedColor);
      onUpdateCard({
        ...card,
        labels: [...card.labels, newLabel],
      });
      setNewLabelName('');
      setSelectedColor(LABEL_COLORS[0]);
      setShowLabelPicker(false);
    }
  };

  const handleRemoveLabel = (labelId: string) => {
    onUpdateCard({
      ...card,
      labels: card.labels.filter((label) => label.id !== labelId),
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRemoveCard = () => {
    if (listID) {
      setLists((prevLists) =>
        prevLists.map((list) => {
          if (list.id === listID) {
            return {
              ...list,
              cards: list.cards.filter((cardItem) => cardItem.id !== card.id),
            };
          }
          return list;
        }),
      );
    }
    setShowConfirmModal(false); // Close the confirmation modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50 p-4 ">
      <div
        className="bg-[#2c2c3d] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-white"
        ref={modalRef}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#3b3b4d]">
          {isEditingTitle ? (
            <div className="w-full">
              <textarea
                className="w-full p-2 text-xl font-semibold bg-[#3b3b4d] text-white border-0 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={handleTitleSave}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTitleSave();
                  }
                }}
                ref={titleInputRef}
                rows={2}
                value={title}
              />
              <div className="text-sm text-gray-400 mt-1">
                in list{' '}
                <span className="font-medium text-gray-300">{listName}</span>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h2
                className="text-xl font-semibold cursor-pointer hover:bg-[#3b3b4d] p-1 rounded"
                onClick={() => setIsEditingTitle(true)}
              >
                {card.title}
              </h2>
              <div className="text-sm text-gray-400 mt-1">
                in list{' '}
                <span className="font-medium text-gray-300">{listName}</span>
              </div>
            </div>
          )}
          <button
            aria-label="Close modal"
            className="p-2 hover:bg-[#3b3b4d] rounded-full"
            onClick={onClose}
            style={{ borderRadius: '100%', padding: 4 }}
          >
            <XMarkIcon className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Labels */}
          <div className="flex gap-2 mb-6 h-full">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
              <TagIcon className="h-4 w-4 mr-1" />
              Labels
            </h3>

            <div className="flex flex-wrap gap-2 mb-2">
              {card.labels.map((label) => (
                <div className="flex items-center group " key={label.id}>
                  <span
                    className="px-3 py-1 rounded-l-sm text-white text-sm"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </span>
                  <button
                    aria-label={`Remove ${label.name} label`}
                    onClick={() => handleRemoveLabel(label.id)}
                    style={{
                      border: '1.5px solid gray',
                      borderRadius: '0px 2px 2px 0px',
                      padding: '7px',
                    }}
                  >
                    <XMarkIcon className="h-3 w-3 text-gray-300 " />
                  </button>
                </div>
              ))}
            </div>

            {showLabelPicker ? (
              <div className="bg-[#3b3b4d] p-3 rounded ">
                <input
                  className="w-full p-2 border-0 bg-[#4a4a5e] text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNewLabelName(e.target.value)}
                  placeholder="Label name"
                  type="text"
                  value={newLabelName}
                />

                <div className="flex flex-wrap gap-2 mb-2 ">
                  {LABEL_COLORS.map((color) => (
                    <button
                      aria-label={`Select ${color} color`}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500 ring-offset-[#3b3b4d]' : ''}`}
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <CheckIcon className="h-4 w-4 text-white " />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm"
                    onClick={handleLabelAdd}
                  >
                    Add
                  </button>
                  <button
                    className="text-gray-300 hover:text-white px-2 py-1 text-sm"
                    onClick={() => setShowLabelPicker(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex px-3 py-1 rounded-l-sm mb-2  items-center gap-2"
                onClick={() => setShowLabelPicker(true)}
                style={{
                  borderRadius: '5px',
                  cursor: 'pointer',
                  height: '30px',
                }}
              >
                Add Label
                <PlusIcon className="h-4 w-4 mr-1" />
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-300 flex items-center">
                Description
              </h3>
              {!isEditingDescription && description && (
                <button
                  onClick={() => setIsEditingDescription(true)}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: '80%',
                    marginLeft: '5px',
                    padding: 5,
                  }}
                >
                  <PencilIcon className="h-4 w-4 " />
                </button>
              )}
            </div>

            {isEditingDescription ? (
              <div>
                <textarea
                  className="w-full p-2 bg-[#3b3b4d] text-white border-0 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 resize-none"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a more detailed description..."
                  ref={descriptionInputRef}
                  rows={5}
                  value={description}
                />
                <div className="flex">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm"
                    onClick={handleDescriptionSave}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-300 hover:text-white px-2 py-1 text-sm"
                    onClick={() => {
                      setIsEditingDescription(false);
                      setDescription(card.description);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`p-2 rounded ${!description ? 'bg-[#3b3b4d] hover:bg-[#4a4a5e] text-gray-400 italic cursor-pointer min-h-16' : 'bg-[#3b3b4d] text-white whitespace-pre-wrap'}`}
                onClick={() => setIsEditingDescription(true)}
              >
                {description || 'Add a more detailed description...'}
              </div>
            )}
          </div>
        </div>

        <button className="m-10" onClick={() => setShowConfirmModal(true)}>
          Remove Card
        </button>

        {/* Modal for confirmation */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-70 flex items-center justify-center z-50 p-4 ">
            <div className="bg-[#2c2c3d] rounded-lg w-full max-w-sm p-4 text-white">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="text-sm text-gray-300 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-600 px-4 py-2 rounded text-sm"
                  onClick={handleRemoveCard} // Logic to remove the card
                >
                  Remove
                </button>
                <button
                  className="bg-gray-600 px-4 py-2 rounded text-sm"
                  onClick={() => setShowConfirmModal(false)} // Close modal
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal for confirmation */}
      </div>
    </div>
  );
};

export default CardModal;

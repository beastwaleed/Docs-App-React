import React, { useRef } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";

const Foreground = ({ cards, toggleStatus, deleteCard, onOpenForm }) => {
  // Reference for card dragging canvas strictly below search bar
  const cardCanvasRef = useRef(null);

  return (
    <div className="absolute inset-0 z-[3] w-full h-full overflow-hidden p-6 flex flex-col justify-between pointer-events-none">
      {/* Top Header & Google Search Bar */}
      <div className="w-full pt-2 flex justify-center flex-shrink-0 select-none">
        <SearchBar onOpenForm={onOpenForm} />
      </div>

      {/* Floating Canvas for Draggable Cards (Bounded below SearchBar wall) */}
      <div
        ref={cardCanvasRef}
        className="w-full flex-1 mt-6 flex flex-wrap gap-5 items-start justify-start overflow-hidden pointer-events-none relative"
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            reference={cardCanvasRef}
            description={card.description}
            complexity={card.complexity}
            status={card.status}
            onToggle={toggleStatus}
            onDelete={deleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Foreground;

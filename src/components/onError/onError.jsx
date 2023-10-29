import React from 'react';

export const ErrorComponent = ({ error }) => {
  return (
    <div>
      <h3>Помилка: {error}</h3>
    </div>
  );
};

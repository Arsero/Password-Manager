import React, { useState } from 'react';
import { Sidebar } from '../../components/menu/Sidebar';
import OffCanvas from 'react-aria-offcanvas';
import { Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Close = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant='outline-dark'
        id='menu-button'
        aria-label='Menu'
        aria-controls='menu'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        size='sm'
        style={{
          float: 'left',
          marginTop: '-70px',
          marginLeft: '12px',
        }}
      >
        <List size={16} />
      </Button>
      <OffCanvas
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        labelledby='menu-button'
        width='350px'
        height='100%'
        style={{
          overlay: {
            top: '28px',
          },
          content: {
            background: 'rgba(5, 5, 5, 0.85)',
          },
        }}
      >
        <Button
          variant='outline-light'
          id='menu-button'
          aria-label='Menu'
          aria-controls='menu'
          aria-expanded={isOpen}
          onClick={() => setIsOpen(false)}
          size='sm'
          style={{
            float: 'right',
            marginTop: '12px',
            marginRight: '12px',
            paddingBottom: '3px',
            paddingTop: 0,
          }}
        >
          <b>x</b>
        </Button>
        <Sidebar Close={Close} />
      </OffCanvas>
    </div>
  );
};

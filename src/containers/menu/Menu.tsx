import React, { useState } from 'react';
import { Sidebar } from '../../components/menu/Sidebar';
import OffCanvas from 'react-aria-offcanvas';
import { Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant='outline-primary'
        id='menu-button'
        aria-label='Menu'
        aria-controls='menu'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        size='sm'
        style={{ float: 'left', marginTop: '-70px', marginLeft: '12px' }}
      >
        <List size={16} />
      </Button>
      <OffCanvas
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        labelledby='menu-button'
      >
        <button onClick={() => setIsOpen(false)}>Close</button>
        <Sidebar />
      </OffCanvas>
    </div>
  );
};

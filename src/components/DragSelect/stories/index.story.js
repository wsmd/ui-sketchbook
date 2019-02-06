import React from 'react';
import { storiesOf } from '@storybook/react';

import Selection from '../DragSelect';

storiesOf('DragSelect', module)
  .add('Grid', () => <Selection layout="grid" />, {
    notes:
      'Move the mouse pointer over one of the tiles, and then hold-click and ' +
      'drag to another point to select tiles. Try a few times with different ' +
      'combinations of selected and selected tiles.'
  })
  .add('List', () => <Selection layout="list" />, {
    notes:
      'Move the mouse pointer over one of the items, and then hold-click and ' +
      'drag to another point to select items. Try a few times with different ' +
      'combinations of selected and selected items.'
  });

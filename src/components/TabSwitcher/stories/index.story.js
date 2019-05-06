import React from 'react';
import classNames from 'classnames';
import { storiesOf } from '@storybook/react';

import TabSwitcher from '../TabSwitcher';

const Wrapper = ({ children, leftAligned }) => (
  <div className="FullScreen">
    <div
      className={classNames(
        'FullScreen-content',
        leftAligned && 'FullScreen-content--leftAligned'
      )}
    >
      {children}
    </div>
  </div>
);

storiesOf('TabSwitcher', module).add(
  'Example',
  () => (
    <Wrapper>
      <TabSwitcher
        items={[
          { label: 'Code', href: '#' },
          { label: 'Issues', href: '#' },
          { label: 'Pull Requests', href: '#' },
          { label: 'Projects', href: '#' },
          { label: 'Wiki', href: '#' },
          { label: 'Insights', href: '#' }
        ]}
      />
    </Wrapper>
  ),
  {
    notes:
      'Click on one of the tabs listed above. The active tab indicator will ' +
      'slide to the selected tab position and resize itself accordingly.'
  }
);

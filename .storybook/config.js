import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withNotes } from '@storybook/addon-notes';

import '../src/index.css';

addDecorator(withNotes);

addDecorator(
  withOptions({
    url: 'https://github.com/wsmd/ui-sketchbook',
    name: "@wsmd's ui-sketchbook",
    showStoriesPanel: true,
    enableShortcuts: false
  })
);

const req = require.context('../src/components', true, /.stor(y|ies).js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

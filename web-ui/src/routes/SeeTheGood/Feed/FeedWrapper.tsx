import React from 'react';
import { Moment } from 'positive-store';

import Feed from './Feed';
import { MomentSlideshowProvider } from 'context/MomentSlideshowContext/MomentSlideshowContext';

interface Props {
  editMoment: ({ moment }: { moment: Moment }) => void;
  openMomentPanel: () => void;
}

const FeedWrapped: React.FunctionComponent<Props> = ({ editMoment, openMomentPanel }) => {
  return (
    <MomentSlideshowProvider>
      <Feed editMoment={editMoment} openMomentPanel={openMomentPanel} />
    </MomentSlideshowProvider>
  );
};

export default FeedWrapped;

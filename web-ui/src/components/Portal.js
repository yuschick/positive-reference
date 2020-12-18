import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import usePortal from 'utils/usePortal';

const Portal = ({ id, targetId = 'portal-root', children }) => {
  const portalRootElement = document.getElementById(targetId);

  const target = usePortal({ targetId: id, portalRootElement });

  return createPortal(children, target);
};

Portal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Portal;

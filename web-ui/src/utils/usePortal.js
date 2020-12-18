// Source: https://www.jayfreestone.com/writing/react-portals-with-hooks/

import { useRef, useEffect } from 'react';

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
const createTargetElement = targetId => {
  const targetElement = document.createElement('div');
  targetElement.setAttribute('id', targetId);
  return targetElement;
};

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the target elements (no SRR
 * makes this trivial), so there is no need to ensure the target already
 * exists.
 * @example
 * const target = usePortal({ targetId, portalRootElement });
 * return createPortal(children, target);
 * @param {String} targetId The id of the target element, e.g 'modal' or 'spotlight'
 * @param {HTMLElement} portalRootElement The portal root element
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */

const usePortal = ({ targetId, portalRootElement }) => {
  const containerElementRef = useRef(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingTarget = document.querySelector(`#${targetId}`);

    // Target element is either the existing dom element or a new element
    const targetElement = existingTarget || createTargetElement(targetId);

    // If there was no existing parent element, add the new one.
    if (!existingTarget) {
      portalRootElement.appendChild(targetElement);
    }

    // Add the detached container element to the target element
    targetElement.appendChild(containerElementRef.current);

    return () => {
      containerElementRef.current.remove();

      if (targetElement.childNodes.length === 0) {
        targetElement.remove();
      }
    };
  }, []);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const containerElementRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  const getContainerElement = () => {
    if (!containerElementRef.current) {
      const containerElement = document.createElement('div');
      containerElement.setAttribute('id', 'portal-container-element');
      containerElementRef.current = containerElement;
    }

    return containerElementRef.current;
  };

  return getContainerElement();
};

export default usePortal;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { toReactComponents, urlForImageType } from 'utils/sanity';
import Link from 'components/Link';

const slidesToReactComponents = (slides, audienceSlug) => {
  const serializers = {
    marks: {
      exerciseV2Link: ({ mark, children }) => {
        const { exerciseSlug, strengthSlug } = mark;
        return (
          <Link to={`/teach/${audienceSlug}/${strengthSlug}/${exerciseSlug}`}>{children}</Link>
        );
      },
    },
    types: {
      image: props =>
        props.node.asset ? (
          <img className="background-image" src={urlForImageType(props)} alt="">
            {props.node.children}
          </img>
        ) : null,
    },
  };

  return slides.reduce((components, slide) => {
    const body = slide.body || [];

    switch (slide._type) {
      case 'markdownSlide':
        // markdownSlides can contain old pre-CMS slideshow markup that delimited slides with
        // <section> tags. Split the body by that tag, remove the end tag and any leftover
        // whitespace
        const subslides = body
          .split('<section>')
          .map(subslide => subslide.replace(/\s*<\/section>\s*/, '').trim());

        // if the first thing in the md slides was a <section> tag, the first element will be an
        // empty string. Remove that
        if (subslides[0] === '') {
          subslides.shift();
        }

        // concatenate rendered HTML "subslides" to our array of slide HTMLs
        return components.concat(
          subslides.map(markdown => <ReactMarkdown source={markdown} escapeHtml={false} />)
        );
      case 'textSlide':
        return components.concat(toReactComponents(body, serializers));
      case 'textAndImageSlide':
        const containerClassName = { left: 'left-half', center: undefined, right: 'right-half' }[
          slide.textPosition
        ];

        return components.concat(
          toReactComponents(body.concat(slide.image), serializers, containerClassName)
        );
      default:
        throw new Error(`unknown slide type '${slide._type}'`);
    }
  }, []);
};

export default slidesToReactComponents;

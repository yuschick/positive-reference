import React from 'react';
import ImageURLBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import client from '@sanity/client';
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';
import { merge, values } from 'lodash';

import A from 'components/A';
import Link from 'components/Link';
import { environment, sanity } from 'config';
import Vimeo from '@u-wave/react-vimeo';

export const sanityClient = client({
  projectId: sanity.projectId,
  dataset: sanity.dataset,
  // NOTE: a read-only token should only be set in staging / local dev. Used so front can get access
  //  to draft documents. TOKEN MUST NOT BE INCLUDED IN PRODUCTION
  token: sanity.apiToken,
  // don't use CDN when token is set, since the API CDN rejects requests with Authorization headers
  // (https://www.sanity.io/docs/api-cdn)
  useCdn: !sanity.apiToken,
  ignoreBrowserTokenWarning: true,
});

/**
 * `imageURLBuilder` builds image URLs from Sanity asset objects.
 * See https://www.sanity.io/docs/image-url for documentation
 */
const imageURLBuilder = ImageURLBuilder(sanityClient);

/**
 * `urlFor` is a shortcut for `imageURLBuilder.image()`. Remember to call `.url()`, i.e.
 * `urlFor(someAsset).url()`
 *
 * See https://www.sanity.io/docs/image-url for documentation.
 *
 * @param src source asset object
 * @returns {ImageUrlBuilder}
 */
const urlFor = src => imageURLBuilder.image(src);

const linkSerializer = ({ mark, children }) => {
  const { openInCurrentTab, href } = mark;
  return openInCurrentTab ? (
    <A href={href}>{children}</A>
  ) : (
    <A href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </A>
  );
};

// from https://github.com/sanity-io/block-content-to-hyperscript
const queryStringForImgOpts = options => {
  const query = options.imageOptions;
  const keys = Object.keys(query);
  if (!keys.length) {
    return '';
  }

  const params = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
  return `?${params.join('&')}`;
};

// from https://github.com/sanity-io/block-content-to-hyperscript
const urlForImageType = props => {
  const { node, options } = props;
  const { projectId, dataset } = options;
  const asset = node.asset;

  if (!asset) {
    throw new Error('Image does not have required `asset` property');
  }

  if (asset.url) {
    return asset.url + queryStringForImgOpts(options);
  }

  if (!projectId || !dataset) {
    throw new Error('need projectId and dataset');
  }

  const ref = asset._ref;
  if (!ref) {
    throw new Error('Invalid image reference in block, no `_ref` found on `asset`');
  }

  return ImageURLBuilder(Object.assign({ projectId, dataset }, options.imageOptions || {}))
    .image(node)
    .toString();
};

function videoIdAndService(node) {
  const { url } = node;
  return getVideoId(url);
}

const videoSerializer = ({ node }) => {
  const { id, service } = videoIdAndService(node);
  switch (service) {
    case 'youtube':
      return <YouTube videoId={id} />;
    case 'vimeo':
      return <Vimeo video={id} />;
    default:
      throw new Error(`Unknown video service ${service}, must be either YouTube or Vimeo`);
  }
};
const defaultSerializers = {
  marks: {
    file: linkSerializer,
    link: linkSerializer,
    exerciseLink: ({ mark, children }) => {
      const { exerciseSlug, strengthSlug } = mark;
      return <Link to={`/teach/${strengthSlug}/${exerciseSlug}`}>{children}</Link>;
    },
  },

  types: {
    video: videoSerializer,

    // DEPRECATED
    youtube: videoSerializer,

    image: props =>
      props.node.asset ? (
        <img src={urlForImageType(props)} alt="">
          {props.node.children}
        </img>
      ) : null,
  },
};

const toReactComponents = (portableText, serializers = {}, containerClassName) => (
  <BlockContent
    blocks={portableText}
    serializers={merge({}, defaultSerializers, serializers)}
    projectId={sanity.projectId}
    dataset={sanity.dataset}
    renderContainerOnSingleChild={true}
    className={containerClassName}
  />
);

const isDraftID = id => {
  if (!id) {
    throw new Error(
      'isDraftID called with no id. This is likely caused by the GROQ query not including _id'
    );
  }
  return id.startsWith('drafts.');
};

const hasDraftID = ({ id } = {}) => isDraftID(id);

const keepDraft = (obj1, obj2) => (hasDraftID(obj1) ? obj1 : obj2);

/**
 * Takes an array of Sanity objects that have an `_id` and a `slug` property, and filters it so that
 * if a `slug` is in the list twice, only the object that's a draft is kept
 * @param {Array} objects Array of objects
 * @returns {Array} Array of objects with only the drafts kept when duplicate slugs are found
 */
const onlyKeepDrafts = objects =>
  values(
    objects.reduce((foundSlugs, obj) => {
      const { slug } = obj;
      if (foundSlugs[slug]) {
        foundSlugs[slug] = keepDraft(foundSlugs[slug], obj);
      } else {
        foundSlugs[slug] = obj;
      }
      return foundSlugs;
    }, {})
  );

/**
 * Takes a "section" name string (either `inTeach` or `inSeeTheGood`) and an array of Sanity
 * objects, and filters out all objects that don't have `live[sectionName]` set to `true`
 * @param sectionName Either `inTeach` or `inSeeTheGood`
 * @param objects
 * @returns {*}
 */
const onlyKeepLiveObjects = (sectionName, objects) =>
  environment === 'production'
    ? objects.filter(({ live: { [sectionName]: section } }) => section === true)
    : objects.filter(() => true); // use filter for non-prod case as well to ensure that the incoming `objects` has this method.

const onlyKeepLiveAudiences = audiences => {
  return environment === 'production' ? audiences.filter(({ live }) => live) : audiences;
};

export {
  urlFor,
  urlForImageType,
  toReactComponents,
  isDraftID,
  onlyKeepDrafts,
  onlyKeepLiveObjects,
  onlyKeepLiveAudiences,
};

export const fetchStrengthsQuery = `*[_type == 'strengthV2' && defined(nameTranslations[$language])]
{
  _id, live, backgroundColor, "slug": slug.current, imageAsset

  , "name": nameTranslations[$language]

  , ...*[_type == 'strengthV2Translation' && language == $language && references(^._id) && references(*[_type == 'audience' && slug.current == $audienceSlug][0]._id)][0]
        {description, language}

  , "goalTemplates": *[_type == 'goalV2' && defined(translations[$language]) && references(^._id) && references(*[_type == 'audience' && slug.current == $audienceSlug][0]._id)]
                      {"slug": slug.current, _id, ...translations{...@[$language]} }
                      | order(goalText asc)

  , "numExercises": count(*[_type == 'exerciseV2' && references(^._id) && references(*[_type == 'audience' && slug.current == $audienceSlug][0]._id)]
    {"translationCount": count(*[_type == 'exerciseV2Translation' && exerciseV2._ref == ^._id && language == $language])}[ translationCount > 0 ])

} | order(name asc)`;

export const strengthAttachmentQuery = `*[_type == 'strengthV2Attachment' &&
  strengthV2->slug.current == $strengthV2Slug &&
  $audienceSlug in audiences[]->slug.current &&
  language == $language &&
  type == $type
 ]{
   "downloadUrl": file.asset->url + "?dl="
 }[0]`;

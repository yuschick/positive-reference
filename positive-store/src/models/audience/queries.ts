export const fetchAudiencesQuery = `*[_type == 'audience' && defined(translations[$language])]
{
  _id, live, "slug": slug.current, orderNumber, ...translations{...@[$language]}

  , "numExercises": count(*[_type == 'exerciseV2' && references(^._id)]
    {"translationCount": count(*[_type == 'exerciseV2Translation' && exerciseV2._ref == ^._id && language == $language])}
    [ translationCount > 0 ])

} | order(orderNumber asc)`;

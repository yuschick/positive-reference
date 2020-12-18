export const fetchExercisesQuery = `*[_type == 'exerciseV2Translation' &&
  language == $language &&
  $strengthSlug in exerciseV2->strengthV2s[]->slug.current &&
  $audienceSlug in exerciseV2->audiences[]->slug.current
]{
  _id, language, slides, title, description, showCover,

  ...exerciseV2->{"slug": slug.current, section, type, duration, orderNumber},

  slides[]{
    ...,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == 'file' => {
          "href": @.asset->url
        },

        _type == "exerciseV2Link" => {
          "exerciseSlug": @.reference->slug.current,
          "strengthSlug": $strengthSlug
        }
      }
    }
  },

  teacherNotes[]{
    ...,
    markDefs[]{
      ...,
      _type == 'file' => {
        "href": @.asset->url
      },

      _type == "exerciseV2Link" => {
        "exerciseSlug": @.reference->slug.current,
        "strengthSlug": $strengthSlug
      }
    }
  }
}

| order(orderNumber asc, title asc)`;

export const isSanityDraft = (id?: string): boolean => {
  if (!id) {
    throw new Error(
      'isSanityDraft called with no id. This is likely caused by the GROQ query not including _id'
    );
  }
  return id.startsWith('drafts.');
};

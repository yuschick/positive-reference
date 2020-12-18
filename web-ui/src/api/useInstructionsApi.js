import { useEffect, useState } from 'react';
import { useSettingsState } from 'positive-store';

import useSanityApi from 'api/useSanityApi';

const buildInstructionQuery = lang => `*[ _type == "instructions" &&
  _id == "singleton-instructions" &&
  defined(content.${lang}) ]
{
  ...content{"translation": ${lang}}
}[0]`;

const useInstructionsApi = () => {
  const [instructions, setInstructions] = useState(null);
  const { language } = useSettingsState();
  const [{ isComplete, data }, doFetch] = useSanityApi();

  useEffect(() => {
    if (language) {
      doFetch(buildInstructionQuery(language));
    }
  }, [language]);

  useEffect(() => {
    if (isComplete) {
      setInstructions(data);
    }
  }, [isComplete]);

  return { instructions };
};

export default useInstructionsApi;

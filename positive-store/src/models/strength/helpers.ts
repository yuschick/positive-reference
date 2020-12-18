import {
  GoalTemplate,
  GoalTemplateResponse,
  Live,
  Strength,
  StrengthResponse,
  StrengthSlug,
} from 'types/strength';
import { Language } from 'types/settings';
import { isDraftID } from 'utils/isDraftID';
import { onlyKeepDrafts } from 'utils/onlyKeepDrafts';

export const formatStrengthsResponse = (
  strengths: StrengthResponse[],
  verboseContent: boolean
): Strength[] =>
  strengths.map((strength: StrengthResponse) => {
    const strengthId = strength._id;
    const isDraft = isDraftID(strengthId);
    const formattedName = formatStrengthNames(
      strength.name,
      isDraft,
      verboseContent,
      strength.live
    );

    const enhancedStrength = {
      id: strength._id,
      color: strength.backgroundColor,
      description: strength.description,
      goalTemplates: strength.goalTemplates.map(
        (goal: GoalTemplateResponse): GoalTemplate => {
          const isDraft = isDraftID(goal._id);
          const formattedName = formatStrengthNames(goal.goalText, isDraft, verboseContent);

          return {
            actions: goal.actions,
            id: goal._id,
            isDraft,
            name: formattedName,
            slug: goal.slug,
          };
        }
      ),
      imageAsset: strength.imageAsset,
      isDraft: isDraftID(strength._id),
      live: strength.live,
      name: formattedName,
      numExercises: strength.numExercises,
      slug: strength.slug,
    };

    enhancedStrength.goalTemplates = Array.isArray(enhancedStrength.goalTemplates)
      ? onlyKeepDrafts(enhancedStrength.goalTemplates.map((goal: GoalTemplate) => goal))
      : strength.goalTemplates;

    return enhancedStrength;
  });

const formatStrengthNames = (
  name: string,
  isDraft: boolean,
  verboseContent: boolean,
  live?: Live
): string => {
  function liveToString({ inTeach = false, inSeeTheGood = false }) {
    return `[${inTeach ? 'TEACH' : ''}${inTeach && inSeeTheGood ? ' & ' : ''}${
      inSeeTheGood ? 'STG' : ''
    }]`;
  }

  let formattedName = isDraft && verboseContent ? `${name} [DRAFT]` : name;
  formattedName = live && verboseContent ? `${name} ${liveToString(live)}` : name;

  return formattedName;
};

export const buildStrengthPackages = ({
  language = Language.fi,
  audienceSlug,
  strengths,
}: {
  language: Language;
  audienceSlug?: string;
  strengths: Strength[];
}): { core: Strength[]; waves: Strength[][]; hasWavesContent: boolean } => {
  if (!language || !strengths) {
    return { core: [], waves: [], hasWavesContent: false };
  }

  const coreStrengthSlugs: StrengthSlug[] = [
    StrengthSlug.selfRegulation,
    StrengthSlug.perseverance,
    StrengthSlug.kindness,
  ];
  const coreStrengths: Strength[] = strengths
    .filter((s) => coreStrengthSlugs.includes(s.slug))
    .sort((a, b) => coreStrengthSlugs.indexOf(a.slug) - coreStrengthSlugs.indexOf(b.slug));

  let package1Slugs: string[],
    package2Slugs: string[],
    package3Slugs: string[],
    package4Slugs: string[],
    package5Slugs: string[],
    package6Slugs: string[],
    package7Slugs: string[],
    package1: Strength[],
    package2: Strength[],
    package3: Strength[],
    package4: Strength[],
    package5: Strength[],
    package6: Strength[],
    package7: Strength[],
    waves: Strength[][] = [],
    hasWavesContent: boolean = false;

  if (language === Language.fi) {
    if (audienceSlug === 'preschool') {
      package1Slugs = [StrengthSlug.compassion, StrengthSlug.courage, StrengthSlug.teamwork];
      package1 = strengths.filter((s) => package1Slugs.includes(s.slug));

      waves = [package1];
      hasWavesContent = false;
    }

    if (audienceSlug === 'early_years') {
      package1Slugs = [StrengthSlug.creativity, StrengthSlug.compassion, StrengthSlug.courage];
      package1 = strengths.filter((s) => package1Slugs.includes(s.slug));

      waves = [package1];
      hasWavesContent = false;
    }

    if (!audienceSlug || audienceSlug === 'students-v2') {
      package1Slugs = [StrengthSlug.compassion, StrengthSlug.courage, StrengthSlug.creativity];
      package2Slugs = [StrengthSlug.curiosity, StrengthSlug.humour, StrengthSlug.teamwork];
      package3Slugs = [StrengthSlug.enthusiasm, StrengthSlug.hope, StrengthSlug.socialIntelligence];
      package4Slugs = [StrengthSlug.honesty, StrengthSlug.love, StrengthSlug.perspective];
      package5Slugs = [StrengthSlug.fairness, StrengthSlug.leadership, StrengthSlug.loveOfLearning];
      package6Slugs = [
        StrengthSlug.carefulness,
        StrengthSlug.forgiveness,
        StrengthSlug.gratitude,
        StrengthSlug.judgement,
      ];
      package7Slugs = [
        StrengthSlug.grit,
        StrengthSlug.loveOfBeauty,
        StrengthSlug.modesty,
        StrengthSlug.spirituality,
      ];

      package1 = strengths.filter((s) => package1Slugs.includes(s.slug));
      package2 = strengths.filter((s) => package2Slugs.includes(s.slug));
      package3 = strengths.filter((s) => package3Slugs.includes(s.slug));
      package4 = strengths.filter((s) => package4Slugs.includes(s.slug));
      package5 = strengths.filter((s) => package5Slugs.includes(s.slug));
      package6 = strengths.filter((s) => package6Slugs.includes(s.slug));
      package7 = strengths.filter((s) => package7Slugs.includes(s.slug));

      waves = [package1, package2, package3, package4, package5, package6, package7];
      hasWavesContent = true;
    }
  }

  if (language === Language.en) {
    if (audienceSlug && audienceSlug === 'students-v1') {
      package1Slugs = [
        StrengthSlug.courage,
        StrengthSlug.creativity,
        StrengthSlug.humour,
        StrengthSlug.teamwork,
        StrengthSlug.enthusiasm,
        StrengthSlug.socialIntelligence,
        StrengthSlug.perspective,
      ];
      package1 = strengths.filter((s) => package1Slugs.includes(s.slug));

      waves = [package1];
      hasWavesContent = false;
    }

    if (!audienceSlug || audienceSlug === 'students-v2') {
      package1Slugs = [StrengthSlug.compassion, StrengthSlug.courage, StrengthSlug.creativity];
      package2Slugs = [StrengthSlug.curiosity, StrengthSlug.humour, StrengthSlug.teamwork];
      package3Slugs = [StrengthSlug.enthusiasm, StrengthSlug.hope, StrengthSlug.socialIntelligence];
      package4Slugs = [StrengthSlug.honesty, StrengthSlug.love, StrengthSlug.perspective];
      package5Slugs = [StrengthSlug.fairness, StrengthSlug.leadership, StrengthSlug.loveOfLearning];
      package6Slugs = [
        StrengthSlug.carefulness,
        StrengthSlug.forgiveness,
        StrengthSlug.gratitude,
        StrengthSlug.judgement,
      ];
      package7Slugs = [
        StrengthSlug.grit,
        StrengthSlug.loveOfBeauty,
        StrengthSlug.modesty,
        StrengthSlug.spirituality,
      ];

      package1 = strengths.filter((s) => package1Slugs.includes(s.slug));
      package2 = strengths.filter((s) => package2Slugs.includes(s.slug));
      package3 = strengths.filter((s) => package3Slugs.includes(s.slug));
      package4 = strengths.filter((s) => package4Slugs.includes(s.slug));
      package5 = strengths.filter((s) => package5Slugs.includes(s.slug));
      package6 = strengths.filter((s) => package6Slugs.includes(s.slug));
      package7 = strengths.filter((s) => package7Slugs.includes(s.slug));

      waves = [package1, package2, package3, package4, package5, package6, package7];
      hasWavesContent = true;
    }
  }

  return { core: coreStrengths, waves, hasWavesContent };
};

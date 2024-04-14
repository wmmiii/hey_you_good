import { MinimalFeeling } from "./storage/localDb";

type FeelingSlice = string[] | { [feeling: string]: FeelingSlice };

interface FeelingCategory {
  color: string;
  subFeelings: { [feeling: string]: FeelingSlice };
}

type FeelingModel = { [feeling: string]: FeelingCategory };

/**
 * A mapping of feelings based on The Feelings Wheel by Dr. Gloria Willcox
 *
 * https://blog.calm.com/blog/the-feelings-wheel
 */
export const gloriaWheel: FeelingModel = {
  'Happy': {
    color: '#ee856b',
    subFeelings: {
      'Optimistic': ['Inspired', 'Hopeful'],
      'Trusting': ['Intimate', 'Sensitive'],
      'Peaceful': ['Thankful', 'Loving'],
      'Powerful': ['Creative', 'Courageous'],
      'Accepted': ['Valued', 'Respected'],
      'Proud': ['Confident', 'Successful'],
      'Interested': ['Inquisitive', 'Curious'],
      'Content': ['Joyful', 'Free'],
      'Playful': ['Cheeky', 'Aroused'],
    },
  },
  'Surprised': {
    color: '#e4a34a',
    subFeelings: {
      'Excited': ['Energetic', 'Eager'],
      'Amazed': ['Awe', 'Astonished'],
      'Confused': ['Perplexed', 'Disillusioned'],
      'Startled': ['Dismayed', 'Shocked'],
    },
  },
  'Bad': {
    color: '#35ba9f',
    subFeelings: {
      'Tired': ['Sleepy', 'Unfocused'],
      'Stressed': ['Out of Control', 'Overloaded'],
      'Busy': ['Rushed', 'Pressured'],
      'Bored': ['Apathetic', 'Indifferent'],
    },
  },
  'Fearful': {
    color: '#00a3b9',
    subFeelings: {
      'Scared': ['Helpless', 'Frightened'],
      'Anxious': ['Overwhelmed', 'Worried'],
      'Insecure': ['Inadequate', 'Inferior'],
      'Weak': ['Worthless', 'Insignificant'],
      'Rejected': ['Excluded', 'Persecuted'],
      'Threatened': ['Nervous', 'Exposed'],
    },
  },
  'Angry': {
    color: '#7572b4',
    subFeelings: {
      'Let down': ['Betrayed', 'Resentful'],
      'Humiliated': ['Ridiculed', 'Disrespected'],
      'Bitter': ['Indignant', 'Violated'],
      'Mad': ['Furious', 'Jealous'],
      'Aggressive': ['Provoked', 'Hostile'],
      'Frustrated': ['Infuriated', 'Annoyed'],
      'Distant': ['Withdrawn', 'Numb'],
      'Critical': ['Skeptical', 'Dismissive'],
    },
  },
  'Disgusted': {
    color: '#ab7bb5',
    subFeelings: {
      'Disapproving': ['Judgemental'],
      'Upset': ['Appalled', 'Revolted'],
      'Awful': ['Nauseated', 'Detestable'],
      'Repelled': ['Horrified', 'Hesitant'],
    },
  },
  'Sad': {
    color: '#ce7c87',
    subFeelings: {
      'Hurt': ['Embarrassed', 'Disappointed'],
      'Depressed': ['Unsatisfactory', 'Empty'],
      'Guilty': ['Remorseful', 'Ashamed'],
      'Despair': ['Powerless', 'Grief'],
      'Vulnerable': ['Fragile', 'Victimized'],
      'Lonely': ['Isolated', 'Abandoned'],
    },
  },
};

type FeelingsList = Array<MinimalFeeling>;

function createList(model: FeelingModel): FeelingsList {
  const list: FeelingsList = [];

  const recurse = (prefix: string[], remainder: FeelingSlice) => {
    list.push({
      model: 'gloria',
      path: prefix,
    });

    if (Array.isArray(remainder)) {
      list.push(...remainder.map(f => ({
        model: 'gloria' as 'gloria',
        path: [...prefix, f],
      })));
    } else {
      for (const f in remainder) {
        recurse([...prefix, f], remainder[f]);
      }
    }
  }

  for (const name in model) {
    recurse([name], model[name].subFeelings);
  }

  return list;
}

export function getFeelingColor(feeling: MinimalFeeling) {
  return gloriaWheel[feeling.path[0]].color;
}

export const gloriaList = createList(gloriaWheel);

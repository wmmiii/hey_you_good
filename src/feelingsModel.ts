type FeelingSlice = string[] | { [feeling: string]: FeelingSlice };

interface FeelingCategory {
  color: string;
  subFeelings: { [feeling: string]: FeelingSlice };
}

/**
 * A mapping of feelings based on The Feelings Wheel by Dr. Gloria Willcox
 *
 * https://blog.calm.com/blog/the-feelings-wheel
 */
export const gloriaWheel: { [feeling: string]: FeelingCategory } = {
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

interface FeelingsIndex {
  [feeling: string]: {color: string, path: string[] },
}

function createIndex(model: { [feeling: string]: FeelingCategory }): FeelingsIndex {
  const index: FeelingsIndex = {};

  let id = {
    id: 0
  };

  for (let feelingName in gloriaWheel) {
    const feeling = model[feelingName];
    const path = [feelingName];
    index[feelingName] = {
      color: feeling.color,
      path: path,
    };

    for (let subFeeling in feeling.subFeelings) {
      addSlice(index, path, feeling.color, subFeeling, feeling.subFeelings[subFeeling])
    }
  }

  return index;
}

function addSlice(index: FeelingsIndex, parentPath: string[], color: string, feelingName: string, slice: FeelingSlice): void {
  const path = [...parentPath, feelingName];
  index[feelingName] = {
    color: color,
    path: path,
  };
  if (Array.isArray(slice)) {
    for (const subFeeling of slice) {
      index[subFeeling] = {
        color: color,
        path: [...path, subFeeling],
      };
    }
  } else {
    for (const subFeeling in slice) {
      addSlice(index, path, color, subFeeling, slice[subFeeling]);
    }
  }
}

type FeelingsList = Array<{
  name: string,
  path: string[],
  color: string,
}>;


function createList(index: FeelingsIndex): FeelingsList {
  const list: FeelingsList = [];
  
  for (const name of Object.keys(index)) {
    const feeling = index[name];
    list.push({
      name,
      ...feeling
    });
  }

  return list;
}

export const gloriaIndex = createIndex(gloriaWheel);
export const gloriaList = createList(gloriaIndex);

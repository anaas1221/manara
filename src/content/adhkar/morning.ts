export interface Dhikr {
  id: string;
  text: string;
  repeat: number;
  source: string;
  reference?: string;
}

export const morningAdhkar: Dhikr[] = [
  {
    id: 'morning-1',
    text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ.',
    repeat: 1,
    source: 'رواه مسلم',
    reference: 'صحيح مسلم'
  },
  {
    id: 'morning-2',
    text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.',
    repeat: 1,
    source: 'رواه الترمذي',
    reference: 'سنن الترمذي'
  },
  {
    id: 'morning-3',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
    repeat: 100,
    source: 'رواه مسلم',
    reference: 'صحيح مسلم'
  }
];
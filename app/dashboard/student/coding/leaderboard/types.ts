export interface DetailedStats {
  easyProblemsSolved: number;
  mediumProblemsSolved: number;
  hardProblemsSolved: number;
  contestsParticipated: number;
  averageSpeed: string;
  longestStreak: number;
  favoriteTopic: string;
  joinedDate: string;
  bestRank: number;
}

export interface User {
  rank: number;
  name: string;
  solved: number;
  accuracy: number;
  points: number;
  streak: number;
  avatar: string;
  badgeColor: string;
  detailedStats: DetailedStats;
}

export interface CurrentUser extends User {
  progress: number;
  nextRank: number;
  pointsToNextRank: number;
} 
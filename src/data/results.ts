export interface ResultStat {
  value: number;
  suffix: string;
  label: string;
}

export const resultStats: ResultStat[] = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 85, suffix: "+", label: "Websites Delivered" },
  { value: 4, suffix: "x", label: "Performance Improvement" },
];

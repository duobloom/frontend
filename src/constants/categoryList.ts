export const filterList = [
  { id: 1, text: "홈" },
  { id: 2, text: "심리케어" },
  { id: 3, text: "멘토링" },
  { id: 4, text: "정책" },
  { id: 5, text: "병원/클리닉" },
  { id: 6, text: "자유" },
];

export const categoryList = [
  { id: 1, category: "심리케어" as const },
  { id: 2, category: "멘토링" as const },
  { id: 3, category: "정책" as const },
  { id: 4, category: "병원/클리닉" as const },
  { id: 5, category: "자유" as const },
] as const;

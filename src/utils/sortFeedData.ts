import { FeedResponseType } from "@/types/FeedType";

export const sortFeedData = (feedData: FeedResponseType) => {
  const userEmotions = feedData.userEmotions.map((item) => ({
    ...item,
    updatedAt: item.createdAt,
    component: "EmotionBox",
  }));

  const coupleEmotions = feedData.coupleEmotions.map((item) => ({
    ...item,
    updatedAt: item.createdAt,
    component: "EmotionBox",
  }));

  const userBoards = feedData.userBoards.map((item) => ({
    ...item,
    component: "BoardBox",
  }));

  const coupleBoards = feedData.coupleBoards.map((item) => ({
    ...item,
    component: "BoardBox",
  }));

  const sortedItems = [...userEmotions, ...coupleEmotions, ...userBoards, ...coupleBoards].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const questionsWithAnswers = feedData.questionsWithAnswers.map((item) => ({
    ...item,
    component: "QuestionBox",
  }));

  return [...sortedItems, ...questionsWithAnswers];
};

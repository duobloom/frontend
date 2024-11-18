import { getFilterHospital } from "./hospital/getFilterHospital";
import { getHospitalInfo } from "./hospital/getHospitalInfo";
import { getSearchHospital } from "./hospital/getSearchHospital";
import { getPointTransaction } from "./mypage/getPointTransaction";
import { getMyProfile } from "./mypage/getMyProfile";
import { patchMyProfile } from "./mypage/patchMyProfile";
import { getUserTotalPoint } from "./user/getUserTotalPoint";
import { getFilterPolicy } from "./policy/getFilterPolicy";
import { getSearchPolicy } from "./policy/getSearchPolicy";
import { getBoardDetailData } from "./posts/getBoardDetailData";
import { getCommunityDetailData } from "./posts/getCommunityDetailData";
import { deletePostData } from "./posts/deletePostData";
import { putBoardUpdate } from "./posts/putBoardUpdate";
import { postComment } from "./posts/postComment";
import { deleteComment } from "./posts/deleteComment";
import { postEmotion } from "./main/postEmotion";
import { postQuestion } from "./main/postQuestion";
import { postLike, deleteBoardLike } from "./posts/postLike";
import { postScrapHospital, deleteScrapHospital, getScrapHospital } from "./hospital/scrapHospital";
import { postScrapPolicy, deleteScrapPolicy, getScrapPolicy } from "./policy/scrapPolicy";
import { getPolicyInfo } from "./policy/getPolicyInfo";
import { postScrap, deleteScrap } from "./posts/postScrap";
import { getCommunityPopularList } from "./community/getCommunityPopularList";
import { getCommunityTypeList } from "./community/getCommunityTypeList";
import { postCommunityWrite } from "./community/postCommunityWrite";
import { putCommunityUpdate } from "./community/putCommunityUpdate";

export {
  getFilterHospital,
  getHospitalInfo,
  getSearchHospital,
  getUserTotalPoint,
  getFilterPolicy,
  getSearchPolicy,
  getPointTransaction,
  getMyProfile,
  patchMyProfile,
  getBoardDetailData,
  getCommunityDetailData,
  deletePostData,
  putBoardUpdate,
  postComment,
  deleteComment,
  postEmotion,
  postQuestion,
  postLike,
  deleteBoardLike,
  postScrapHospital,
  deleteScrapHospital,
  getScrapHospital,
  postScrapPolicy,
  deleteScrapPolicy,
  getScrapPolicy,
  getPolicyInfo,
  postScrap,
  deleteScrap,
  getCommunityPopularList,
  getCommunityTypeList,
  postCommunityWrite,
  putCommunityUpdate,
};

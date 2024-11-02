import { PolicyType, PolicyListType } from "@/types";
import { InfoBox } from "../common";

type TPolicyInfo = {
  item: PolicyListType;
};
const examplePolicyData: PolicyListType = {
  policy_id: 1,
  policy_name: "청년 지원 정책",
  policy_img: "https://example.com/policy.jpg", // 예시 이미지 URL
  host: "서울시",
  start_date: "2023-01-01",
  end_date: "2023-12-31",
  keywords: [
    { keyword_id: 1, keyword_name: "창업 지원" },
    { keyword_id: 2, keyword_name: "청년" },
    { keyword_id: 3, keyword_name: "서울시" },
  ],
};

// 정책 예시 데이터
const examplePolicyDetail: PolicyType = {
  policy_id: 1,
  policy_name: "난임부부 시술비 지원",
  policy_img: "https://example.com/policy.jpg", // 예시 이미지 URL
  host: "보건복지부",
  target: "청년/중장년",
  category: "서비스(의료)",
  start_date: "2023-01-01",
  end_date: "2023-12-31",
  benefit: "최대 110만원",
  content: "청년들에게 다양한 혜택을 제공하는 지원 정책입니다.",
  keywords: [
    { keyword_id: 1, keyword_name: "창업 지원" },
    { keyword_id: 2, keyword_name: "청년" },
    { keyword_id: 3, keyword_name: "서울시" },
  ],
};

const PolicyInfo = ({ item }: TPolicyInfo) => {
  return (
    <InfoBox
      key={item.policy_id}
      variant="policy"
      policy_id={item.policy_id}
      policy_name={item.policy_name}
      policy_img={item.policy_img}
      host={item.host}
      start_date={item.start_date}
      end_date={item.end_date}
      keywords={item.keywords}
    />
  );
};

export { PolicyInfo, examplePolicyData, examplePolicyDetail };

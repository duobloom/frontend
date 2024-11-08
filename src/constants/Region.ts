const regions = [
  {
    id: 1,
    si: "서울특별시",
    gun: [
      {
        id: 1,
        name: "강남구",
        neighborhoods: [
          { id: 1, name: "개포동" },
          { id: 2, name: "논현동" },
          { id: 3, name: "대치동" },
          { id: 4, name: "도곡동" },
          { id: 5, name: "삼성동" },
          { id: 6, name: "세곡동" },
          { id: 7, name: "수서동" },
          { id: 8, name: "신사동" },
          { id: 9, name: "압구정동" },
          { id: 10, name: "역삼동" },
          { id: 11, name: "율현동" },
          { id: 12, name: "일원동" },
          { id: 13, name: "자곡동" },
          { id: 14, name: "청담동" },
        ],
      },
      {
        id: 2,
        name: "강동구",
        neighborhoods: [
          { id: 1, name: "강일동" },
          { id: 2, name: "고덕동" },
          { id: 3, name: "길동" },
          { id: 4, name: "둔촌동" },
          { id: 5, name: "명일동" },
          { id: 6, name: "상일동" },
          { id: 7, name: "성내동" },
          { id: 8, name: "암사동" },
        ],
      },
      {
        id: 3,
        name: "강북구",
        neighborhoods: [
          { id: 1, name: "미아동" },
          { id: 2, name: "번동" },
          { id: 3, name: "수유동" },
          { id: 4, name: "우이동" },
        ],
      },
      {
        id: 4,
        name: "강서구",
        neighborhoods: [
          { id: 1, name: "가양동" },
          { id: 2, name: "공항동" },
          { id: 3, name: "내발산동" },
          { id: 4, name: "등촌동" },
          { id: 5, name: "방화동" },
          { id: 6, name: "염창동" },
          { id: 7, name: "화곡동" },
        ],
      },
    ],
  },
  {
    id: 2,
    si: "경기도",
    gun: [
      {
        id: 1,
        name: "성남시",
        neighborhoods: [
          { id: 1, name: "수정구" },
          { id: 2, name: "중원구" },
          { id: 3, name: "분당구" },
        ],
      },
      {
        id: 2,
        name: "용인시",
        neighborhoods: [
          { id: 1, name: "기흥구" },
          { id: 2, name: "수지구" },
          { id: 3, name: "처인구" },
        ],
      },
      {
        id: 3,
        name: "수원시",
        neighborhoods: [
          { id: 1, name: "장안구" },
          { id: 2, name: "권선구" },
          { id: 3, name: "팔달구" },
          { id: 4, name: "영통구" },
        ],
      },
      {
        id: 4,
        name: "고양시",
        neighborhoods: [
          { id: 1, name: "덕양구" },
          { id: 2, name: "일산동구" },
          { id: 3, name: "일산서구" },
        ],
      },
    ],
  },
  {
    id: 3,
    si: "부산광역시",
    gun: [
      {
        id: 1,
        name: "해운대구",
        neighborhoods: [
          { id: 1, name: "중동" },
          { id: 2, name: "좌동" },
          { id: 3, name: "송정동" },
        ],
      },
      {
        id: 2,
        name: "사하구",
        neighborhoods: [
          { id: 1, name: "괴정동" },
          { id: 2, name: "당리동" },
          { id: 3, name: "장림동" },
          { id: 4, name: "신평동" },
          { id: 5, name: "하단동" },
        ],
      },
    ],
  },
  {
    id: 4,
    si: "대구광역시",
    gun: [
      {
        id: 1,
        name: "중구",
        neighborhoods: [
          { id: 1, name: "동인동" },
          { id: 2, name: "삼덕동" },
          { id: 3, name: "대신동" },
        ],
      },
      {
        id: 2,
        name: "달서구",
        neighborhoods: [
          { id: 1, name: "감삼동" },
          { id: 2, name: "대곡동" },
          { id: 3, name: "도원동" },
          { id: 4, name: "월성동" },
          { id: 5, name: "용산동" },
        ],
      },
    ],
  },
];

export { regions };

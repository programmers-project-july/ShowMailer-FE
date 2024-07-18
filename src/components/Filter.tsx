import React, { useState } from 'react';
import '@/components/Filter.css';
import { useQuery } from '@tanstack/react-query';
import { fetchPerformances, IPerformancePayload } from '@/apis/Performances';

//임의의 카테고리 더미 데이터, api 연결되면 지울 예정
export const category: string[] = [
  '전체',
  '교육/체험',
  '국악',
  '독주/독창회',
  '무용',
  '뮤지컬/오페라',
  '연극',
  '영화',
  '전시/미술',
  '축제',
  '콘서트',
  '클래식',
  '기타',
];

const Filter: React.FC = () => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    /** data : 쿼리 함수의 반환값을 저장하는 변수 */
    data: performances,
    /** isLoading : 쿼리 함수가 아직 반환되지 않았을 때 true를 반환하는 변수 */
    isLoading,
    /** isError : 쿼리 함수가 에러를 발생시킬 경우 true를 반환하는 변수 */
    isError,
    /** refetch : 쿼리 함수를 다시 실행하는 함수 (재조회 용으로 이용됨) */
    refetch,
  } = useQuery({
    /** queryKey : 향후 캐싱 기능에서 이용이 되며, 중복되는 요청을 방지할때에 구분자로도 이용됨 */
    queryKey: ['performances'],
    /** queryFn : 실행할 함수를 선언해주며, 주로 API요청을 호출하는 로직으로 이용됨. */
    queryFn: fetchPerformances,
  });

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setDropdownView(false);
  };

  const handleDropdownItemClick = (category: string) => {
    setSelectedCategory(category);
    setDropdownView(false);
    console.log(`Selected category: ${category}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading data</div>;

  // const categories = Array.isArray(performances)
  //   ? Array.from(new Set(performances.map((performance: IPerformancePayload) => performance.CODENAME)))
  //   : [];

  return (
    <div className="filter-container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className="dropdown-btn" style={{ border: '2px solid #efefef' }}>
          {selectedCategory ? selectedCategory : '전체'} {isDropdownView ? '▲' : '▼'}
        </button>
      </label>

      {/* REVIEW : react-query으로 반환된 데이터 적용 */}
      {/*
       * Renders a dropdown menu with a list of performance categories.
       * The dropdown is displayed when `isDropdownView` is true, and the selected category is highlighted.
       * Clicking on a category item in the dropdown will update the `selectedCategory` state and close the dropdown.
       */}
      {/* {isDropdownView && (
        <ul className="dropdown-menu">
          {performances?.map((performance, i) => (
            <li
              key={i}
              className={`dropdown-item ${selectedCategory === performance.CODENAME ? 'selected' : ''}`}
              onClick={() => handleDropdownItemClick(performance.CODENAME)}
            >
              {category}
            </li>
          ))}
        </ul>
      )} */}

      {isDropdownView && (
        <ul className="dropdown-menu">
          {category.map(
            (
              category,
              index, //['전체', ...categories]
            ) => (
              <li
                key={index}
                className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleDropdownItemClick(category)}
              >
                {category}
              </li>
            ),
          )}
        </ul>
      )}
      <input
        type="text"
        className="search-input"
        placeholder="제목 검색..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="search-btn" onClick={handleSearch} style={{ backgroundColor: '#E78295', color: 'white' }}>
        검색
      </button>
    </div>
  );
};

export default Filter;

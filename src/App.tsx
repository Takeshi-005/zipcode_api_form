import React from 'react';
import styled from 'styled-components';
import useApi from 'useApi';
import SearchArea from 'components/presentational/molecules/SearchArea';
import List from 'components/presentational/atoms/List';
import Spinner from 'components/presentational/atoms/Spinner';

// ______________________________________________________
//
// @ Types
type Props = {
  className?: string;
};

const App: React.FC<Props> = props => {
  const [query, setQuery] = React.useState('');
  const { state, setUrl } = useApi('', {
    code: '',
    data: []
  });

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(
        e.currentTarget.value
          .replace(/[０-９]/g, s =>
            String.fromCharCode(s.charCodeAt(0) - 0xfee0)
          )
          .slice(0, 7)
      );
    },
    []
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setUrl(query);
      e.preventDefault();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return (
    <div className={props.className}>
      {state.isLoading && <Spinner />}
      <h1>郵便番号を入力し該当する住所を表示します</h1>
      <SearchArea
        value={query}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={state.error}
      />
      <div className="container">
        {!state.error &&
          state.result.data.map((item, i) => (
            <React.Fragment key={`${item.prefcode}${i}`}>
              <List title="郵便番号" text={state.result.code} />
              <List title="都道府県" text={item.ja.prefecture} />
              <List
                title="市区町村"
                text={`
              ${item.ja.address1}${item.ja.address2}${item.ja.address3}${item.ja.address4}
            `}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default styled(App)`
  padding: 8px 0;
  margin: 0 auto;

  > h1 {
    font-size: 20px;
    padding: 0 8px;
    font-weight: 700;
  }

  > .container {
    padding: 0 8px;
  }
`;

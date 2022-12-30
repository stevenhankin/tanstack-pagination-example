import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { CharacterResponse, getData } from './api';

type PropsPagedCharacters = {
  page: number;
  setHasNext: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

/**
 * Example of paginating Characters
 */
const PagedCharacters: React.FC<PropsPagedCharacters> = ({
  page,
  setHasNext,
}) => {
  const queryKey: QueryKey = ['characters', page];

  const { status, error, data } = useQuery<CharacterResponse, AxiosError>({
    queryKey,
    queryFn: () => getData({ queryKey }),
  });

  /**
   * State (that tracks whether there is a "next" page) is lifted
   */
  useEffect(() => {
    setHasNext(data?.next ? true : false);
  }, [data, setHasNext]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data.results.map((d) => (
        <div key={d.name}>{d.name}</div>
      ))}
    </div>
  );
};

export default PagedCharacters;

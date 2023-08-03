import React from 'react';
import { useSearchParams } from 'next/navigation'
import SearchSection from '../SearchSection/SearchSection';
import ResultSection from '../ResultSection/ResultSection';



function Main() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');

    return (
      <React.Fragment>
        {search ? (<ResultSection search={search} />) : (<SearchSection />)}
      </React.Fragment>
    )
}

export default Main;

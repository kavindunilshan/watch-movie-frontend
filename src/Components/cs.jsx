import React from 'react'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

export function withRouter(Child) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      return <Child { ...props } navigate={ navigate } location={ location } searchParams={searchParams} />;
    }
}
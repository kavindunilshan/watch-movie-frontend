import React from 'react'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {useAuthContext} from "@asgardeo/auth-react";

export function withRouter(Child) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      const { state, signIn } = useAuthContext();
      return <Child { ...props }
                    navigate={ navigate }
                    location={ location }
                    state={state}
                    signIn={signIn}
                    searchParams={searchParams}
      />;
    }
}
import React from 'react';
import { UserStore } from '../../firebase/UserStore';

const ListView = (props) => {

    const user = UserStore.useState(state => state.user);

    return (
        <>
            
        </>
    )
};

export default ListView;
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import type {UserProfile} from '@mattermost/types/users';

import {getStatusForUserId} from 'mattermost-redux/selectors/entities/users';

import {getHideUsername} from 'selectors/plugins';

import type {GlobalState} from 'types/store';

import UserListRow from './user_list_row';

type OwnProps = {
    user: UserProfile;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const user = ownProps.user;
    return {
        status: getStatusForUserId(state, user.id),

        // For RemoTalk plugin
        hideUsername: getHideUsername(state),
    };
}

export default connect(mapStateToProps)(UserListRow);

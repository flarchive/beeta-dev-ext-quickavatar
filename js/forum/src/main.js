import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Post from 'flarum/components/Post'

import QuickAvatar from 'beeta-dev/ext-quickavatar/components/QuickAvatar';

app.initializers.add('beeta-quickavatar', app => {
    extend(Post.prototype, 'actionItems', function(items) {
        var quickAvatar = new QuickAvatar;
        quickAvatar.id = this.props.post.data.id;
        quickAvatar.content = this.props.post.data.attributes.content;
        quickAvatar.discussionId = this.props.post.data.relationships.discussion.data.id;
        quickAvatar.discussion = this.props.post.store.data.discussions[quickAvatar.discussionId];
        quickAvatar.userId = this.props.post.data.relationships.user.data.id;
        quickAvatar.username = this.props.post.store.data.users[quickAvatar.userId].data.attributes.username;
        quickAvatar.avatarUrl = this.props.post.store.data.users[quickAvatar.userId].data.attributes.avatarUrl;
        items.add('beeta-quickavatar',
            !app.session.user
            ? ""
            : quickAvatar
            , 5);
    });
});
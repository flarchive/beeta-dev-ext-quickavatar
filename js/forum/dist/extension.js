System.register('beeta-dev/ext-quickavatar/components/QuickAvatar', ['flarum/Component', 'flarum/helpers/icon', 'flarum/helpers/avatar', 'flarum/utils/DiscussionControls', 'flarum/components/TextEditor'], function (_export) {
    'use strict';

    var Component, icon, avatar, DiscussionControls, TextEditor, QuickAvatar;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumUtilsDiscussionControls) {
            DiscussionControls = _flarumUtilsDiscussionControls['default'];
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }],
        execute: function () {
            QuickAvatar = (function (_Component) {
                babelHelpers.inherits(QuickAvatar, _Component);

                function QuickAvatar() {
                    babelHelpers.classCallCheck(this, QuickAvatar);
                    babelHelpers.get(Object.getPrototypeOf(QuickAvatar.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(QuickAvatar, [{
                    key: 'init',
                    value: function init() {
                        this.id = null;
                        this.content = null;
                        this.userId = null;
                        this.username = null;
                        this.avatarUrl = null;
                        this.discussion = null;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m('button', {
                            className: 'Button beeta-quickavatar hasIcon',
                            onclick: this.process.bind(this)
                        }, [m('i', { className: 'icon fa fa-fw fa-bolt Button-icon' }, ''), m('span', { className: 'button-label' }, 'Quick Avatar')]);
                    }
                }, {
                    key: 'process',
                    value: function process(e) {
                        if (this.avatarUrl != null) {
                            DiscussionControls.replyAction.call(this.discussion, false);
                            e.stopPropagation();
                            var textarea = $(".TextEditor textarea");
                            var newContent = '';
                            var oldValue = textarea.val();
                            newContent = '[quote]@' + this.username + '#' + this.id + ' ' + this.content + '[/quote][img]' + this.avatarUrl + '[/img]';
                            if (oldValue != '') {
                                newContent = oldValue + '\n' + newContent;
                            } else {
                                newContent = newContent;
                            }
                            app.composer.minimize();
                            e.stopPropagation();
                            textarea.val(newContent).trigger('input');
                            var pos = newContent.length;
                            textarea[0].setSelectionRange(pos, pos);
                            textarea.focus();
                        } else {
                            alert("Esse usuário não tem avatar... NOOB");
                        }
                    }
                }]);
                return QuickAvatar;
            })(Component);

            _export('default', QuickAvatar);
        }
    };
});;
System.register('beeta-dev/ext-quickavatar/main', ['flarum/extend', 'flarum/app', 'flarum/components/Post', 'beeta-dev/ext-quickavatar/components/QuickAvatar'], function (_export) {
    'use strict';

    var extend, app, Post, QuickAvatar;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsPost) {
            Post = _flarumComponentsPost['default'];
        }, function (_beetaDevExtQuickavatarComponentsQuickAvatar) {
            QuickAvatar = _beetaDevExtQuickavatarComponentsQuickAvatar['default'];
        }],
        execute: function () {

            app.initializers.add('beeta-quickavatar', function (app) {
                extend(Post.prototype, 'actionItems', function (items) {
                    var quickAvatar = new QuickAvatar();
                    quickAvatar.id = this.props.post.data.id;
                    quickAvatar.content = this.props.post.data.attributes.content;
                    quickAvatar.discussionId = this.props.post.data.relationships.discussion.data.id;
                    quickAvatar.discussion = this.props.post.store.data.discussions[quickAvatar.discussionId];
                    quickAvatar.userId = this.props.post.data.relationships.user.data.id;
                    quickAvatar.username = this.props.post.store.data.users[quickAvatar.userId].data.attributes.username;
                    quickAvatar.avatarUrl = this.props.post.store.data.users[quickAvatar.userId].data.attributes.avatarUrl;
                    items.add('beeta-quickavatar', !app.session.user ? "" : quickAvatar, 5);
                });
            });
        }
    };
});
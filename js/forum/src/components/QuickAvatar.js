import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import avatar from 'flarum/helpers/avatar';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import TextEditor from 'flarum/components/TextEditor';

export default class QuickAvatar extends Component {

    init() {
        this.id = null;
        this.content = null;
        this.userId = null;
        this.username = null;
        this.avatarUrl = null;
        this.discussion = null;
    }

    view() {
        return m('button', {
                className: 'Button beeta-quickavatar hasIcon',
                onclick: this.process.bind(this)
            },
            [
                m('i', {className: 'icon fa fa-fw fa-bolt Button-icon'}, ''),
                m('span', {className: 'button-label'}, 'Quick Avatar')
            ]);
    }

    process(e) {
        if(this.avatarUrl!=null){
            DiscussionControls.replyAction.call(this.discussion, false);
            e.stopPropagation();
            var textarea = $(".TextEditor textarea");
            var newContent = '';
            var oldValue = textarea.val();
            newContent = '[quote]@' + this.username + '#' + this.id + ' ' + this.content + '[/quote][img]' + this.avatarUrl + '[/img]';
            if(oldValue!=''){
                newContent = oldValue+'\n'+newContent;
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
}
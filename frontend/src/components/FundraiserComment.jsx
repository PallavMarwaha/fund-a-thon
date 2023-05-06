export default function FundraiserComment({ user, text, created_at }) {
    return (
        <article className="uk-comment bg-gray-50 p-4" role="comment">
            <header className="uk-comment-header">
                <div className="uk-grid-medium uk-flex-middle flex">
                    <div className="uk-width-auto">
                        <img
                            className="uk-comment-avatar"
                            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                            width="80"
                            height="80"
                            alt=""
                        />
                    </div>
                    <div className="uk-width-expand">
                        <h4 className="uk-comment-title uk-margin-remove">
                            <span className="uk-link-reset" href="#">
                                {user.first_name} {user.last_name}
                            </span>
                        </h4>
                        <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li>
                                <span>{created_at}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="uk-comment-body">
                <p>{text}</p>
            </div>
        </article>
    );
}

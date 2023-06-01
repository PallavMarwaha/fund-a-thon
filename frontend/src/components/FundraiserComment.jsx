export default function FundraiserComment({ user, text, created_at, img }) {
    const getRandomImg = () => {
        return `https://xsgames.co/randomusers/assets/avatars/pixel/${Math.floor(Math.random() * 50) + 1}.jpg`;
    };

    return (
        <article className="uk-comment bg-gray-50 p-4" role="comment">
            <header className="uk-comment-header">
                <div className="uk-grid-medium uk-flex-middle flex">
                    <div className="uk-width-auto">
                        <img className="uk-comment-avatar" src={getRandomImg()} width="80" height="80" alt="" />
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

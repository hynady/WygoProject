import './Posting.css'

const Posting = ({ togglePostingInput, avatar, name }) =>
{
    return(
        <div className='posting_container'>
            <div className='posting_area'>
                <div className='mini_avatar'>
                    <img src={localStorage.getItem("avatar")}></img>
                </div>
                <div className='posting_button'>
                    <a style={{ cursor: 'pointer' }} className='posting_button_content' onClick={togglePostingInput}>
                        Bạn đang nghĩ gì?
                        <i style={{marginRight:'0.5rem'}} className="far fa-images"></i>
                    </a>
                </div>
            </div>
        </div>)
}

export default Posting
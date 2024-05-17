import './PostReports.css'

const PostReports = () =>
{
    return(
        <div className='post_report_container'>
            <div className='post_report_table'>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            User báo cáo
                        </th>
                        <th>
                            Bài viết bị báo cáo
                        </th>
                        <th>
                            Lý do
                        </th>
                        <th>
                            Thời gian báo cáo
                        </th>
                        <th>
                            Trạng thái xử lý
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            2
                        </td>
                        <td className='user_info_cell'>
                            <div className='user_info_avatar'>
                                <img src='https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg'></img>
                            </div>
                            <div className='user_info'>
                                <h4>
                                    Công Phan
                                </h4>
                                <div>
                                    /congphan123
                                </div>
                            </div>
                        </td>
                        <td>
                            Bài viết của Công Phan
                        </td>
                        <td>
                            Bruh
                        </td>
                        <td>
                            22/14/2004
                        </td>
                        <td>
                            <i class="far fa-times-circle" style={{color: 'red', fontSize: '1.5rem'}}></i>
                        </td>
                        <td>
                            <a>
                                <i class="far fa-eye" style={{fontSize: '1.5rem'}}></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2
                        </td>
                        <td className='user_info_cell'>
                            <div className='user_info_avatar'>
                                <img src='https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg'></img>
                            </div>
                            <div className='user_info'>
                                <h4>
                                    Công Phan
                                </h4>
                                <div>
                                    /congphan123
                                </div>
                            </div>
                        </td>
                        <td>
                            Bài viết của Công Phan
                        </td>
                        <td>
                            Bruh
                        </td>
                        <td>
                            22/14/2004
                        </td>
                        <td>
                            <i class="far fa-times-circle" style={{color: 'red', fontSize: '1.5rem'}}></i>
                        </td>
                        <td>
                            <a>
                                <i class="far fa-eye" style={{fontSize: '1.5rem'}}></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2
                        </td>
                        <td className='user_info_cell'>
                            <div className='user_info_avatar'>
                                <img src='https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg'></img>
                            </div>
                            <div className='user_info'>
                                <h4>
                                    Công Phan
                                </h4>
                                <div>
                                    /congphan123
                                </div>
                            </div>
                        </td>
                        <td>
                            Bài viết của Công Phan
                        </td>
                        <td>
                            Bruh
                        </td>
                        <td>
                            22/14/2004
                        </td>
                        <td>
                            <i class="far fa-times-circle" style={{color: 'red', fontSize: '1.5rem'}}></i>
                        </td>
                        <td>
                            <a>
                                <i class="far fa-eye" style={{fontSize: '1.5rem'}}></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    )
}

export default PostReports
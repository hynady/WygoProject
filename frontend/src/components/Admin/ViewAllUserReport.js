import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllUserReport.css';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
import {Link} from "react-router-dom";

const ViewAllUserReport = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.post('https://wygo-ojzf.onrender.com/reports/user/all');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="user-report-container">
            <table className="user-report-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User báo cáo</th>
                    <th>User bị báo cáo</th>
                    <th>Lý do</th>
                    <th>Trạng thái xử lý</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td className='user_info_cell'>
                            <div className='user_info_avatar'>
                                <img src={report.author.avatar}></img>
                            </div>
                            <div className='user_info'>
                                <h4>
                                    {report.author.name}
                                </h4>
                                <div>
                                    /{report.author.username}
                                </div>
                            </div>
                        </td>
                        <td className='user_info_cell'>
                            <div className='user_info_avatar'>
                                <img src={report.reportObject.avatar}></img>
                            </div>
                            <div className='user_info'>
                                <h4>
                                    {report.reportObject.name}
                                </h4>
                                <div>
                                    /{report.reportObject.username}
                                </div>
                            </div>
                        </td>
                        <td>
                            <Link to={`admin/urp/${report.reportObject.username}`}>{report.reportObject.content}</Link>
                        </td>
                        <td>{report.reportType}</td>
                        <td>
                            {report.resolved ? (
                                <CheckCircleOutline style={{ color: 'green' }} />
                            ) : (
                                <CancelOutlined style={{ color: 'red' }} />
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllUserReport;

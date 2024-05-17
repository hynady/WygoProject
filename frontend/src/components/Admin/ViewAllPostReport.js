import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
import './ViewAllUserReport.css';

const ViewAllPostReport = () => {
    const [reportPosts, setReportPosts] = useState([]);

    useEffect(() => {
        const fetchReportPosts = async () => {
            try {
                const response = await axios.post("https://wygo-ojzf.onrender.com/reports/post/all");
                setReportPosts(response.data);
            } catch (error) {
                console.error("Error fetching report posts:", error);
            }
        };

        fetchReportPosts();
    }, []);

    return (
        <div className="user-report-container">
            <table className="user-report-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User báo cáo</th>
                    <th>Bài viết bị báo cáo</th>
                    <th>Lý do</th>
                    <th>Trạng thái xử lý</th>
                </tr>
                </thead>
                <tbody>
                {reportPosts.map((report) => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td className="user_info_cell">
                            <div className="user_info_avatar">
                                <img src={report.author.avatar} alt="User Avatar" />
                            </div>
                            <div className="user_info">
                                <h4>{report.author.name}</h4>
                                <div>{report.author.username}</div>
                            </div>
                        </td>
                        <td>
                            <Link to={`/post/${report.id}`}>{report.reportObject.content}</Link>
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

export default ViewAllPostReport;

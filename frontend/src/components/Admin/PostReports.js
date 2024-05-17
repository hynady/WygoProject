import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './PostReports.css'

const PostReports = () => {
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

    const formatDate = (postTime) => {
        const [year, month, day] = postTime;

        const monthNames = [
            "tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6",
            "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"
        ];

        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <div className="post_report_container">
            <div className="post_report_table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User báo cáo</th>
                    <th>Bài viết bị báo cáo</th>
                    <th>Lý do</th>
                    <th>Thời gian báo cáo</th>
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
                        <td>{formatDate(report.reportTime)}</td>
                        <td>
                            {report.resolved ? (
                                <i className="fas fa-check-circle" style={{ color: "green", fontSize: "1.5rem" }}></i>
                            ) : (
                                <i className="far fa-times-circle" style={{ color: "red", fontSize: "1.5rem" }}></i>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </div>
        </div>
    );
};

export default PostReports;

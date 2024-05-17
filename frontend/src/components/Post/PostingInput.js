import './PostingInput.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set } from "firebase/database";
import axios from "axios";

const MapWithDynamicCenter = ({ mapPosition }) => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            map.setView(mapPosition, map.getZoom());
        }
    }, [map, mapPosition]);

    return null;
};

const PostingInput = ({ togglePostingInput }) => {

    const [mediaAreaVisible, setMediaAreaVisible] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mapPosition, setMapPosition] = useState([10.762622, 106.660172]); // Default position
    const [markerPosition, setMarkerPosition] = useState(mapPosition);
    const [inputText, setInputText] = useState(''); // State to track input text
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const newPosition = [position.coords.latitude, position.coords.longitude];
                    setMapPosition(newPosition);
                    setMarkerPosition(newPosition); // Set marker position to current location
                }, (error) => {
                    console.error("Error getting current location:", error);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        getLocation();
    }, []);

    const firebaseConfig = {
        apiKey : "AIzaSyDzVEplqgnutPKvGohdq-OVD1pyyPQYHWE" ,
        authDomain : "wygofirebase.firebaseapp.com" ,
        databaseURL : "https://wygofirebase-default-rtdb.firebaseio.com" ,
        projectId : "wygofirebase" ,
        storageBucket : "wygofirebase.appspot.com" ,
        messagingSenderId : "116194002232" ,
        appId : "1:116194002232:web:3e27fdef9a117e0de0adcd"
    };

    const app = initializeApp(firebaseConfig);

    const toggleMediaArea = () => {
        setMediaAreaVisible(!mediaAreaVisible);
        setSelectedMedia(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedMedia(file);
    };

    const handleSubmit = async () => {
        if (app) {
            try {
                let postData = {
                    author: localStorage.getItem("username"),
                    content: inputText,
                    location: `${markerPosition[0]},${markerPosition[1]}`, // Format the location data
                    media: ''
                };

                if (selectedMedia) {
                    const storage = getStorage(app);
                    const storageReference = storageRef(storage, 'media/' + selectedMedia.name);
                    const uploadTask = uploadBytesResumable(storageReference, selectedMedia);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                            console.error('Error uploading media:', error);
                        },
                        async () => {
                            try {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                postData.media = downloadURL;

                                const response = await fetch('https://wygo-ojzf.onrender.com/posts/posting', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(postData)
                                });

                                if (response.ok) {
                                    console.log('Posting Successful');
                                    setSelectedMedia(null);
                                    setInputText('');
                                    togglePostingInput();
                                } else {
                                    console.error('Error:', response.statusText);
                                }
                            } catch (error) {
                                console.error('Error sending post data:', error);
                            }
                        }
                    );
                } else {
                    // If no media is selected, directly post the data
                    const response = await fetch('https://wygo-ojzf.onrender.com/posts/posting', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(postData)
                    });

                    if (response.ok) {
                        console.log('Posting Successful');
                        setInputText('');
                        togglePostingInput(); // Close the component
                    } else {
                        console.error('Error:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    const handleMapClick = (event) => {
        setMarkerPosition([event.latlng.lat, event.latlng.lng]); // Update marker position on map click
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            setSelectedMedia(file);
        } else {
            alert('Only image or video files are allowed.');
        }
    };

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDateTime = `${day} Tháng ${month}, ${year}`;


    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const isSubmitActive = inputText.trim() !== '' && (!mediaAreaVisible || (mediaAreaVisible && selectedMedia));


    return (
        <div className='posting_input_container' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <div className='header_text'>
                <h3>Tạo bài viết</h3>
                <a style={{ cursor: 'pointer' }} onClick={togglePostingInput}>
                    <i className='fas fa-times'></i>
                </a>
            </div>
            <div className='posting_input_breakline'></div>
            <div className='posting_input_content'>
                <div className='posting_input_content_header'>
                    <div className='mini_avatar'>
                        <img src={localStorage.getItem("avatar")} alt='avatar' />
                    </div>
                    <div className='post_header_info'>
                        <h4>{localStorage.getItem("name")}</h4>
                        <div>{formattedDateTime}</div>
                    </div>
                </div>
                <div className='content_text'>
                    <input className='input_text' placeholder='Bạn đang nghĩ gì?' onChange={handleInputChange} />
                </div>
                <MapContainer center={mapPosition} zoom={13} style={{ height: '300px', margin: '1rem' }}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a  href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={markerPosition}>
                        <Popup>{markerPosition}</Popup>
                    </Marker>
                    <MapWithDynamicCenter mapPosition={mapPosition} />
                    <ClickHandler onClick={handleMapClick} />
                </MapContainer>
                {mediaAreaVisible && (
                    <div className='media_area'>
                        {selectedMedia ? (
                            selectedMedia.type.startsWith('image') ? (
                                <img src={URL.createObjectURL(selectedMedia)} alt='selected media' />
                            ) : (
                                <video controls>
                                    <source src={URL.createObjectURL(selectedMedia)} type={selectedMedia.type} />
                                </video>
                            )
                        ) : (
                            <>
                                <label htmlFor='file-upload' className='media_upload_label'>
                                    Drag & Drop or Click to upload image
                                </label>
                                <input
                                    id='file-upload'
                                    type='file'
                                    accept='image/*,video/*'
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className={`posting_options_mini_button ${isSubmitActive ? 'active' : ''}`}>
                <div className='text'>Thêm vào bài viết của bạn</div>
                <div className='icon'>
                    <i style={{ cursor: 'pointer' }} className='far fa-images' onClick={toggleMediaArea}></i>
                    <i className="fas fa-map-marker-alt"></i>
                </div>
            </div>
            <a style={{ cursor: 'pointer' }} className="post_submit_button" style={{ backgroundColor: isSubmitActive ? 'blue' : '#e4e6eb' }} onClick={handleSubmit}>
                <div className={`blurred_text ${isSubmitActive ? 'text_filled' : ''}`}>Đăng</div>
            </a>

        </div>
    );
};

const ClickHandler = ({ onClick }) => {
    useMapEvents({
        click: onClick,
    });
    return null;
};

export default PostingInput;
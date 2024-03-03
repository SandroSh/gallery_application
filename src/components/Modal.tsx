import { useEffect, useState } from "react"
import {newModalProps, statsType } from "../types"
import { ModalDiv, ContentDiv,ImgDiv, Close, ModalContent, ImageCircle, InfoDiv, ProfileContainer, StatsDiv, IconsDiv,DownloadButton } from "./styled/Modal.style"
import axios from "axios";
import ViewsIcon from "../assets/Views.svg";
import LikesIcon from "../assets/Likes.svg";
import DownloadsIcon from "../assets/Downloads.svg";
import CloseIcon from "../assets/Close.svg";

export const Modal = ({ closeModal, id, image, profileImage, portfolioUrl,name}:newModalProps) => {

    const API_Statistics_URL = 'https://api.unsplash.com/photos';
    const [stats, setStats] = useState<statsType | null>();
    useEffect((() => {
        const fetchData = async () => {

            try {
                const response = await axios.get<statsType>(
                    `${API_Statistics_URL}/${id}/statistics?client_id=${import.meta.env.VITE_API_KEY}`
                );
                setStats(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchData();
    }), []);
;
    return (
        <ModalDiv>
            <Close src={CloseIcon} onClick={() => closeModal(false)} alt="Close Icon" />

            <ContentDiv>
                <ImgDiv>
                    <img src={image} alt="" />
                </ImgDiv>

                <InfoDiv>
                    <ProfileContainer>
                        <ImageCircle>
                            <a href={portfolioUrl} target="_blank" ><ModalContent src={profileImage} /></a>
                        </ImageCircle>
                        <h3>{name?.trim()}</h3>

                    </ProfileContainer>

                    <StatsDiv>
                        <IconsDiv>
                            <img src={ViewsIcon} alt="Views Icon" />
                            <h3>{stats?.views.total || "Loading...."}</h3>
                        </IconsDiv>
                        <IconsDiv>
                            <img src={LikesIcon} alt="Likes Icon" />
                            <h3>{stats?.likes.total || "Loading...." }</h3>
                        </IconsDiv>
                        <IconsDiv>
                            <img src={DownloadsIcon} alt="Downloads Icon" />
                            <h3>{stats?.downloads.total || "Loading...."}</h3>
                        </IconsDiv>


                    </StatsDiv>

                </InfoDiv>
            </ContentDiv>
        </ModalDiv>
    )
}

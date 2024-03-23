import { useEffect, useRef, useState, useCallback, SetStateAction } from 'react';
import axios from 'axios';
import { MyResponseData, logType, newModalProps } from './types';
import { ImagesDiv, InnerDiv } from './components/styled/MainPage.style';
import { Modal } from './components/Modal';
import { Input, MainContainer } from './components/styled/SearchInput.style';
import { useDebounce } from './DebounceHook';
import { useQuery } from '@tanstack/react-query';

export let logs: logType[] = [];

export const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<newModalProps>();
    const [imagesData, setImagesData] = useState<MyResponseData[] | null>();
    const [searchedImage, setSearchedImage] = useState<MyResponseData[] | null>();
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const debouncedSearch = useDebounce(query);

    //refs and callback function for infinite Scrolling
    const observer = useRef<IntersectionObserver | null>(null);
    const lastImgElementRef = useCallback((node: HTMLImageElement) => {
        if (isLoading) return;
        if (observer.current) {
            (observer.current as IntersectionObserver).disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);

            }
        })
        if (node) observer.current?.observe(node);
    }, [isLoading]);


    const fetchImages = async (pageNumber: number, debouncedSearch: string) => {

        const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${debouncedSearch}&per_page=20&client_id=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching photos: ${response.status}`);
        }
        console.log("Fetchiing");
        const data = await response.json();
        const currTime = new Date().toLocaleTimeString();
        const text = debouncedSearch;
        const log: logType = { text, currTime };
        logs.unshift(log);
        return data;
    };


    const { data } = useQuery({
        queryFn: () => fetchImages(pageNumber, debouncedSearch),
        queryKey: ["images", pageNumber],
        enabled: !!debouncedSearch,

    });


    useEffect(() => {

        if (data) {

            setSearchedImage([...data.results]);
            setQuery("");
            setIsLoading(false);
        }

    }, [data, pageNumber]);



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios({
                    method: 'GET',
                    url: `https://api.unsplash.com/photos?page=${pageNumber}&per_page=20&order_by=popular&client_id=${import.meta.env.VITE_API_KEY}`,

                });

                if (response.data) {
                    setImagesData((prevImages) => {
                        if (Array.isArray(prevImages)) {
                            return [...prevImages, ...response.data];
                        } else {
                            return [...response.data];
                        }

                    });

                }

            } catch (error) {
                console.error('Error fetching data:', error);

            } finally {
                setIsLoading(false);
            }

        };
        fetchData();

    }, [pageNumber]);

    function handleSearch(e: { target: { value: SetStateAction<string>; }; }) {
        setQuery(e.target.value);
    
    }

    const openModal = (id: string, image: string, name: string, profile_image: string, portfolio_url: string, likes: number) => {
        setIsModalOpen(true);
        const modalData: newModalProps = {
            id: id,
            closeModal: function (newValue: boolean): void {
                setIsModalOpen(newValue);
            },
            image: image,
            name: name,
            portfolioUrl: portfolio_url,
            profileImage: profile_image,
            likes: likes,
        }

        setModalImage(modalData);
    }

    console.log(pageNumber);
    return (
        <div>
            <MainContainer>
                <Input placeholder="Search Images..." type='text' onChange={handleSearch} />
            </MainContainer>
            <ImagesDiv>
                {!searchedImage ?
                    <>
                        <InnerDiv>
                            {imagesData?.slice(0, imagesData.length / 3).map((item, index) => {

                                if (imagesData?.slice(0, imagesData.length / 3).length - 1 === index) {
                                    return <img ref={lastImgElementRef} key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large, item.user.portfolio_url, item.likes)} alt={item.description} title={item.description} />;
                                } else {
                                    return <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large, item.user.portfolio_url, item.likes)} alt={item.description} title={item.description} />;
                                }

                            })}
                        </InnerDiv>
                        <InnerDiv>
                            {imagesData?.slice(imagesData.length / 3, imagesData.length / 3 * 2).map((item, index) => {
                                return <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large, item.user.portfolio_url, item.likes)} alt={item.description} title={item.description} />;
                            }
                            )}
                        </InnerDiv>
                        <InnerDiv>
                            {imagesData?.slice(imagesData.length / 3 * 2, imagesData.length).map((item, index) => <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large, item.user.portfolio_url, item.likes)} alt={item.description} title={item.description} />)}
                        </InnerDiv>
                    </>
                    :
                    <InnerDiv>
                        {searchedImage?.map((item, index) => <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large, item.user.portfolio_url, item.likes)} alt={item.description} title={item.description} />)}
                    </InnerDiv>

                }
            </ImagesDiv>
            {isModalOpen && <Modal modalInfo={modalImage} />}
        </div>
    )
}

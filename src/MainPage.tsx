import { useEffect, useRef, useState, useCallback, SetStateAction } from 'react';
import axios from 'axios';
import { MyResponseData, MySearchResponseData, logType, newModalProps } from './types';
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

    const [query, setQuery] = useState<string>('');
    const [searchedData, setSearchedData] = useState<MySearchResponseData[] | null>();
    const [isSearchShown, setIsSearchShown] = useState(false);
    const debouncedSearch = useDebounce(query);
  

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);

    //refs and callback function for infinite Scrolling
    const observer = useRef<IntersectionObserver | null>(null);
    const lastImgElementRef = useCallback((node: HTMLImageElement) => {
        if (isLoading) return;
        if (observer.current) {
            (observer.current as IntersectionObserver).disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if (node) observer.current?.observe(node);
    }, [isLoading, hasMore]);


    const fetchImages = async () => {

        const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${debouncedSearch}&per_page=20&client_id=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching photos: ${response.status}`);
        }
        const data = await response.json();
        const currTime = new Date().toLocaleTimeString();
        const text = debouncedSearch;
        const log: logType = { text, currTime };
        logs.unshift(log);
        return data;
    };

    const { data } = useQuery({
        queryFn: () => fetchImages(),
        queryKey: ["images"],
        enabled: !!debouncedSearch,

    });

    useEffect(() => {

        if (data) {
            const result = data.results;
            setSearchedData([...result]);
            setQuery("");
        }

    }, [data, pageNumber]);


// fetching with axios just for exper
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
                            return [... new Set([...prevImages, ...response.data])];
                        } else {
                            return [...new Set([...response.data])];
                        }

                    });
                } else {
                    setError('Empty response from API');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    }, [pageNumber]);

    function handleSearch(e: { target: { value: SetStateAction<string>; }; }) {
        if (e.target.value == "") {
            setIsSearchShown(false);
            setSearchedData(null);
        } else {
            setIsSearchShown(true);
        }
        setQuery(e.target.value);
        setPageNumber(1);
    }
    const openModal = (id:string, image:string, name:string,profile_image:string,portfolio_url:string) => {
        setIsModalOpen(true);
        const modalData:newModalProps = {
            id: id,
            closeModal: function (newValue: boolean): void {
                setIsModalOpen(newValue);
            },
            image: image,
            name: name,
            portfolioUrl: portfolio_url,
            profileImage:profile_image
        }

        setModalImage(modalData);
    }


    const array1: MyResponseData[] | null | undefined = imagesData?.slice(0, imagesData.length / 3 - 1);
    const array2: MyResponseData[] | null | undefined = imagesData?.slice(imagesData.length / 3 - 1, imagesData.length / 3 * 2);
    const array3: MyResponseData[] | null | undefined = imagesData?.slice(imagesData.length / 3 * 2, imagesData.length);



    return (
        <div>
            <MainContainer>
                <Input placeholder="Search Images....." type='text' onChange={handleSearch} />
            </MainContainer>


            {
                !isSearchShown ?
                    <ImagesDiv>

                        {/* There where i pass index as a key parameter of each image,  it will be better if we pass image's id, but as i see and explore, some images are repeating when we fetch 1000-2000 of them */}

                        <InnerDiv>
                            {
                                array1?.map((item, index) => {

                                    if (array1?.length === index + 1) {
                                        return <img ref={lastImgElementRef} key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large ,item.user.portfolio_url)} alt={item.description} title={item.description} />
                                    } else {
                                        return <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small, item.user.name, item.user.profile_image.large ,item.user.portfolio_url)} alt={item.description} title={item.description} />
                                    }

                                })

                            }
                        </InnerDiv>
                        <InnerDiv>
                            {
                                array2?.map((item, index) => {
                                    return <img key={index} src={item.urls.small} onClick={() => openModal(item.id,item.urls.small,item.user.name, item.user.profile_image.large ,item.user.portfolio_url)} alt={item.description} title={item.description} />
                                }
                                )
                            }
                        </InnerDiv>
                        <InnerDiv>
                            {
                                array3?.map((item, index) => <img key={index} src={item.urls.small} onClick={() => openModal(item.id, item.urls.small,item.user.name, item.user.profile_image.large ,item.user.portfolio_url)} alt={item.description} title={item.description} />)
                            }
                        </InnerDiv>
                    </ImagesDiv>
                    :
                    <ImagesDiv>
                        <InnerDiv>
                            {
                                searchedData?.map((item, index) => {
                                    if (searchedData.length === index + 1) {
                                   return <img src={item.urls.small} key={index} ref={lastImgElementRef} onClick={() => openModal(item.id, item.urls.small ,item.user.name, item.user.profile_image.large ,item.user.portfolio_url)}/>
                                } else {
                                    return <img src={item.urls.small} key={index} onClick={() => openModal(item.id, item.urls.small,item.user.name,item.user.profile_image.large ,item.user.portfolio_url)} />
                                }})
                            
                            }

                        </InnerDiv>
                    </ImagesDiv>

            }


            {isModalOpen && <Modal  {...modalImage}  />}

        </div>
    )
}




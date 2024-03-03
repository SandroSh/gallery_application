import  { useState } from 'react'
import { ImagesDiv, InnerDiv } from './styled/MainPage.style'
import { Modal } from './Modal'
import { MyResponseData, MySearchResponseData } from '../types'

export const AllImages = ({AllImagesData}:MyResponseData[]) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<MyResponseData | null>(null);
    const openModal = (imageData: MyResponseData) => {
        setIsModalOpen(true);
        setModalImage(imageData)
    }


    var array1: MyResponseData[] | MySearchResponseData[] | null | undefined = AllImagesData?.slice(0, AllImagesData.length / 3);
    var array2: MyResponseData[] | MySearchResponseData[] | null | undefined = AllImagesData?.slice(AllImagesData.length / 3, AllImagesData.length / 3 * 2);
    var array3: MyResponseData[] | MySearchResponseData[] | null | undefined = AllImagesData?.slice(AllImagesData.length / 3 * 2, AllImagesData.length);
  return (
    <div>
        <div>
            <ImagesDiv>

                {/* There where i pass index as a key parameter of each image, 
                it will be better if we pass image's id, but as i see and explore, some images are repeating when we fetch 1000-2000 of them */}

                <InnerDiv>
                    {
                        array1?.map((item, index) => <img key={index} src={item.urls.small} onClick={() => openModal(item)} alt='ege' title='wf' />)
                    }
                </InnerDiv>
                <InnerDiv>
                    {

                        // array2?.map((item, index) => {
                        //     if (array2?.length === index + 1) {
                        //         return <img ref={lastImgElementRef} key={index} src={item.urls.small} onClick={() => openModal(item)} alt='ege' title='wf' />
                        //     } else {
                        //         return <img key={index} src={item.urls.small} onClick={() => openModal(item)} alt='ege' title='wf' />
                        //     }

                        // }
                        // )
                    }
                </InnerDiv>
                <InnerDiv>
                    {
                        // array3?.map((item, index) => <img key={index} src={item.urls.small} onClick={() => openModal(item)} alt='ege' title='wf' />)
                    }
                </InnerDiv>
            </ImagesDiv>
            {isModalOpen && <Modal closeModal={setIsModalOpen} imageData={modalImage} />}
        </div>
    </div>
  )
}

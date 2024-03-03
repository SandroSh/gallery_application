import axios from 'axios';
import { useEffect } from 'react'
import { MyResponseData } from '../types';

export const useImageSearch = (query: string, pageNumber: number) => {

    useEffect((() => {
        const fetchData = async () => {
          
          
            try {
               axios({
                    method:'GET',
                    url: "https://api.unsplash.com/search/photos",
                    params: {
                        page: pageNumber,
                        query,
                        per_page: 20,
                        client_id: import.meta.env.VITE_API_KEY,
                    }
               }).then(response => {
                console.log(response.data);
               })



            } catch (error) {
                console.error('Error fetching data:', error);


            };
            
        }
        fetchData();
    }), [query, pageNumber]);

    return (
        <div>useImageSearch</div>
    )
}

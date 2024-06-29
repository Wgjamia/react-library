import { useEffect, useState } from 'react';
import BookModel from "../models/BookModel";


export const UseFetchBooks = (pageSize: number) => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(  () => {
        // Fetch books data and set it to the state
        const fetchBooks = async () =>{
            const baseUrl : string = "http://localhost:8080/api/books"
            const url : string = `${baseUrl}?page=0&size=${pageSize}`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            const responseData = data._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,

                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        }
        fetchBooks().catch((error : any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);
    return { books, isLoading, httpError };
};
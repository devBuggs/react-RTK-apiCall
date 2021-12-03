import React, { useEffect, useState } from 'react';
import 'w3-css';
import '../App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';

import { setBlog } from '../features/blog/blogSlice';
import { BASE_URL } from '../api/url_config';
// import SearchComponent from './SearchComponent';

import api from '../api/api';
import {fetchDataApiCall} from '../api/apiCall';





export default function Posts() {
    const { initialData } = useSelector(state => state.blogSlice);
    const [query, setQuery] = useState("");

    console.log(initialData, "initialData");
    const myNavigate = useNavigate();
    const myDispach = useDispatch();

    // useEffect(() => {
    //     axios.get(BASE_URL)
    //         .then((response) => {
    //             console.log("Server Response: ", response.data);
    //             myDispach(setBlog(response.data))
    //             myNavigate("/")
    //         })
    //         .catch = ((e) => {
    //             console.log("error occured on get request:", e.data);
    //         })
    // }, [myDispach, myNavigate]);

    useEffect(() => {
      myDispach(fetchDataApiCall())  
    }, [myDispach])

    return (
        <>
            <div className="w3-container">
                <input placeholder="discover post" onChange={event => setQuery(event.target.value)} />
            </div>

            <hr />
            <h3>search result's</h3>
            {
                [initialData.filter((post, i) => {
                    if (query !== ""){
                        if (post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase())) {
                            console.log("match item index: ", i);
                            return post;
                        }
                    }
                })][0].map((post, index) => (
                    <div className="w3-card w3-light-gray" key={index}>
                        <p>#{index} - post_id: {post.id} - {post.title}</p>
                        <p>{post.body}</p>
                    </div>
                ))
            }
            <hr />

            <div className="w3-content">

                {initialData.length > 0 ? (
                    <>
                        <h4>paginated data</h4>
                        <PaginatedItems itemsPerPage={10} items={initialData} />
                    </>
                ) : (
                    <p className="w3-large w3-text-red w3-wide w3-sans w3-pale-red w3-center w3-padding-16 w3-content">no data found!</p>
                )}
            </div>
        </>
    );
}


function Items({ currentItems }) {
    return (
        <ul className="w3-ul">
            {currentItems &&
                currentItems.map((item, i) => (
                    <li className="w3-card-2 w3-margin-bottom  bg-light" key={i}>
                        <div className="w3-row w3-border-bottom">
                            <span className="w3-left"># {item.id} </span>
                            <span className="w3-right">...by user {item.userId}</span>
                        </div>
                        <p className="w3-large h1 w3-text-dark-gray w3-sans">{item.title}</p>
                        <p className="text-info">{item.body}</p>
                    </li>
                ))}
        </ul>
    );
}


function PaginatedItems({ itemsPerPage, items }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />

            <nav aria-label="">
                <ul class="pagination justify-content-center">

                    {/* <ul class="w3-ul"> */}
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="</>"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        marginPagesDisplayed={4}
                        pageRangeDisplayed={3}
                        containerClassName="pagination"
                        activeClassName="active"
                        onPageChange={handlePageClick}
                        renderOnZeroPageCount={null}
                        id='pagination-bar'
                    />
                </ul>
            </nav>
        </>
    );
}


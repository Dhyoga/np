import React, { useEffect, useState } from "react";
import { fetchPosts } from "./api"; // Import fetchPosts dari api.js
import { truncateText } from "../utils";

const Content = () => {
    const [posts, setPosts] = useState([]); // State untuk menyimpan data posts
    const [loading, setLoading] = useState(true); // State untuk menampilkan loading
    const [currentPage, setCurrentPage] = useState(1); // State untuk melacak halaman saat ini
    const [totalPages, setTotalPages] = useState(1); // State untuk menyimpan total halaman
    const postsPerPage = 10; // Jumlah posts per halaman

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true); // Set loading ke true sebelum fetch
                const data = await fetchPosts(currentPage, postsPerPage); // Fetch data sesuai page dan limit
                setPosts(data.posts); // Set data posts ke state
                setTotalPages(Math.ceil(data.total / postsPerPage)); // Hitung total halaman
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // Set loading ke false setelah fetch selesai
            }
        };

        loadPosts(); // Panggil fungsi loadPosts saat komponen mount atau currentPage berubah
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Set halaman saat ini
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading saat data belum selesai di-fetch
    }

    return (
        <div>
            <div className="grid gap-12 lg:grid-cols-2">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                            <div className="flex gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm">User ID: {post.userId}</span>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <a href="#">{post.title}</a>
                        </h2>
                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                            {truncateText(post.body, 200)}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    className="w-7 h-7 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                    alt="Jese Leos avatar"
                                />
                                <span className="font-medium dark:text-white">User {post.userId}</span>
                            </div>
                            <a
                                href="#"
                                className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                            >
                                Read more
                                <svg
                                    className="ml-2 w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-8 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-black"
                >
                    Previous
                </button>
                <span className="px-4 py-2 mx-1">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-12 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-black"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Content;

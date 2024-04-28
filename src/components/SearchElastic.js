import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';

const AlgoliaSearch = ({ searchTerm }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const searchDocuments = async () => {
            try {
                const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
                const ALGOLIA_SEARCH_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
                const INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

                const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
                const index = client.initIndex(INDEX_NAME);

                const { hits } = await index.search(searchTerm);

                const formattedResults = hits.map(hit => ({
                    title: transformData(hit._highlightResult.title.value),
                    description: transformData(hit._highlightResult.description.value),
                    price: hit.price,
                    review_stars: hit.review_stars,
                    company_selling: hit.company_selling,
                    link: hit.link,
                    image: hit.image,
                    date: hit.date
                }));

                setResults(formattedResults);
            } catch (error) {
                console.error('Error searching documents:', error);
            }
        };

        const transformData = (data) => {
            // Remove as tags HTML usando uma expressão regular
            return data.replace(/<\/?[^>]+(>|$)/g, "");
        };

        if (searchTerm.trim() !== '') {
            searchDocuments();
        }
    }, [searchTerm]);

    return results;
};

export default AlgoliaSearch;

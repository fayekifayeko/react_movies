import { useEffect, useState } from "react";

interface PaginationProps {
    currentPage: number;
    numberOfPages: number;
    ratio: number;
    onChange(page: number): void;
}

interface PaginationItem {
    page: number;
    enabled: boolean;
    active: boolean;
    text: string;
}

export default function Pagination(props: PaginationProps) {

    const [links, setLinks] = useState<PaginationItem[]>([]);

    function getClass(link: PaginationItem) {
        if(link.active) return `active pointer`;
        if(!link.enabled) return `disabled`;
        return `pointer`;
    }

    function selectPage(link: PaginationItem) {
        if(link.page === props.currentPage) return;
        if(!link.enabled) return;
        props.onChange(link.page);

    }

    useEffect(() => {
        const isPreviousEnabled = props.currentPage !== 1;
        const prevPage = props.currentPage - 1;
        const links: PaginationItem[] = [];

        links.push(
            {
                page: prevPage,
                enabled: isPreviousEnabled,
                active: false,
                text: 'Previous'
            }
        );

        for(let i=1;i<=props.numberOfPages;i++) {
            if((i >=props.currentPage - props.ratio)&&(i <= props.currentPage + props.ratio)) {
                links.push({
                    page: i,
                    enabled: true,
                    active: props.currentPage === i,
                    text: `${i}`
                });
            }
        }

        const isNextEnabled = props.numberOfPages > 0 && props.currentPage !== props.numberOfPages;
        const nextPage = props.currentPage + 1;

        links.push(
            {
                page: nextPage,
                enabled: isNextEnabled,
                active: false,
                text: 'Next'
            }
        );

        setLinks(links);

    }, [props.currentPage, props.numberOfPages, props.ratio]);

    return (
        <nav>
        <ul className="pagination justify-content-center">
            {links.map(item => 
            <li 
            className={`page-item ${getClass(item)}`}
            onClick={() => selectPage(item)}
            key={item.text}
            >
                <span className="page-link">{item.text}</span>
            </li>)}
        </ul>
        </nav>
    );
}

Pagination.defaultProps = {
    ratio: 3
}
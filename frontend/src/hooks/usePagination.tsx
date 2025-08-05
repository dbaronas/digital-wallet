import { useReducer } from 'react'
import ChevronLeft from '../icons/ChevronLeft.tsx';
import ChevronRight from '../icons/ChevronRight.tsx';

type Action = {
    type: ActionType,
    payload?: number
}

type ActionType = "NEXT_PAGE" | "PREV_PAGE" | "GO_TO_PAGE";

function paginationReducer(state: any, action: Action) {
    switch (action.type) {
        case "NEXT_PAGE":
            return { ...state, currentPage: state.currentPage + 1 };
        case "PREV_PAGE":
            return { ...state, currentPage: state.currentPage - 1 };
        case "GO_TO_PAGE":
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
}

function usePagination(totalItems: number, itemsPerPage = 5) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const [paginationState, dispatch] = useReducer(paginationReducer, {
        currentPage: 1,
        totalPages
    })

    const { currentPage } = paginationState;

    function nextPage() {
        dispatch({ type: 'NEXT_PAGE' });
    }

    function prevPage() {
        dispatch({ type: 'PREV_PAGE' });
    }

    function goToPage(pageNumber: number) {
        dispatch({ type: 'GO_TO_PAGE', payload: pageNumber });
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const visiblePages = Math.min(5, totalPages);
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const paginationControls = (
        <div className='flex justify-center mt-8 gap-1'>
            <button
                type='button'
                style={{width: '64px'}}
                className={`${
                    currentPage === 1
                        ? 'bg-secondary text-white'
                        : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded mx-1`}
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                <ChevronLeft />
            </button>
            {Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => startPage + index
            ).map((page) => (
                <button
                    type='button'
                    style={{width: '64px'}}
                    key={page}
                    className={`${
                        currentPage === page
                            ? 'bg-secondary text-white'
                            : 'bg-gray-200 text-gray-800'
                    } px-4 py-2 rounded mx-1`}
                    onClick={() => goToPage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                type='button'
                style={{width: '64px'}}
                className={`${
                    currentPage === totalPages
                        ? 'bg-secondary text-white'
                        : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded mx-1`}
                onClick={nextPage}
                disabled={currentPage === totalPages}
            >
                <ChevronRight />
            </button>
        </div>
    )

    return {
        paginationControls,
        currentPage,
        itemsPerPage,
        endIndex
    }
}

export default usePagination;

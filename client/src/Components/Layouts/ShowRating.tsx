import { BsStarFill, BsStar } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';

interface ShowRatingProps {
    Rating: number;
    className?: string;
}
const ShowRating = ({ Rating, className }: ShowRatingProps) => {
    return (
        <div className={`${className} flex items-center gap-1 text-orange-500 text-xl select-none py-5`}>
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 0 &&
                <>
                    <BsStar />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 1 &&
                <>
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 2 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 3 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 4 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 5 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 1.5 &&
                <>
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 2.5 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 3.5 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                </>
            }
            {parseFloat((Math.round(Rating * 2) / 2).toFixed(1)) === 4.5 &&
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                </>
            }
        </div>
    )
}

export default ShowRating

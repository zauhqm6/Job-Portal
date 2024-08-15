import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    // Function to trim the description to 100 characters with an ellipsis
    const truncateDescription = (description, maxLength = 100) => {
        if (!description) return '';
        return description.length > maxLength
            ? `${description.slice(0, maxLength)}...`
            : description;
    };

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>UK</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{truncateDescription(job?.description)}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#004a7f] font-bold'} variant="ghost">
                    ${job?.salary}/month
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;

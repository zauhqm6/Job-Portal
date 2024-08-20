import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth) || {}; // Handle case where user might be null
    const isIntiallyApplied = user ? singleJob?.applications?.some(application => application.applicant === user?._id) || false : false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Get the navigate function

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Login to Apply");
            navigate('/login'); // Redirect to login page
            return;
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    console.log('Fetched Job Data:', res.data.job); // Add this line to inspect the job data
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Handler function to navigate back
    const goBackHandler = () => {
        navigate(-1); // Navigate back to the previous page
    }
    const upldRsume = () => {
        navigate('/profile')
    }
    return (
        <>
            <Navbar />

            <div className='max-w-7xl mx-auto my-10 mt-24'>
                <Button
                    onClick={goBackHandler} // Attach handler to button
                    className='bg-[rgb(183,9,9)] hover:bg-[#004a81] mb-6'
                >
                    Go Back
                </Button>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#0a94f0] font-bold'} variant="ghost">{singleJob?.salary}/month</Badge>
                        </div>
                    </div>

                    {user ? (
                        user.role === 'employee' ? (
                            user?.profile?.resume ? (
                                <Button
                                    onClick={isApplied ? null : applyJobHandler}
                                    disabled={isApplied}
                                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0a94f0] hover:bg-[#004a81]'}`}
                                >
                                    {isApplied ? 'Already Applied' : 'Apply Now'}
                                </Button>
                            ) : (
                                <Button onClick={upldRsume}
                                    className='rounded-lg bg-gray-600 '
                                >
                                    Please Upload Resume
                                </Button>
                            )
                        ) : (
                            <Button
                                className='rounded-lg bg-[rgb(183,9,9)]'
                            >
                                Apply Now
                            </Button>
                        )
                    ) : (
                        <Button
                            onClick={applyJobHandler} // Attach handler to button
                            className='rounded-lg bg-[rgb(183,9,9)]'
                        >
                            Apply Now
                        </Button>
                    )}
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}/month</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default JobDescription;
